"use server";

import { db } from "@/lib/db";
import { matchNames } from "@/lib/utils";
import { PersonaTerrorista } from "@prisma/client";

export const calcularRiesgoTerrorismo = async (entidadId: number) => {
  const entidad = await db.entidad.findUnique({
    where: { id: entidadId },
    include: {
      personasInteres: true,
    },
  });

  if (!entidad) {
    throw new Error("Entidad no encontrada");
  }

  const organizacionesTerroristas = await db.personaTerrorista.findMany({});

  const nombreEntidad = entidad.razonSocial || entidad.nombreCompleto || "";

  let mayorPorcentajeCoincidencia = getMayorPorcentajeCoincidencia(
    nombreEntidad,
    organizacionesTerroristas
  );

  for (const persona of entidad.personasInteres) {
    const porcentajeCoincidencia = getMayorPorcentajeCoincidencia(
      persona.nombreApellido || "",
      organizacionesTerroristas
    );
    if (porcentajeCoincidencia > mayorPorcentajeCoincidencia) {
      mayorPorcentajeCoincidencia = porcentajeCoincidencia;
    }
  }

  console.log("Mayor porcentaje de coincidencia:", mayorPorcentajeCoincidencia);
};

export const calcularRiesgoGeografico = async (entidadId: number) => {
  const entidad = await db.entidad.findUnique({
    where: { id: entidadId },
    include: {
      personasInteres: true,
    },
  });

  if (!entidad) {
    throw new Error("Entidad no encontrada");
  }

  const paisesNoCooperantes = await db.paisNoCooperante.findMany({});

  let riesgoGeografico = false;

  if (paisesNoCooperantes.some((pais) => pais.pais === entidad.pais)) {
    riesgoGeografico = true;
  }

  if (
    paisesNoCooperantes.some((pais) => pais.pais === entidad.paisCuentaExterior)
  ) {
    riesgoGeografico = true;
  }

  if (
    paisesNoCooperantes.some((pais) => pais.pais === entidad.paisNacimiento)
  ) {
    riesgoGeografico = true;
  }

  if (paisesNoCooperantes.some((pais) => pais.pais === entidad.nacionalidad)) {
    riesgoGeografico = true;
  }

  if (
    Array.isArray(entidad.oficinasExterior) &&
    entidad.oficinasExterior.some((oficina) =>
      paisesNoCooperantes.some((pais) => pais.pais === oficina)
    )
  ) {
    riesgoGeografico = true;
  }

  if (
    Array.isArray(entidad.operacionesExterior) &&
    entidad.operacionesExterior.some((operacion) =>
      paisesNoCooperantes.some((pais) => pais.pais === operacion)
    )
  ) {
    riesgoGeografico = true;
  }

  console.log("Riesgo geográfico:", riesgoGeografico);
};

const getMayorPorcentajeCoincidencia = (
  nombre: string,
  terroristas: PersonaTerrorista[]
) => {
  let mayorPorcentaje = 0;

  terroristas.forEach((terrorista) => {
    const porcentaje = matchNames(nombre, terrorista.nombre);
    if (porcentaje > mayorPorcentaje) {
      mayorPorcentaje = porcentaje;
    }
  });

  return mayorPorcentaje;
};
