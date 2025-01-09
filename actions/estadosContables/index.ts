"use server";

import { db } from "@/lib/db";

export const getEstadosContables = async (entidadId: number) => {
  return await db.estadoContable.findMany({
    where: {
      entidadId,
    },
  });
};

export const createEstadoContable = async (entidadId: number, values: any) => {
  return await db.estadoContable.create({
    data: {
      ...values,
      entidadId,
    },
  });
};
