import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularProfesion(valor: string, campo: CampoRiesgo) {
  const value = valor;

  const riesgoProfesion = await db.profesion.findFirst({
    where: {
      profesion: value,
    },
  });

  const valorRiesgo = riesgoProfesion
    ? toNumber(riesgoProfesion.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
