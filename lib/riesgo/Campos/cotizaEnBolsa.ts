import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";

export async function calcularCotizaEnBolsa(
  valor: boolean,
  campo: CampoRiesgo
) {
  const value = valor;
  const valorRiesgo = value ? 4 : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
