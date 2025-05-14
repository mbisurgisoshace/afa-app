"use server";

import { db } from "@/lib/db";
import { getIndicadoresFinancieros } from "@/lib/utils";

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
  const eecc = await db.estadoContable.create({
    data: {
      ...values,
      entidadId,
    },
  });

  await upsertIndicadorFinanciero(eecc.id);

  return eecc;
};

export const updateEstadoContable = async (id: number, values: any) => {
  await upsertIndicadorFinanciero(id);

  return await db.estadoContable.update({
    where: {
      id,
    },
    data: values,
  });
};

export const upsertIndicadorFinanciero = async (eeccId: number) => {
  const eecc = await db.estadoContable.findUnique({
    where: {
      id: eeccId,
    },
  });

  if (eecc) {
    const { liquidezCorriente, endeudamientoTotal, solvencia, roe, roa } =
      getIndicadoresFinancieros(eecc);

    await db.indicadorFinanciero.upsert({
      where: {
        eeccId: eeccId,
      },
      update: {
        liquidezCorriente,
        endeudamientoTotal,
        solvencia,
        roe,
        roa,
      },
      create: {
        eeccId: eeccId,
        liquidezCorriente,
        endeudamientoTotal,
        solvencia,
        roe,
        roa,
      },
    });
  }
};
