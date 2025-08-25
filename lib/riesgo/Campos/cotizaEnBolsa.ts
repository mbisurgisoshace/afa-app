import { toNumber } from "lodash";

import { CampoRiesgo, Entidad } from "@prisma/client";

export async function calcularCotizaEnBolsa(
  entidad: Entidad,
  valor: boolean,
  campo: CampoRiesgo
) {
  const value = valor;

  if (entidad.tipoDePersona === "HUMANA") {
    return 1;
  }

  const valorRiesgo = value ? 1 : 4;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
