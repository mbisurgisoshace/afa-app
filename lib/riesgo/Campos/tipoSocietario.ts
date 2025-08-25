import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";
import { tipoSocietarioAppMapper } from "@/lib/jotform/mapper";

export async function calcularTipoSocietario(
  valor: string,
  campo: CampoRiesgo
) {
  const value =
    tipoSocietarioAppMapper[valor as keyof typeof tipoSocietarioAppMapper];

  const riesgoTipoSocietario = await db.tipoSocietarioRiesgo.findFirst({
    where: {
      tipoSocietario: value || "",
    },
  });

  const valorRiesgo = riesgoTipoSocietario
    ? toNumber(riesgoTipoSocietario.valoracionRiesgo)
    : 1;

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
