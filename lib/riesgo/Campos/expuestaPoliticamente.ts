import { toNumber } from "lodash";

import { CampoRiesgo, Entidad } from "@prisma/client";
import { EntidadWithPersonasInteres } from "@/types";

export async function calcularExpuestaPoliticamente(
  entidad: EntidadWithPersonasInteres,
  valor: boolean,
  campo: CampoRiesgo
) {
  const value = valor;

  let valorRiesgo = 1;

  if (entidad.tipoDePersona === "HUMANA") {
    valorRiesgo = value ? 5 : 1;
  } else {
    valorRiesgo = entidad.personasInteres.reduce((acc, persona) => {
      let personaRiesgo = 1;
      if (persona.expuestaPoliticamente) {
        personaRiesgo = 5;
      }

      return acc > personaRiesgo ? acc : personaRiesgo;
    }, 1);
  }

  return valorRiesgo * toNumber(campo.ponderacionRiesgo);
}
