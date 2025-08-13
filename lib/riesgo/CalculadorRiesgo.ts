"use server";

import { CampoRiesgo, Entidad } from "@prisma/client";

import { db } from "../db";
import { toNumber } from "lodash";

import { calcularOficio } from "./Campos/oficio";
import { calcularProfesion } from "./Campos/profesion";
import { calcularTipoIndustria } from "./Campos/tipoIndustria";
import { calcularTipoDePersona } from "./Campos/tipoDePersona";
import { calcularTipoSocietario } from "./Campos/tipoSocietario";
import { calcularTieneVinculosEstado } from "./Campos/tieneVinculosEstado";
import { calcularConflictoInteresesEmpleadosAfa } from "./Campos/conflictoInteresEmpleadosAfa";
import { calcularEmpleadoActualExAfa } from "./Campos/empleadoActualExAfa";
import { calcularEsPepEnCaracterDe } from "./Campos/esPepEnCaracterDe";
import { calcularExEmpleadoActualAfa } from "./Campos/exEmpleadoActualAfa";
import { calcularExpuestaPoliticamente } from "./Campos/expuestaPoliticamente";
import { calcularFamiliarComunAfaEntidad } from "./Campos/familiarComunAfaEntidad";
import { calcularPersonalConInteresEconomicoAfa } from "./Campos/personalConInteresEconomicoAfa";
import { calcularRiesgoProveedorEstado } from "./Campos/riesgoProveedorEstado";
import { calcularRiesgoCantidadSinFondosNoPagados } from "./Campos/riesgoCantidadSinFondosNoPagados6Meses";
import { calcularRiesgoEsMoroso } from "./Campos/riesgoEsMoroso";
import { calcularRiesgoJuiciosCantidad12Meses } from "./Campos/riesgoJuiciosCantidad12Meses";
import { calcularRiesgoMontoSinFondosNoPagados } from "./Campos/riesgoMontoSinFondosNoPagados6Meses";
import { Decimal } from "@prisma/client/runtime/library";
import { calcularRiesgoPedidoQuiebrasCantidad12Meses } from "./Campos/riesgoPedidoQuebrasCantidad12Meses";
import { calcularRiesgoPeorSituacion } from "./Campos/riesgoPeorSituacion";
import { calcularRiesgoPeorSituacion12Meses } from "./Campos/riesgoPeorSituacion12Meses";
import { calcularRiesgoFactApocrifas } from "./Campos/riesgoFactApocrifas";

export default async function calcularRiesgo(entidadId: number): Promise<void> {
  const entidad = await db.entidad.findUnique({
    where: { id: entidadId },
  });

  if (!entidad) {
    throw new Error("Entidad no encontrada");
  }

  // Obtener el listado de campos a utilizar en el calculo del riesgo
  const camposCalculador = await obtenerCamposParaCalculo();

  console.log("entidad", entidad);

  for (const campo of camposCalculador) {
    const riesgoCampo = await calcularRiesgoCampo(entidad, campo);
    const riesgoFinal =
      toNumber(riesgoCampo) * toNumber(campo.grupoRiesgo.ponderacionRiesgo);

    console.log("campo", campo.campo);
    console.log("riesgoFinal", riesgoFinal);
  }

  // Procesar cada campo obtenido
}

async function obtenerCamposParaCalculo() {
  return db.campoRiesgo.findMany({
    include: {
      grupoRiesgo: true,
    },
  });
}

async function calcularRiesgoCampo(entidad: Entidad, campo: CampoRiesgo) {
  // Lógica para calcular el riesgo de un campo específico
  if (campo.campo === "oficio") {
    return calcularOficio(entidad.oficio || "", campo);
  }

  if (campo.campo === "profesion") {
    return calcularProfesion(entidad.profesion || "", campo);
  }

  if (campo.campo === "tipoIndustria") {
    return calcularTipoIndustria(entidad.tipoIndustria || "", campo);
  }

  if (campo.campo === "tieneVinculosEstado") {
    return calcularTieneVinculosEstado(!!entidad.tieneVinculosEstado, campo);
  }

  if (campo.campo === "conflictoInteresEmpleadosAfa") {
    return calcularConflictoInteresesEmpleadosAfa(
      !!entidad.conflictoInteresEmpleadosAfa,
      campo
    );
  }

  if (campo.campo === "empleadoActualExAfa") {
    return calcularEmpleadoActualExAfa(!!entidad.empleadoActualExAfa, campo);
  }

  if (campo.campo === "esPepEnCaracterDe") {
    return calcularEsPepEnCaracterDe(entidad.esPepEnCaracterDe || "", campo);
  }

  if (campo.campo === "exEmpleadoActualAfa") {
    return calcularExEmpleadoActualAfa(!!entidad.exEmpleadoActualAfa, campo);
  }

  if (campo.campo === "expuestaPoliticamente") {
    return calcularExpuestaPoliticamente(
      !!entidad.expuestaPoliticamente,
      campo
    );
  }

  if (campo.campo === "familiarComunAfaEntidad") {
    return calcularFamiliarComunAfaEntidad(
      !!entidad.familiarComunAfaEntidad,
      campo
    );
  }

  if (campo.campo === "personalConInteresEconomicoAfa") {
    return calcularPersonalConInteresEconomicoAfa(
      !!entidad.personalConInteresEconomicoAfa,
      campo
    );
  }

  if (campo.campo === "riesgoProveedorEstado") {
    return calcularRiesgoProveedorEstado(
      entidad.riesgoProveedorEstado || "",
      campo
    );
  }

  if (campo.campo === "riesgoCantidadSinFondosNoPagados6Meses") {
    return calcularRiesgoCantidadSinFondosNoPagados(
      entidad.riesgoCantidadSinFondosNoPagados6Meses || 0,
      campo
    );
  }

  if (campo.campo === "riesgoEsMoroso") {
    return calcularRiesgoEsMoroso(!!entidad.riesgoEsMoroso, campo);
  }

  if (campo.campo === "riesgoFactApocrifas") {
    return calcularRiesgoFactApocrifas(
      entidad.cuit?.replaceAll("-", "") || "",
      campo
    );
  }

  if (campo.campo === "riesgoJuiciosCantidad12Meses") {
    return calcularRiesgoJuiciosCantidad12Meses(
      entidad.riesgoJuiciosCantidad12Meses || 0,
      campo
    );
  }

  if (campo.campo === "riesgoMontoSinFondosNoPagados6Meses") {
    return calcularRiesgoMontoSinFondosNoPagados(
      toNumber(entidad.riesgoMontoSinFondosNoPagados6Meses || 0),
      campo
    );
  }

  if (campo.campo === "riesgoPedidoQuebrasCantidad12Meses") {
    return calcularRiesgoPedidoQuiebrasCantidad12Meses(
      entidad.riesgoPedidoQuebrasCantidad12Meses || 0,
      campo
    );
  }

  if (campo.campo === "riesgoPeorSituacion") {
    return calcularRiesgoPeorSituacion(
      entidad.riesgoPeorSituacion || "1",
      campo
    );
  }

  if (campo.campo === "riesgoPeorSituacion12Meses") {
    return calcularRiesgoPeorSituacion12Meses(
      entidad.riesgoPeorSituacion || "1",
      campo
    );
  }

  if (campo.campo === "tipoSocietario") {
    return calcularTipoSocietario(entidad.tipoSocietario || "", campo);
  }

  if (campo.campo === "tipoDePersona") {
    return calcularTipoDePersona(entidad.tipoDePersona || "", campo);
  }

  return 0; // Retornar el valor calculado
}
