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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EntidadForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-3"
        >
          <AccordionItem
            value="generales"
            className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
          >
            <AccordionTrigger>Datos generales</AccordionTrigger>
            <AccordionContent>
              <div className="w-fill grid grid-cols-2 gap-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="codigoEntidad">Codigo</Label>
                  <Input type="codigoEntidad" id="codigoEntidad" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="fecha">Fecha de Creacion</Label>
                  <Input type="fecha" id="fecha" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
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
