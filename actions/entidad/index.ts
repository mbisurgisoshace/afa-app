"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import NosisDataParser, {
  NosisDataResponse,
} from "@/lib/nosis/NosisDataParser";
import BcraDataParser, {
  BcraDataResponse,
  BcraResultChequesResponse,
  SujetoObligadoResponse,
} from "@/lib/bcra/BcraDataParser";
import { SearchParams } from "@/types";

export const getTablas = async () => {
  const paises = await db.pais.findMany();
  const oficios = await db.oficio.findMany();
  const industrias = await db.industria.findMany();
  const profesiones = await db.profesion.findMany();
  const actividadesAfip = await db.actividadAfip.findMany();

  return {
    paises: paises.map((data) => data.pais),
    oficios: oficios.map((data) => data.oficio),
    industrias: industrias.map((data) => data.industria),
    profesiones: profesiones.map((data) => data.profesion),
    actividadesAfip: actividadesAfip.map((data) => data.actividadAfip),
  };
};

export const createEntidad = async (values: any) => {
  return await db.entidad.create({
    data: {
      ...values,
      personasInteres: {
        create: values.personasInteres,
      },
    },
  });
};

export const upsertEntidad = async (values: any) => {
  return await db.entidad.upsert({
    where: {
      codigoEntidad: values.codigoEntidad,
    },
    update: {
      ...values,
      personasInteres: {
        deleteMany: {},
        create: values.personasInteres,
      },
    },
    create: {
      ...values,
      personasInteres: {
        create: values.personasInteres,
      },
    },
  });
};

export const getEntidad = async (entidadId: string) => {
  return await db.entidad.findFirst({
    where: { codigoEntidad: entidadId },
    include: { personasInteres: true },
  });
};

export const getEntidades = async (searchParams: SearchParams) => {
  const page = parseInt(searchParams.page) || 1;

  if (!searchParams.search && !searchParams.tipo)
    return await db.entidad.findMany({ orderBy: { codigoEntidad: "asc" } });

  return await db.entidad.findMany({
    where: {
      AND: [
        {
          tipoRelacion: {
            //@ts-ignore
            in: searchParams.tipo
              ? searchParams.tipo.split(",").map((tipo) => tipo.toUpperCase())
              : ["CLUB", "SPONSOR", "PROVEEDOR", "AGENTE_COMERCIAL"],
          },
        },
        {
          OR: [
            {
              nombreCompleto: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            },
            {
              razonSocial: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            },
            {
              codigoEntidad: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    orderBy: {
      codigoEntidad: "asc",
    },
  });
};

export const getNosisData = async (entidadId: string) => {
  const entidad = await db.entidad.findFirst({
    where: { codigoEntidad: entidadId },
  });

  if (entidad) {
    const identificador = entidad.dni || entidad.cuit;
    const nosisResponse = await fetch(
      `${process.env.NOSIS_API_URL}variables?usuario=${process.env.NOSIS_API_USUARIO}&token=${process.env.NOSIS_API_TOKEN}&documento=${identificador}&VR=1&format=json`
    );
    const parsedResponse: NosisDataResponse = await nosisResponse.json();

    if (parsedResponse.Contenido.Datos) {
      const result = new NosisDataParser(parsedResponse).getParsedData();

      await db.entidad.update({
        where: { id: entidad.id },
        data: {
          ...result,
          nosisUltimaActualizacion: new Date(),
        },
      });

      revalidatePath(`/entidades/${entidadId}`);
    }
  }
};

export const getInfoFinancieraData = async (entidadId: string) => {
  const entidad = await db.entidad.findFirst({
    where: { codigoEntidad: entidadId },
  });

  if (entidad) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const identificador = entidad.dni || entidad.cuit;

    if (!identificador) throw new Error("La entidad no posee DNI o CUIT");

    const bcraResponse = await fetch(
      `${process.env.BCRA_API_URL}/centraldedeudores/v1.0/Deudas/${identificador}`
    );
    const bcraHistoricoResponse = await fetch(
      `${process.env.BCRA_API_URL}/centraldedeudores/v1.0/Deudas/Historicas/${identificador}`
    );
    const bcraHistoricoChequesResponse = await fetch(
      `${process.env.BCRA_API_URL}/centraldedeudores/v1.0/Deudas/ChequesRechazados/${identificador}`
    );
    const sujetoObligadoResponse = await fetch(
      `${process.env.UIF_API_URL}/api/sujetoObligado/consulta/${identificador}`
    );

    const parsedResponse: BcraDataResponse = await bcraResponse.json();
    const parsedHistoricoResponse: BcraDataResponse =
      await bcraHistoricoResponse.json();
    const parsedChequesResponse: BcraResultChequesResponse =
      await bcraHistoricoChequesResponse.json();

    const parsedSujetoObligadoResponse: SujetoObligadoResponse[] = [];

    console.log("parsedResponse", parsedResponse);
    console.log("parsedHistoricoResponse", parsedHistoricoResponse);
    console.log("parsedChequesResponse", parsedChequesResponse);
    console.log("sujetoObligadoResponse", sujetoObligadoResponse);

    const result = new BcraDataParser(
      parsedResponse,
      parsedHistoricoResponse,
      parsedChequesResponse,
      parsedSujetoObligadoResponse
    ).getParsedData();

    if (result) {
      console.log("result", result);

      await db.entidad.update({
        where: { id: entidad.id },
        data: {
          ...result,
        },
      });

      revalidatePath(`/entidades/${entidadId}`);
    }
  }
};
