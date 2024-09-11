import { z } from "zod";
import { useFormContext } from "react-hook-form";

import { EntidadSchema } from "@/schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/DataTable";
import { representatesLegalesColumns } from "./columns";
import { PersonaInteres } from "@prisma/client";

export default function Club() {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="club"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos Club</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoriaClub"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria Club</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-fill grid grid-cols-1 gap-3">
            <FormLabel>Autoridades</FormLabel>

            <DataTable
              columns={representatesLegalesColumns}
              data={form
                .watch()
                .personasInteres.filter(
                  (personaInteres: PersonaInteres) =>
                    personaInteres.tipoPersonaInteres === "PRESIDENTE" ||
                    personaInteres.tipoPersonaInteres === "VICEPRESIDENTE" ||
                    personaInteres.tipoPersonaInteres === "TESORERO" ||
                    personaInteres.tipoPersonaInteres === "SECRETARIO"
                )}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
