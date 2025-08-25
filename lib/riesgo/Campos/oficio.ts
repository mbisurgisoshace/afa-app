import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularOficio(valor: string, campo: CampoRiesgo) {
  const value = valor;

  const riesgoOficio = await db.oficio.findFirst({
    where: {
      oficio: value,
    },
  });

  const valorRiesgo = riesgoOficio
    ? toNumber(riesgoOficio.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
