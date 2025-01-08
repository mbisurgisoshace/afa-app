"use server";

import { db } from "@/lib/db";

export const getEstadosContables = async (entidadId: number) => {
  return await db.estadoContable.findMany({
    where: {
      entidadId,
    },
  });
};
