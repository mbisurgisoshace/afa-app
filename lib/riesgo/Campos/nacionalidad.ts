import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";
import { db } from "@/lib/db";

export async function calcularNacionalidad(valor: string, campo: CampoRiesgo) {
  const value = valor;

  const riesgoPaises = await db.pais.findFirst({
    where: {
      pais: value,
    },
  });

  const valorRiesgo = riesgoPaises
    ? toNumber(riesgoPaises.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
