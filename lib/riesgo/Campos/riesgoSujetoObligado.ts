import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";

export async function calcularRiesgoSujetoObligado(
  valorInformado: boolean,
  valorUif: boolean,
  campo: CampoRiesgo
) {
  const valorRiesgo = valorInformado !== valorUif ? 5 : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
