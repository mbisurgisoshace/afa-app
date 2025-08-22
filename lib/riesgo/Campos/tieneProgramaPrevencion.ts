import { toNumber } from "lodash";

import { CampoRiesgo, Entidad } from "@prisma/client";

export async function calcularRiesgoProgramaPrevencion(
  entidad: Entidad,
  campo: CampoRiesgo
) {
  if (!entidad.riesgoSujetoObligado)
    return 1 * toNumber(campo.ponderacionRiesgo);

  const valorRiesgo = entidad.tieneProgramaPrevencion ? 1 : 4;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
