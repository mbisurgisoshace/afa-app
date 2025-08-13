import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";

export async function calcularPersonalConInteresEconomicoAfa(
  valor: boolean,
  campo: CampoRiesgo
) {
  const value = valor;

  const valorRiesgo = value ? 5 : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
