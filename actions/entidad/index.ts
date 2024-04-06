"use server";

import { db } from "@/lib/db";
import { SearchParams } from "@/types";

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

export const getEntidad = async (entidadId: string) => {
  return await db.entidad.findFirst({
    where: { codigoEntidad: entidadId },
    include: { personasInteres: true },
  });
};

export const getEntidades = async (searchParams: SearchParams) => {
  const page = parseInt(searchParams.page) || 1;

  if (!searchParams.search) return await db.entidad.findMany();

  return await db.entidad.findMany({
    where: {
      OR: [
        { razonSocial: { contains: searchParams.search } },
        { nombreCompleto: { contains: searchParams.search } },
        { codigoEntidad: { contains: searchParams.search } },
      ],
    },
  });
};
