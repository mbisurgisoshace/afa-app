"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EntidadSchema } from "@/schemas";
import { z } from "zod";
import {
  condicionIvaDbMapper,
  tipoActividadDbMapper,
  tipoEntidadDbMapper,
  tipoRelacionDbMapper,
} from "@/lib/jotform/mapper";

interface InformacionGeneralProps {
  paises: string[];
  industrias: string[];
  actividadesAfip: string[];
}

export default function InformacionGeneral({
  paises,
  industrias,
  actividadesAfip,
}: InformacionGeneralProps) {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="generales"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos generales</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="codigoEntidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Entidad</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={format(field.value, "PPP", { locale: es })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoRelacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Relacion</FormLabel>
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
                      {Object.keys(tipoRelacionDbMapper).map((key) => (
                        //@ts-ignore
                        <SelectItem key={key} value={tipoRelacionDbMapper[key]}>
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
              name="tipoActividad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de de Actividad</FormLabel>
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
                      {Object.keys(tipoActividadDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={tipoActividadDbMapper[key]}
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
              name="condicionIva"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Responsable frente Afip</FormLabel>
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
                      {Object.keys(condicionIvaDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={condicionIvaDbMapper[key]}
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
              name="codigoActividadAfip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industria que corresponde la actividad</FormLabel>
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
                      {actividadesAfip.map((actividadAFip) => (
                        <SelectItem key={actividadAFip} value={actividadAFip}>
                          {actividadAFip}
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
              name="tipoIndustria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industria que corresponde la actividad</FormLabel>
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
                      {industrias.map((industria) => (
                        <SelectItem key={industria} value={industria}>
                          {industria}
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
              name="ingresosEnPesos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingreso en $</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaCierrePesos"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Fecha de Cierre</FormLabel>
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

            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="fecha">Fecha de Cierre</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal"
                      //!date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {"" ? format("", "PPP") : <span>Seleccione una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    //selected={date}
                    //onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div> */}
            <FormField
              control={form.control}
              name="tipoDePersona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Persona</FormLabel>
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
                      {Object.keys(tipoEntidadDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={tipoEntidadDbMapper[key]}
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
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado / Provincia</FormLabel>
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
              name="codigoPostal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Postal</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pais</FormLabel>
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
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de Contacto</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactoAfa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Persona de Contacto en AFA</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
