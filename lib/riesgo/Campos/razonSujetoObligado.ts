import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularRazonSujetoObligado(
  valor: string,
  campo: CampoRiesgo
) {
  const value = valor;

  const riesgoRazonSujetoObligado = await db.razonSujetoObligado.findFirst({
    where: {
      razonSujeto: value,
    },
  });

  const valorRiesgo = riesgoRazonSujetoObligado
    ? toNumber(riesgoRazonSujetoObligado.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
