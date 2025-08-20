import { toNumber } from "lodash";

import { CampoRiesgo, Entidad } from "@prisma/client";

export async function calcularRiesgoProgramaIntegridad(
  entidad: Entidad,
  campo: CampoRiesgo
) {
  if (
    entidad.tipoDePersona === "JURIDICA" &&
    entidad.tieneVinculosEstado &&
    !entidad.tieneProgramaIntegridad
  )
    return 4 * toNumber(campo.ponderacionRiesgo);

  return 1 * toNumber(campo.ponderacionRiesgo);
}
