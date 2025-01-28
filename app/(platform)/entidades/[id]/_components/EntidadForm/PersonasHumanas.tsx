import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  estadoCivilDbMapper,
  sexoDbMapper,
  tipoDocumentoAfipDbMapper,
  tipoDocumentoDbMapper,
} from "@/lib/jotform/mapper";
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
import { PersonaInteres } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { representatesLegalesColumns } from "./columns";

interface PersonasHumanasProps {
  paises: string[];
  oficios: string[];
  profesiones: string[];
}

export default function PersonasHumanas({
  paises,
  oficios,
  profesiones,
}: PersonasHumanasProps) {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="personas_humanas"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos Personas Humanas</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="nombreCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nacionalidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidad</FormLabel>
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
                      {paises.map((pais) => (
                        <SelectItem key={pais} value={pais}>
                          {pais}
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
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Documento</FormLabel>
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
                      {Object.keys(tipoDocumentoDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={tipoDocumentoDbMapper[key]}
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
          </div>

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de Documento</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
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
                      {Object.keys(sexoDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={sexoDbMapper[key]}
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
              name="estadoCivil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
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
                      {Object.keys(estadoCivilDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={estadoCivilDbMapper[key]}
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
          </div>
          <div className="w-fill grid grid-cols-3 gap-3"></div>

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="fechaNacimiento"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Fecha de Nacimiento</FormLabel>
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
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pais de Nacimiento</FormLabel>
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
                      {paises.map((pais) => (
                        <SelectItem key={pais} value={pais}>
                          {pais}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="profesion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profesion</FormLabel>
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
                      {profesiones.map((profesion) => (
                        <SelectItem key={profesion} value={profesion}>
                          {profesion}
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
              name="oficio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oficio</FormLabel>
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
                      {oficios.map((oficio) => (
                        <SelectItem key={oficio} value={oficio}>
                          {oficio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="expuestaPoliticamente"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Es expuesta politicamente?</FormLabel>
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

            <FormField
              control={form.control}
              name="esPepEnCaracterDe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Es PEP en carácter de</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-fill grid grid-cols-1 gap-3">
            <FormLabel>Representates Legales</FormLabel>

            <DataTable
              columns={representatesLegalesColumns}
              data={form
                .watch()
                .personasInteres.filter(
                  (personaInteres: PersonaInteres) =>
                    personaInteres.tipoPersonaInteres ===
                      "REPRESENTANTE_LEGAL" ||
                    personaInteres.tipoPersonaInteres === "OTRO"
                )}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
