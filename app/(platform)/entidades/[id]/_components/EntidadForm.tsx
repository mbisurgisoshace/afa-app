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
import { Form } from "@/components/ui/form";
import InformacionGeneral from "./EntidadForm/InformacionGeneral";
import { EntidadSchema } from "@/schemas";
import { Entidad } from "@prisma/client";
import { useEntidadesStore } from "@/zustand/store";

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
    },
  });

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
          <AccordionItem
            value="datos_bancarios"
            className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
          >
            <AccordionTrigger>
              Identificación bancaria para gestión de pagos
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
}
