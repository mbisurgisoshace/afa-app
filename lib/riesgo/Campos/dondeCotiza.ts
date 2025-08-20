import { toNumber } from "lodash";

import { CampoRiesgo } from "@prisma/client";
import { db } from "@/lib/db";

export async function calcularDondeCotiza(valor: string[], campo: CampoRiesgo) {
  const value = valor;
  const ponderacion = 1 / value.length;

  const riesgoBolsas = await db.bolsa.findMany({});

  const valorRiesgo = value.reduce((acc, bolsa) => {
    const riesgoBolsa = riesgoBolsas.find((r) => r.bolsa === bolsa);
    return (
      acc +
      (riesgoBolsa
        ? toNumber(riesgoBolsa.valoracionRiesgo) * ponderacion
        : 1 * ponderacion)
    );
  }, 0);

  return (valorRiesgo || 1) * toNumber(campo.ponderacionRiesgo);
}
