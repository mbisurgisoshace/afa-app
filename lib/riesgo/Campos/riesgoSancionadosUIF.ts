import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";

export async function calcularRiesgoSancionadosUif(
  valor: string,
  campo: CampoRiesgo
) {
  const value = valor;

  const riesgoSancionadosUif = await db.sujetoObligadoSancionado.findFirst({
    where: {
      cuit: value,
    },
  });

  const valorRiesgo = riesgoSancionadosUif ? 5 : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
