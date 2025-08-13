import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";
import { db } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

export async function calcularRiesgoMontoSinFondosNoPagados(
  valor: number,
  campo: CampoRiesgo
) {
  const value = valor;

  const riesgoChequesRechazados =
    await db.rangoChequesRechazadosRiesgo.findFirst({
      where: {
        desdeImporte: {
          lte: toNumber(value),
        },
        hastaImporte: {
          gte: toNumber(value),
        },
      },
    });

  const valorRiesgo = riesgoChequesRechazados
    ? toNumber(riesgoChequesRechazados.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
