import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";
import { db } from "@/lib/db";

export async function calcularPorcentajeExportacionVsTotal(
  valorPesos: number,
  valorExportaciones: number,
  campo: CampoRiesgo
) {
  if (!valorPesos && !valorExportaciones) return 1;

  const totalIngresos = valorPesos;

  const porcentajeExportacion = valorExportaciones / totalIngresos;

  const riesgoRelacionExportaciones = await db.relacionExportacion.findFirst({
    where: {
      desde: {
        lte: toNumber(porcentajeExportacion),
      },
      hasta: {
        gte: toNumber(porcentajeExportacion),
      },
    },
  });

  const valorRiesgo = riesgoRelacionExportaciones
    ? toNumber(riesgoRelacionExportaciones.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
