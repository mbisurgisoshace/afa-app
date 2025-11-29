"use server";

import { CampoRiesgo, Entidad, RiesgoItem } from "@prisma/client";

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
import { calcularRiesgoPedidoQuiebrasCantidad12Meses } from "./Campos/riesgoPedidoQuebrasCantidad12Meses";
import { calcularRiesgoPeorSituacion } from "./Campos/riesgoPeorSituacion";
import { calcularRiesgoPeorSituacion12Meses } from "./Campos/riesgoPeorSituacion12Meses";
import { calcularRiesgoFactApocrifas } from "./Campos/riesgoFactApocrifas";
import { calcularRiesgoSancionadosUif } from "./Campos/riesgoSancionadosUIF";
import { calcularRiesgoSujetoObligado } from "./Campos/riesgoSujetoObligado";
import { calcularEsSujetoObligado } from "./Campos/esSujetoObligado";
import { calcularRazonSujetoObligado } from "./Campos/razonSujetoObligado";
import { calcularDeclaracionJuradaBeneficiarios } from "./Campos/decJuradaBeneficiarios";
import { calcularPorcentajeExportacionVsTotal } from "./Campos/porcentajeExportacionVsTotal";
import { calcularCotizaEnBolsa } from "./Campos/cotizaEnBolsa";
import { calcularNacionalidad } from "./Campos/nacionalidad";
import { calcularOficinasExterior } from "./Campos/oficinasExterior";
import { calcularOperacionesExterior } from "./Campos/operacionesExterior";
import { calcularPais } from "./Campos/pais";
import { calcularPaisCuentaExterior } from "./Campos/paisCuentaExterior";
import { calcularDondeCotiza } from "./Campos/dondeCotiza";
import { calcularRiesgoConcursosQuiebrasCantidad12Meses } from "./Campos/riesgoConcursosQuiebrasCantidad12Meses";
import { EntidadWithPersonasInteres } from "@/types";
import { calcularRiesgoScore } from "./Campos/riesgoScore";
import { calcularRiesgoProgramaPrevencion } from "./Campos/tieneProgramaPrevencion";
import { calcularRiesgoProgramaIntegridad } from "./Campos/tieneProgramaIntegridad";
import { revalidatePath } from "next/cache";

export default async function calcularRiesgo(
  codigoEntidad: string
): Promise<void> {
  const entidad = await db.entidad.findUnique({
    where: { codigoEntidad },
    include: {
      personasInteres: true,
    },
  });

  if (!entidad) {
    throw new Error("Entidad no encontrada");
  }

  // Obtener el listado de campos a utilizar en el calculo del riesgo
  const camposCalculador = await obtenerCamposParaCalculo();
  let riesgoTotal = 0;
  const riesgos = [];
  for (const campo of camposCalculador) {
    const riesgoCampo = await calcularRiesgoCampo(entidad, campo);
    const riesgoFinal =
      toNumber(riesgoCampo) * toNumber(campo.grupoRiesgo.ponderacionRiesgo);

    riesgoTotal += riesgoFinal;
    riesgos.push({
      campoId: campo.id,
      nombreCampo: campo.nombreCampo!,
      categoriaCampo: campo.grupoRiesgo.grupo!,
      valorCampo: riesgoFinal,
    });
  }

  const riesgo = {
    entidadId: entidad.id,
    valorRiesgoFinal: riesgoTotal,
  };

  await db.riesgo.create({
    data: {
      ...riesgo,
      items: {
        create: riesgos,
      },
    },
  });

  revalidatePath(`/entidades/${entidad.codigoEntidad}`);
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
    return calcularEsPepEnCaracterDe(
      entidad as EntidadWithPersonasInteres,
      entidad.esPepEnCaracterDe || "",
      campo
    );
  }

  if (campo.campo === "exEmpleadoActualAfa") {
    return calcularExEmpleadoActualAfa(!!entidad.exEmpleadoActualAfa, campo);
  }

  if (campo.campo === "expuestaPoliticamente") {
    return calcularExpuestaPoliticamente(
      entidad as EntidadWithPersonasInteres,
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

  if (campo.campo === "riesgoSancionadosUIF") {
    return calcularRiesgoSancionadosUif(
      entidad.cuit?.replaceAll("-", "").replaceAll(" ", "") || "",
      campo
    );
  }

  if (campo.campo === "riesgoSujetoObligado") {
    return calcularRiesgoSujetoObligado(
      !!entidad.esSujetoObligado,
      entidad.riesgoSujetoObligado === "Posible SO",
      campo
    );
  }

  if (campo.campo === "esSujetoObligado") {
    return calcularEsSujetoObligado(!!entidad.esSujetoObligado, campo);
  }

  if (campo.campo === "razonSujetoObligado") {
    return calcularRazonSujetoObligado(
      entidad.razonSujetoObligado || "",
      campo
    );
  }

  if (campo.campo === "decJuradaBeneficiarios") {
    return calcularDeclaracionJuradaBeneficiarios(
      !!entidad.decJuradaBeneficiarios,
      campo
    );
  }

  if (campo.campo === "porcentajeExportacionVsTotal") {
    return calcularPorcentajeExportacionVsTotal(
      toNumber(entidad.ingresosEnPesos || 0),
      toNumber(entidad.montoOperacionesExterior || 0),
      campo
    );
  }

  if (campo.campo === "cotizaEnBolsa") {
    return calcularCotizaEnBolsa(entidad, !!entidad.cotizaEnBolsa, campo);
  }

  if (campo.campo === "dondeCotiza") {
    return calcularDondeCotiza(entidad.dondeCotiza || [], campo);
  }

  if (campo.campo === "tipoSocietario") {
    return calcularTipoSocietario(entidad.tipoSocietario || "", campo);
  }

  if (campo.campo === "tipoDePersona") {
    return calcularTipoDePersona(entidad.tipoDePersona || "", campo);
  }

  if (campo.campo === "nacionalidad") {
    return calcularNacionalidad(entidad.nacionalidad || "", campo);
  }

  if (campo.campo === "oficinasExterior") {
    return calcularOficinasExterior(entidad.oficinasExterior || [], campo);
  }

  if (campo.campo === "operacionesExterior") {
    return calcularOperacionesExterior(
      entidad.operacionesExterior || [],
      campo
    );
  }

  if (campo.campo === "pais") {
    return calcularPais(entidad.pais || "", campo);
  }

  if (campo.campo === "paisCuentaExterior") {
    return calcularPaisCuentaExterior(entidad.paisCuentaExterior || "", campo);
  }

  if (campo.campo === "riesgoConcursosQuiebrasCantidad12Meses") {
    return calcularRiesgoConcursosQuiebrasCantidad12Meses(
      entidad.riesgoConcursosQuiebrasCantidad12Meses || 0,
      campo
    );
  }

  if (campo.campo === "riesgoScore") {
    return calcularRiesgoScore(entidad.id, campo);
  }

  if (campo.campo === "tieneProgramaIntegridad") {
    return calcularRiesgoProgramaIntegridad(entidad, campo);
  }

  if (campo.campo === "tieneProgramaPrevencion") {
    return calcularRiesgoProgramaPrevencion(entidad, campo);
  }

  return 0; // Retornar el valor calculado
}
