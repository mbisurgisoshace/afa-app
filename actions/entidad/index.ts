"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SearchParams } from "@/types";
import NosisDataParser, {
  NosisDataResponse,
} from "@/lib/nosis/NosisDataParser";
import { TipoRelacion } from "@prisma/client";

export const getTablas = async () => {
  const paises = await db.pais.findMany();
  const industrias = await db.industria.findMany();
  const actividadesAfip = await db.actividadAfip.findMany();

  return {
    paises: paises.map((data) => data.pais),
    industrias: industrias.map((data) => data.industria),
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
