import { z } from "zod";
import { useFormContext } from "react-hook-form";

import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EntidadSchema } from "@/schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function ConflictoIntereses() {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="conflictos_interes"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Conflictos de Interes</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="conflictoInteresEmpleadosAfa"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Conflicto de Interes con AFA</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">Si</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch().conflictoInteresEmpleadosAfa === "si" && (
              <FormField
                control={form.control}
                name="descripcionConflictoInteresEmpleadosAfa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descripcion conflicto de interes con AFA
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
