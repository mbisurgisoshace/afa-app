"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { updateTablaStatus } from "../settings";
import { TipoPaisNoCooperante } from "@prisma/client";

export interface SujetoSancionadoData {
  CUIT?: string;
  "Acto sancionatorio": string;
  Año: number;
  "Estado procesal": string;
  "Nombre/ razón social": string;
  "Tipo de sujeto obligado": string;
  Observaciones?: string;
}

export const updateSujetosSancionados = async (
  sujetosSancionadosData: SujetoSancionadoData[]
) => {
  const session = await auth();

  if (!session) {
    return;
  }

  const sujetosSancionados = sujetosSancionadosData.map((data) => {
    return {
      cuit: data.CUIT,
      tipoSujetoObligado: data["Tipo de sujeto obligado"],
      razonSocial: data["Nombre/ razón social"],
      actoSancionatorio: data["Acto sancionatorio"],
      estadoProcesal: data["Estado procesal"],
      anio: data.Año,
      observaciones: data["Observaciones"],
    };
  });

  await db.sujetoObligadoSancionado.deleteMany();
  await db.sujetoObligadoSancionado.createMany({
    data: sujetosSancionados,
  });

  await updateTablaStatus("sujetos-obligados-sancionados");
};
