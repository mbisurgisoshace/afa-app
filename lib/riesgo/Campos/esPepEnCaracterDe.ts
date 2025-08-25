import { toNumber } from "lodash";

import { db } from "@/lib/db";
import { CampoRiesgo } from "@prisma/client";
import { EntidadWithPersonasInteres } from "@/types";

export async function calcularEsPepEnCaracterDe(
  entidad: EntidadWithPersonasInteres,
  valor: string,
  campo: CampoRiesgo
) {
  const value = valor;

  let valorRiesgo = 1;

  // const riesgoEsPepEnCaracterDe = await db.pepRiesgo.findFirst({
  //   where: {
  //     pepEnCaracterDe: value,
  //   },
  // });
  const riesgoEsPepEnCaracterDe = await db.pepRiesgo.findMany({});

  if (entidad.tipoDePersona === "HUMANA") {
    const pepEnCaracterDe = riesgoEsPepEnCaracterDe.find(
      (r) => r.pepEnCaracterDe === value
    );
    const pepEnCaracterDePersonas = entidad.personasInteres.reduce(
      (acc, persona) => {
        const pep = riesgoEsPepEnCaracterDe.find(
          (r) => r.pepEnCaracterDe === persona.esPepEnCaracterDe
        );
        const pepRiesgo = pep ? toNumber(pep.valoracionRiesgo) : 3;
        return acc > pepRiesgo ? acc : pepRiesgo;
      },
      0
    );

    const valorRiesgoPersonal = pepEnCaracterDe
      ? toNumber(pepEnCaracterDe.valoracionRiesgo)
      : 3;

    const ponderacionPersona = entidad.personasInteres.length > 0 ? 0.7 : 1;

    valorRiesgo =
      valorRiesgoPersonal * ponderacionPersona +
      pepEnCaracterDePersonas * (1 - ponderacionPersona);
  } else {
    const pepEnCaracterDePersonas = entidad.personasInteres.reduce(
      (acc, persona) => {
        const pep = riesgoEsPepEnCaracterDe.find(
          (r) => r.pepEnCaracterDe === persona.esPepEnCaracterDe
        );
        const pepRiesgo = pep ? toNumber(pep.valoracionRiesgo) : 3;

        return acc > pepRiesgo ? acc : pepRiesgo;
      },
      0
    );

    valorRiesgo = pepEnCaracterDePersonas;
  }

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
