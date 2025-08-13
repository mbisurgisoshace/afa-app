import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";
import { db } from "@/lib/db";

export async function calcularRiesgoCantidadSinFondosNoPagados(
  valor: number,
  campo: CampoRiesgo
) {
  const value = valor;

  const riesgoChequesRechazados =
    await db.rangoChequesRechazadosRiesgo.findFirst({
      where: {
        desdeCantidad: {
          lte: toNumber(value),
        },
        hastaCantidad: {
          gte: toNumber(value),
        },
      },
    });

  const valorRiesgo = riesgoChequesRechazados
    ? toNumber(riesgoChequesRechazados.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
