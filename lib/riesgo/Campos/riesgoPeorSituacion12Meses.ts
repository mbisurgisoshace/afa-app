import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";

export async function calcularRiesgoPeorSituacion12Meses(
  valor: string,
  campo: CampoRiesgo
) {
  const value = valor;

  const valorRiesgo = toNumber(value);

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
