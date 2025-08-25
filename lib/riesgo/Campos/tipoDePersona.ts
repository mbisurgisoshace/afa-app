import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";
import { tipoEntidadAppMapper } from "@/lib/jotform/mapper";

export async function calcularTipoDePersona(valor: string, campo: CampoRiesgo) {
  const value =
    tipoEntidadAppMapper[valor as keyof typeof tipoEntidadAppMapper];

  const riesgoTipoDePersona = await db.tipoPersonaRiesgo.findFirst({
    where: {
      tipoPersona: value,
    },
  });

  const valorRiesgo = riesgoTipoDePersona
    ? toNumber(riesgoTipoDePersona.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
