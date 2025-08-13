import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularEsPepEnCaracterDe(
  valor: string,
  campo: CampoRiesgo
) {
  const value = valor;

  const riesgoEsPepEnCaracterDe = await db.pepRiesgo.findFirst({
    where: {
      pepEnCaracterDe: value,
    },
  });

  const valorRiesgo = riesgoEsPepEnCaracterDe
    ? toNumber(riesgoEsPepEnCaracterDe.valoracionRiesgo)
    : 3;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
