"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { updateTablaStatus } from "../settings";
import { TipoPaisNoCooperante } from "@prisma/client";

export interface PaisNoCooperanteData {
  PAIS: string;
  LISTA: string;
}

export const updatePaisesNoCooperantes = async (
  paisesNoCooperantesData: PaisNoCooperanteData[]
) => {
  const session = await auth();

  if (!session) {
    return;
  }

  const paisesNoCooperantes = paisesNoCooperantesData.map((data) => {
    return {
      pais: data.PAIS,
      tipoLista: data.LISTA as TipoPaisNoCooperante,
    };
  });

  await db.paisNoCooperante.deleteMany();
  await db.paisNoCooperante.createMany({
    data: paisesNoCooperantes,
  });

  await updateTablaStatus("paises-no-cooperantes");
};
