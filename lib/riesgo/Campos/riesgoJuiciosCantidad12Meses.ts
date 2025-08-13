import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";

export async function calcularRiesgoJuiciosCantidad12Meses(
  valor: number,
  campo: CampoRiesgo
) {
  const value = valor;

  const valorRiesgo = value > 0 ? 5 : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
