"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { matchNames } from "@/lib/utils";
import { PersonaTerrorista } from "@prisma/client";

export const getUltimoRiesgoTerrorismo = async (entidadId: number) => {
  const ultimoRiesgoTerrorismo = await db.riesgoTerrorista.findFirst({
    where: { entidadId },
    orderBy: { createdAt: "desc" },
  });

  return ultimoRiesgoTerrorismo;
};

export const getUltimoRiesgoGeografico = async (entidadId: number) => {
  const ultimoRiesgoGeografico = await db.riesgoGeografico.findFirst({
    where: { entidadId },
    orderBy: { createdAt: "desc" },
  });

  return ultimoRiesgoGeografico;
};

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

  await db.riesgoTerrorista.create({
    data: {
      entidadId: entidad.id,
      porcentajeCoincidencia: mayorPorcentajeCoincidencia,
    },
  });

  revalidatePath(`/entidades/${entidad.codigoEntidad}`);
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

  await db.riesgoGeografico.create({
    data: {
      entidadId: entidad.id,
      riesgoso: riesgoGeografico,
    },
  });

  revalidatePath(`/entidades/${entidad.codigoEntidad}`);
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
