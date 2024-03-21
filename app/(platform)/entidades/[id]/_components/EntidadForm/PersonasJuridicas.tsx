import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EntidadSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { tipoSocietarioDbMapper } from "@/lib/jotform/mapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PersonasJuridicas() {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="personas_juridicas"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos Personas Juridicas</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razon Social</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoSocietario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cuenta</FormLabel>
                  <Select
                    disabled
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(tipoSocietarioDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={tipoSocietarioDbMapper[key]}
                        >
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaConstitucionSociedad"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Fecha de constitucion de la sociedad</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled
                          variant={"datepicker"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaInscripcionRpc"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Fecha de inscripcion en RPC</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled
                          variant={"datepicker"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datosInscripcionRegistrales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datos de inscripcion registrales</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="cotizaEnBolsa"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cotiza en Bolsa</FormLabel>
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

          <div className="flex flex-row gap-2">
            {/* TODO: Add multiple selects */}
            {form.watch().cotizaEnBolsa === "si" &&
              form
                .getValues()
                .dondeCotiza.map((dondeCotiza: string) => (
                  <Badge key={dondeCotiza}>{dondeCotiza}</Badge>
                ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
