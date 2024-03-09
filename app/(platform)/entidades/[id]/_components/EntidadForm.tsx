"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Entidad } from "@prisma/client";
import { EntidadSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import InformacionGeneral from "./EntidadForm/InformacionGeneral";
import InformacionBancaria from "./EntidadForm/InformacionBancaria";
import PaisesDondeOpera from "./EntidadForm/PaisesDondeOpera";
import PersonasHumanas from "./EntidadForm/PersonasHumanas";
import PersonasJuridicas from "./EntidadForm/PersonasJuridicas";

interface Tablas {
  paises: string[];
  industrias: string[];
  actividadesAfip: string[];
}

interface EntidadFormProps {
  tablas: Tablas;
  entidad: Entidad;
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
    },
  });

  return (
    <Form {...form}>
      <form>
        <Accordion
          type="multiple"
          //collapsible
          className="w-full flex flex-col gap-3"
        >
          <InformacionGeneral
            paises={tablas.paises}
            industrias={tablas.industrias}
            actividadesAfip={tablas.actividadesAfip}
          />
          <InformacionBancaria paises={tablas.paises} />
          <PaisesDondeOpera paises={tablas.paises} />
          {form.watch().tipoDePersona === "HUMANA" && <PersonasHumanas />}
          {form.watch().tipoDePersona === "JURIDICA" && <PersonasJuridicas />}
        </Accordion>
      </form>
    </Form>
  );
}
