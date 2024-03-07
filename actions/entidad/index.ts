"use server";

import { db } from "@/lib/db";

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

export const getEntidad = async (entidadId: number) => {
  return await db.entidad.findUnique({ where: { id: entidadId } });
};

export const getEntidades = async () => {
  return await db.entidad.findMany();
};
