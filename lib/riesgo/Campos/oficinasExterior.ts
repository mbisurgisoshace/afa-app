import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";
import { db } from "@/lib/db";

export async function calcularOficinasExterior(
  valor: string[],
  campo: CampoRiesgo
) {
  const value = valor;
  const ponderacion = 1 / value.length;

  const riesgoPaises = await db.pais.findMany({});

  const valorRiesgo = value.reduce((acc, pais) => {
    const riesgoPais = riesgoPaises.find((r) => r.pais === pais);
    return (
      acc +
      (riesgoPais
        ? toNumber(riesgoPais.valoracionRiesgo) * ponderacion
        : 1 * ponderacion)
    );
  }, 0);

  return (valorRiesgo || 1) * toNumber(campo.ponderacionRiesgo);
}
