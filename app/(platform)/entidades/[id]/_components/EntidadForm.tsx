"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Accordion } from "@/components/ui/accordion";
import Nosis from "./EntidadForm/Nosis";
import { EntidadSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { EntidadWithPersonasInteres } from "@/types";
import InformacionGeneral from "./EntidadForm/InformacionGeneral";
import InformacionBancaria from "./EntidadForm/InformacionBancaria";
import PaisesDondeOpera from "./EntidadForm/PaisesDondeOpera";
import PersonasHumanas from "./EntidadForm/PersonasHumanas";
import PersonasJuridicas from "./EntidadForm/PersonasJuridicas";
import ConflictoIntereses from "./EntidadForm/ConflictoIntereses";
import Club from "./EntidadForm/Club";

interface Tablas {
  paises: string[];
  oficios: string[];
  industrias: string[];
  profesiones: string[];
  actividadesAfip: string[];
}

interface EntidadFormProps {
  tablas: Tablas;
  entidad: EntidadWithPersonasInteres;
}

export default function EntidadForm({ tablas, entidad }: EntidadFormProps) {
  const form = useForm<z.infer<typeof EntidadSchema>>({
    resolver: zodResolver(EntidadSchema),
    defaultValues: {
      codigoEntidad: entidad.codigoEntidad,
      fecha: entidad.fecha?.toLocaleString(),
      tipoRelacion: entidad.tipoRelacion,
      tipoActividad: entidad.tipoActividad,
      tipoIndustria: entidad.tipoIndustria,
      codigoActividadAfip: entidad.codigoActividadAfip,
      fechaCierrePesos: entidad.fechaCierrePesos,
      condicionIva: entidad.condicionIva,
      ingresosEnPesos: entidad.ingresosEnPesos,
      tipoDePersona: entidad.tipoDePersona,
      direccion: entidad.direccion,
      ciudad: entidad.ciudad,
      codigoPostal: entidad.codigoPostal,
      estado: entidad.estado,
      pais: entidad.pais,
      telefono: entidad.telefono,
      email: entidad.email,
      contactoAfa: entidad.contactoAfa,
      bancoCuentaBancaria: entidad.bancoCuentaBancaria,
      titularCuentaBancaria: entidad.titularCuentaBancaria,
      sucursalCuentaBancaria: entidad.sucursalCuentaBancaria,
      numeroCuentaBancaria: entidad.numeroCuentaBancaria,
      cbu: entidad.cbu || "",
      alias: entidad.alias || "",
      tipoCuentaBancaria: entidad.tipoCuentaBancaria,
      cuentaEnExterior: entidad.cuentaEnExterior ? "si" : "no",
      paisCuentaExterior: entidad.paisCuentaExterior,
      iban: entidad.iban,
      swift: entidad.swift,
      bancoCorresponsal: entidad.bancoCorresponsal,
      tieneOficinasExterior: entidad.tieneOficinasExterior ? "si" : "no",
      oficinasExterior: entidad.oficinasExterior,
      tieneOperacionesExterior: entidad.tieneOperacionesExterior ? "si" : "no",
      operacionesExterior: entidad.operacionesExterior,
      montoOperacionesExterior: entidad.montoOperacionesExterior,
      fechaCierrePesosExterior: entidad.fechaCierrePesosExterior,
      porcentajeExportacionVsTotal: entidad.porcentajeExportacionVsTotal,
      razonSocial: entidad.razonSocial,
      tipoSocietario: entidad.tipoSocietario,
      fechaConstitucionSociedad: entidad.fechaConstitucionSociedad,
      fechaInscripcionRpc: entidad.fechaInscripcionRpc,
      datosInscripcionRegistrales: entidad.datosInscripcionRegistrales,
      cotizaEnBolsa: entidad.cotizaEnBolsa ? "si" : "no",
      dondeCotiza: entidad.dondeCotiza,
      nombreCompleto: entidad.nombreCompleto,
      nacionalidad: entidad.nacionalidad,
      tipoDocumento: entidad.tieneOficinasExterior,
      dni: entidad.dni,
      cuit: entidad.cuit,
      tipoDocumentoAfip: entidad.tipoDocumentoAfip,
      sexo: entidad.sexo,
      estadoCivil: entidad.estadoCivil,
      fechaNacimiento: entidad.fechaNacimiento,
      profesion: entidad.profesion,
      oficio: entidad.oficio,
      expuestaPoliticamente: entidad.expuestaPoliticamente ? "si" : "no",
      esPepEnCaracterDe: entidad.esPepEnCaracterDe,
      conflictoInteresEmpleadosAfa: entidad.conflictoInteresEmpleadosAfa
        ? "si"
        : "no",
      descripcionConflictoInteresEmpleadosAfa:
        entidad.descripcionConflictoInteresEmpleadosAfa,
      empleadoActualExAfa: entidad.empleadoActualExAfa ? "si" : "no",
      exEmpleadoActualAfa: entidad.exEmpleadoActualAfa ? "si" : "no",
      familiarComunAfaEntidad: entidad.familiarComunAfaEntidad ? "si" : "no",
      personalConInteresEconomicoAfa: entidad.personalConInteresEconomicoAfa
        ? "si"
        : "no",
      personasInteres: entidad.personasInteres,
      categoriaClub: entidad.categoriaClub,
      nosisPeorSituacion: entidad.nosisPeorSituacion,
      nosisCantidadBancos: entidad.nosisCantidadBancos,
      nosisMontoTotal: entidad.nosisMontoTotal,
      nosisAntiguedadBCRA: entidad.nosisAntiguedadBCRA,
      nosisPeorSituacion12Meses: entidad.nosisPeorSituacion12Meses,
      nosisCantidadBancos12Meses: entidad.nosisCantidadBancos12Meses,
      nosisPerfilCumplimientoDeudor: entidad.nosisPerfilCumplimientoDeudor,
      nosisEsMoroso: entidad.nosisEsMoroso ? "si" : "no",
      nosisCantidadSinFondosNoPagados6Meses:
        entidad.nosisCantidadSinFondosNoPagados6Meses,
      nosisMontoSinFondosNoPagados6Meses:
        entidad.nosisMontoSinFondosNoPagados6Meses,
      nosisJuiciosCantidad12Meses: entidad.nosisJuiciosCantidad12Meses,
      nosisConcursosQuiebrasCantidad12Meses:
        entidad.nosisConcursosQuiebrasCantidad12Meses,
      nosisScore: entidad.nosisScore,
      nosisFacturacionEstimada: entidad.nosisFacturacionEstimada,
      nosisProveedorEstado: entidad.nosisProveedorEstado,
      nosisFacturasApocrifas: entidad.nosisFacturasApocrifas ? "si" : "no",
      nosisDeudasFiscales: entidad.nosisDeudasFiscales ? "si" : "no",
      nosisPedidoQuebrasCantidad12Meses:
        entidad.nosisPedidoQuebrasCantidad12Meses,
      nosisPeorSituacionCon10Porciento12Mesas:
        entidad.nosisPeorSituacionCon10Porciento12Mesas,
      nosisSectorActividadPrincipalDelEmpleador:
        entidad.nosisSectorActividadPrincipalDelEmpleador,
      nosisSujetoObligado: entidad.nosisSujetoObligado,
      nosisPersonaExpuestaPoliticamente:
        entidad.nosisPersonaExpuestaPoliticamente,
      nosisCantidadHomonimosEnBaseLaFt:
        entidad.nosisCantidadHomonimosEnBaseLaFt,
      nosisEnlanceHomonimosEnBaseLaFt: entidad.nosisEnlanceHomonimosEnBaseLaFt,
      nosisPeorSituacion12MesesBcra: entidad.nosisPeorSituacion12MesesBcra,
    },
  });

  useEffect(() => {
    form.reset({
      codigoEntidad: entidad.codigoEntidad,
      fecha: entidad.fecha?.toLocaleString(),
      tipoRelacion: entidad.tipoRelacion,
      tipoActividad: entidad.tipoActividad,
      tipoIndustria: entidad.tipoIndustria,
      codigoActividadAfip: entidad.codigoActividadAfip,
      fechaCierrePesos: entidad.fechaCierrePesos,
      condicionIva: entidad.condicionIva,
      ingresosEnPesos: entidad.ingresosEnPesos,
      tipoDePersona: entidad.tipoDePersona,
      direccion: entidad.direccion,
      ciudad: entidad.ciudad,
      codigoPostal: entidad.codigoPostal,
      estado: entidad.estado,
      pais: entidad.pais,
      telefono: entidad.telefono,
      email: entidad.email,
      contactoAfa: entidad.contactoAfa,
      bancoCuentaBancaria: entidad.bancoCuentaBancaria,
      titularCuentaBancaria: entidad.titularCuentaBancaria,
      sucursalCuentaBancaria: entidad.sucursalCuentaBancaria,
      numeroCuentaBancaria: entidad.numeroCuentaBancaria,
      cbu: entidad.cbu || "",
      alias: entidad.alias || "",
      tipoCuentaBancaria: entidad.tipoCuentaBancaria,
      cuentaEnExterior: entidad.cuentaEnExterior ? "si" : "no",
      paisCuentaExterior: entidad.paisCuentaExterior,
      iban: entidad.iban,
      swift: entidad.swift,
      bancoCorresponsal: entidad.bancoCorresponsal,
      tieneOficinasExterior: entidad.tieneOficinasExterior ? "si" : "no",
      oficinasExterior: entidad.oficinasExterior,
      tieneOperacionesExterior: entidad.tieneOperacionesExterior ? "si" : "no",
      operacionesExterior: entidad.operacionesExterior,
      montoOperacionesExterior: entidad.montoOperacionesExterior,
      fechaCierrePesosExterior: entidad.fechaCierrePesosExterior,
      porcentajeExportacionVsTotal: entidad.porcentajeExportacionVsTotal,
      razonSocial: entidad.razonSocial,
      tipoSocietario: entidad.tipoSocietario,
      fechaConstitucionSociedad: entidad.fechaConstitucionSociedad,
      fechaInscripcionRpc: entidad.fechaInscripcionRpc,
      datosInscripcionRegistrales: entidad.datosInscripcionRegistrales,
      cotizaEnBolsa: entidad.cotizaEnBolsa ? "si" : "no",
      dondeCotiza: entidad.dondeCotiza,
      nombreCompleto: entidad.nombreCompleto,
      nacionalidad: entidad.nacionalidad,
      tipoDocumento: entidad.tieneOficinasExterior,
      dni: entidad.dni,
      cuit: entidad.cuit,
      tipoDocumentoAfip: entidad.tipoDocumentoAfip,
      sexo: entidad.sexo,
      estadoCivil: entidad.estadoCivil,
      fechaNacimiento: entidad.fechaNacimiento,
      profesion: entidad.profesion,
      oficio: entidad.oficio,
      expuestaPoliticamente: entidad.expuestaPoliticamente ? "si" : "no",
      esPepEnCaracterDe: entidad.esPepEnCaracterDe,
      conflictoInteresEmpleadosAfa: entidad.conflictoInteresEmpleadosAfa
        ? "si"
        : "no",
      descripcionConflictoInteresEmpleadosAfa:
        entidad.descripcionConflictoInteresEmpleadosAfa,
      empleadoActualExAfa: entidad.empleadoActualExAfa ? "si" : "no",
      exEmpleadoActualAfa: entidad.exEmpleadoActualAfa ? "si" : "no",
      familiarComunAfaEntidad: entidad.familiarComunAfaEntidad ? "si" : "no",
      personalConInteresEconomicoAfa: entidad.personalConInteresEconomicoAfa
        ? "si"
        : "no",
      personasInteres: entidad.personasInteres,
      categoriaClub: entidad.categoriaClub,
      nosisPeorSituacion: entidad.nosisPeorSituacion,
      nosisCantidadBancos: entidad.nosisCantidadBancos,
      nosisMontoTotal: entidad.nosisMontoTotal,
      nosisAntiguedadBCRA: entidad.nosisAntiguedadBCRA,
      nosisPeorSituacion12Meses: entidad.nosisPeorSituacion12Meses,
      nosisCantidadBancos12Meses: entidad.nosisCantidadBancos12Meses,
      nosisPerfilCumplimientoDeudor: entidad.nosisPerfilCumplimientoDeudor,
      nosisEsMoroso: entidad.nosisEsMoroso ? "si" : "no",
      nosisCantidadSinFondosNoPagados6Meses:
        entidad.nosisCantidadSinFondosNoPagados6Meses,
      nosisMontoSinFondosNoPagados6Meses:
        entidad.nosisMontoSinFondosNoPagados6Meses,
      nosisJuiciosCantidad12Meses: entidad.nosisJuiciosCantidad12Meses,
      nosisConcursosQuiebrasCantidad12Meses:
        entidad.nosisConcursosQuiebrasCantidad12Meses,
      nosisScore: entidad.nosisScore,
      nosisFacturacionEstimada: entidad.nosisFacturacionEstimada,
      nosisProveedorEstado: entidad.nosisProveedorEstado,
      nosisFacturasApocrifas: entidad.nosisFacturasApocrifas ? "si" : "no",
      nosisDeudasFiscales: entidad.nosisDeudasFiscales ? "si" : "no",
      nosisPedidoQuebrasCantidad12Meses:
        entidad.nosisPedidoQuebrasCantidad12Meses,
      nosisPeorSituacionCon10Porciento12Mesas:
        entidad.nosisPeorSituacionCon10Porciento12Mesas,
      nosisSectorActividadPrincipalDelEmpleador:
        entidad.nosisSectorActividadPrincipalDelEmpleador,
      nosisSujetoObligado: entidad.nosisSujetoObligado,
      nosisPersonaExpuestaPoliticamente:
        entidad.nosisPersonaExpuestaPoliticamente,
      nosisCantidadHomonimosEnBaseLaFt:
        entidad.nosisCantidadHomonimosEnBaseLaFt,
      nosisEnlanceHomonimosEnBaseLaFt: entidad.nosisEnlanceHomonimosEnBaseLaFt,
      nosisPeorSituacion12MesesBcra: entidad.nosisPeorSituacion12MesesBcra,
    });
  }, [form, entidad]);

  return (
    <Form {...form}>
      <form>
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-3"
        >
          <InformacionGeneral
            paises={tablas.paises}
            industrias={tablas.industrias}
            actividadesAfip={tablas.actividadesAfip}
          />
          <InformacionBancaria paises={tablas.paises} />
          <PaisesDondeOpera paises={tablas.paises} />
          {form.watch().tipoDePersona === "HUMANA" && (
            <PersonasHumanas
              paises={tablas.paises}
              oficios={tablas.oficios}
              profesiones={tablas.profesiones}
            />
          )}
          {form.watch().tipoRelacion === "CLUB" && <Club />}
          {form.watch().tipoDePersona === "JURIDICA" && <PersonasJuridicas />}
          <ConflictoIntereses />
          <Nosis />
        </Accordion>
      </form>
    </Form>
  );
}
