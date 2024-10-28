"use client";

import { matchNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getListadoTerroristas } from "@/actions/terroristas";

interface CalcularRiesgoProps {
  razonSocial: string;
  personasDeInteres: string[];
}

export const CalcularRiesgo = ({
  razonSocial,
  personasDeInteres,
}: CalcularRiesgoProps) => {
  const calcularRiesgo = async () => {
    let match = 0;
    const personasComparables = [razonSocial, ...personasDeInteres];
    const listadoTerroristas = await getListadoTerroristas();

    personasComparables.forEach((persona) => {
      listadoTerroristas?.forEach((entidadTerrorista) => {
        const matchAgainsName = matchNames(persona, entidadTerrorista.nombre);
        if (matchAgainsName > match) match = matchAgainsName;
      });
    });
  };

  return (
    <Button size={"sm"} onClick={calcularRiesgo}>
      Calcular
    </Button>
  );
};
