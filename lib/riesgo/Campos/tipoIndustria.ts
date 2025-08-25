import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularTipoIndustria(valor: string, campo: CampoRiesgo) {
  const value = valor;

  const riesgoTipoIndustria = await db.industria.findFirst({
    where: {
      industria: value,
    },
  });

  const valorRiesgo = riesgoTipoIndustria
    ? toNumber(riesgoTipoIndustria.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
