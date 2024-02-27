"use server";

import { db } from "@/lib/db";

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
