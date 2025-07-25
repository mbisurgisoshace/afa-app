"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Club from "./EntidadForm/Club";
import { EntidadSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { EntidadWithPersonasInteres } from "@/types";
import { Accordion } from "@/components/ui/accordion";
import PersonasHumanas from "./EntidadForm/PersonasHumanas";
import PaisesDondeOpera from "./EntidadForm/PaisesDondeOpera";
import PersonasJuridicas from "./EntidadForm/PersonasJuridicas";
import ConflictoIntereses from "./EntidadForm/ConflictoIntereses";
import InformacionGeneral from "./EntidadForm/InformacionGeneral";
import InformacionBancaria from "./EntidadForm/InformacionBancaria";
import InformacionFinanciera from "./EntidadForm/InformacionFinanciera";

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
      decJuradaBeneficiarios: entidad.decJuradaBeneficiarios ? "si" : "no",
      paisCuentaExterior: entidad.paisCuentaExterior,
      iban: entidad.iban,
      swift: entidad.swift,
      bancoCorresponsal: entidad.bancoCorresponsal,
      tieneOficinasExterior: entidad.tieneOficinasExterior ? "si" : "no",
      oficinasExterior: entidad.oficinasExterior,
      tieneOperacionesExterior: entidad.tieneOperacionesExterior ? "si" : "no",
      tieneProgramaIntegridad: entidad.tieneProgramaIntegridad ? "si" : "no",
      tieneProgramaPrevencion: entidad.tieneProgramaPrevencion ? "si" : "no",
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
      riesgoPeorSituacion: entidad.riesgoPeorSituacion,
      riesgoCantidadBancos: entidad.riesgoCantidadBancos,
      riesgoMontoTotal: entidad.riesgoMontoTotal,
      riesgoPeorSituacion12Meses: entidad.riesgoPeorSituacion12Meses,
      riesgoCantidadBancos12Meses: entidad.riesgoCantidadBancos12Meses,
      riesgoEsMoroso: entidad.riesgoEsMoroso ? "si" : "no",
      riesgoCantidadSinFondosNoPagados6Meses:
        entidad.riesgoCantidadSinFondosNoPagados6Meses,
      riesgoMontoSinFondosNoPagados6Meses:
        entidad.riesgoMontoSinFondosNoPagados6Meses,
      riesgoJuiciosCantidad12Meses: entidad.riesgoJuiciosCantidad12Meses,
      riesgoConcursosQuiebrasCantidad12Meses:
        entidad.riesgoConcursosQuiebrasCantidad12Meses,
      riesgoScore: entidad.riesgoScore,
      riesgoFacturacionEstimada: entidad.riesgoFacturacionEstimada,
      riesgoProveedorEstado: entidad.riesgoProveedorEstado,
      riesgoFacturasApocrifas: entidad.riesgoFacturasApocrifas ? "si" : "no",
      riesgoDeudasFiscales: entidad.riesgoDeudasFiscales ? "si" : "no",
      riesgoPedidoQuebrasCantidad12Meses:
        entidad.riesgoPedidoQuebrasCantidad12Meses,
      riesgoSujetoObligado: entidad.riesgoSujetoObligado,
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
      decJuradaBeneficiarios: entidad.decJuradaBeneficiarios ? "si" : "no",
      paisCuentaExterior: entidad.paisCuentaExterior,
      iban: entidad.iban,
      swift: entidad.swift,
      bancoCorresponsal: entidad.bancoCorresponsal,
      tieneOficinasExterior: entidad.tieneOficinasExterior ? "si" : "no",
      tieneProgramaIntegridad: entidad.tieneProgramaIntegridad ? "si" : "no",
      tieneProgramaPrevencion: entidad.tieneProgramaPrevencion ? "si" : "no",
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
      riesgoPeorSituacion: entidad.riesgoPeorSituacion,
      riesgoCantidadBancos: entidad.riesgoCantidadBancos,
      riesgoMontoTotal: entidad.riesgoMontoTotal,
      riesgoPeorSituacion12Meses: entidad.riesgoPeorSituacion12Meses,
      riesgoCantidadBancos12Meses: entidad.riesgoCantidadBancos12Meses,
      riesgoEsMoroso: entidad.riesgoEsMoroso ? "si" : "no",
      riesgoCantidadSinFondosNoPagados6Meses:
        entidad.riesgoCantidadSinFondosNoPagados6Meses,
      riesgoMontoSinFondosNoPagados6Meses:
        entidad.riesgoMontoSinFondosNoPagados6Meses,
      riesgoJuiciosCantidad12Meses: entidad.riesgoJuiciosCantidad12Meses,
      riesgoConcursosQuiebrasCantidad12Meses:
        entidad.riesgoConcursosQuiebrasCantidad12Meses,
      riesgoScore: entidad.riesgoScore,
      riesgoFacturacionEstimada: entidad.riesgoFacturacionEstimada,
      riesgoProveedorEstado: entidad.riesgoProveedorEstado,
      riesgoFacturasApocrifas: entidad.riesgoFacturasApocrifas ? "si" : "no",
      riesgoDeudasFiscales: entidad.riesgoDeudasFiscales ? "si" : "no",
      riesgoPedidoQuebrasCantidad12Meses:
        entidad.riesgoPedidoQuebrasCantidad12Meses,
      riesgoSujetoObligado: entidad.riesgoSujetoObligado
        ? "posible sujeto obligado"
        : "no",
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
          {/* <Nosis /> */}
          <InformacionFinanciera />
        </Accordion>
      </form>
    </Form>
  );
}
