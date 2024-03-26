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
import { DataTable } from "@/components/DataTable";
import {
  empleadosActualesExAfaColumns,
  exEmpleadosActualesAfaColumns,
  familiaresEnComunColumns,
  intereseEconomicoEnComunColumns,
} from "./columns";

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

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="empleadoActualExAfa"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Miembros actuales ex empleados de AFA en los últimos 3 años
                  </FormLabel>
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
          </div>

          {form.watch().empleadoActualExAfa === "si" && (
            <div className="w-fill grid grid-cols-1 gap-3">
              <DataTable
                columns={empleadosActualesExAfaColumns}
                data={form
                  .watch()
                  .personasInteres.filter(
                    (personaInteres: any) =>
                      personaInteres.tipoPersonaInteres === "EMPLEADO_EX_AFA"
                  )}
              />
            </div>
          )}

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="exEmpleadoActualAfa"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Ex miembros en los últimos 3 años que sean empleados
                    actuales de AFA
                  </FormLabel>
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
          </div>

          {form.watch().exEmpleadoActualAfa === "si" && (
            <div className="w-fill grid grid-cols-1 gap-3">
              <DataTable
                columns={exEmpleadosActualesAfaColumns}
                data={form
                  .watch()
                  .personasInteres.filter(
                    (personaInteres: any) =>
                      personaInteres.tipoPersonaInteres ===
                      "EX_EMPLEADO_ACTUAL_AFA"
                  )}
              />
            </div>
          )}

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="familiarComunAfaEntidad"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Familar en comun con AFA</FormLabel>
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
          </div>

          {form.watch().familiarComunAfaEntidad === "si" && (
            <div className="w-fill grid grid-cols-1 gap-3">
              <DataTable
                columns={familiaresEnComunColumns}
                data={form
                  .watch()
                  .personasInteres.filter(
                    (personaInteres: any) =>
                      personaInteres.tipoPersonaInteres ===
                      "FAMILIAR_COMUN_AFA_ENTIDAD"
                  )}
              />
            </div>
          )}

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="personalConInteresEconomicoAfa"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Persona con interes economico en comun con AFA
                  </FormLabel>
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
          </div>

          {form.watch().personalConInteresEconomicoAfa === "si" && (
            <div className="w-fill grid grid-cols-1 gap-3">
              <DataTable
                columns={intereseEconomicoEnComunColumns}
                data={form
                  .watch()
                  .personasInteres.filter(
                    (personaInteres: any) =>
                      personaInteres.tipoPersonaInteres ===
                      "PERSONAL_INTERES_ECONOMICO_AFA"
                  )}
              />
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
