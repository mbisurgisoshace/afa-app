"use server";

import { db } from "@/lib/db";

export const getEstadoContable = async (id: number) => {
  return await db.estadoContable.findUnique({
    where: {
      id,
    },
  });
};

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

export const updateEstadoContable = async (id: number, values: any) => {
  return await db.estadoContable.update({
    where: {
      id,
    },
    data: values,
  });
};
