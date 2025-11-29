"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { matchNames } from "@/lib/utils";
import { PersonaTerrorista } from "@prisma/client";

export const getUltimoRiesgo = async (entidadId: number) => {
  const ultimoRiesgo = await db.riesgo.findFirst({
    where: { entidadId },
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });

  return ultimoRiesgo;
};

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

export const getUltimoRiesgoSujetoSancionado = async (entidadId: number) => {
  const ultimoRiesgoSujetoSancionado =
    await db.riesgoSujetosSancionados.findFirst({
      where: { entidadId },
      orderBy: { createdAt: "desc" },
    });

  return ultimoRiesgoSujetoSancionado;
};

export const getUltimoRiesgoCuitApocrifo = async (entidadId: number) => {
  const ultimoRiesgoCuitApocrifo = await db.riesgoCuitApocrifo.findFirst({
    where: { entidadId },
    orderBy: { createdAt: "desc" },
  });

  return ultimoRiesgoCuitApocrifo;
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

export const calcularRiesgoCuitApocrifo = async (entidadId: number) => {
  const entidad = await db.entidad.findUnique({
    where: { id: entidadId },
    include: {
      personasInteres: true,
    },
  });

  if (!entidad) {
    throw new Error("Entidad no encontrada");
  }

  const cuitApocrifo = await db.cuitApocrifo.findMany({});

  let riesgoCuitApocrifo = false;

  if (
    cuitApocrifo.some(
      (sujeto) =>
        sujeto.cuit?.replaceAll(/-/g, "").replaceAll(" ", "") ===
        entidad.cuit?.replaceAll(/-/g, "".replaceAll(" ", ""))
    )
  ) {
    riesgoCuitApocrifo = true;
  }

  entidad.personasInteres.forEach((persona) => {
    if (
      cuitApocrifo.some(
        (sujeto) =>
          sujeto.cuit?.replaceAll(/-/g, "").replaceAll(" ", "") ===
          persona.documento?.replaceAll(/-/g, "").replaceAll(" ", "")
      )
    ) {
      riesgoCuitApocrifo = true;
    }
  });

  await db.riesgoCuitApocrifo.create({
    data: {
      entidadId: entidad.id,
      riesgoso: riesgoCuitApocrifo,
    },
  });

  revalidatePath(`/entidades/${entidad.codigoEntidad}`);
};

export const calcularRiesgoSujetoSancionado = async (entidadId: number) => {
  const entidad = await db.entidad.findUnique({
    where: { id: entidadId },
    include: {
      personasInteres: true,
    },
  });

  if (!entidad) {
    throw new Error("Entidad no encontrada");
  }

  const sujetosSancionados = await db.sujetoObligadoSancionado.findMany({});

  let riesgoSujetoSancionado = false;

  if (
    sujetosSancionados.some(
      (sujeto) =>
        sujeto.cuit?.replaceAll(/-/g, "").replaceAll(" ", "") ===
        entidad.cuit?.replaceAll(/-/g, "".replaceAll(" ", ""))
    )
  ) {
    riesgoSujetoSancionado = true;
  }

  entidad.personasInteres.forEach((persona) => {
    if (
      sujetosSancionados.some(
        (sujeto) =>
          sujeto.cuit?.replaceAll(/-/g, "").replaceAll(" ", "") ===
          persona.documento?.replaceAll(/-/g, "").replaceAll(" ", "")
      )
    ) {
      riesgoSujetoSancionado = true;
    }
  });

  await db.riesgoSujetosSancionados.create({
    data: {
      entidadId: entidad.id,
      riesgoso: riesgoSujetoSancionado,
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
