import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularRiesgoFactApocrifas(
  valor: string,
  campo: CampoRiesgo
) {
  const value = valor;

  const riesgoCuitApocrifo = await db.cuitApocrifo.findFirst({
    where: {
      cuit: value,
    },
  });

  const valorRiesgo = riesgoCuitApocrifo ? 5 : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
