import { z } from "zod";
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
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { EntidadSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { tipoCuentaBancariaDbMapper } from "@/lib/jotform/mapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InformacionBancariaProps {
  paises: string[];
}

export default function InformacionBancaria({
  paises,
}: InformacionBancariaProps) {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="datos_bancarios"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>
        Identificación bancaria para gestión de pagos
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="titularCuentaBancaria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del titular de la cuenta</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bancoCuentaBancaria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Banco</FormLabel>
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
              name="sucursalCuentaBancaria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sucursal</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numeroCuentaBancaria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero de la cuenta</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoCuentaBancaria"
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
                      {Object.keys(tipoCuentaBancariaDbMapper).map((key) => (
                        <SelectItem
                          key={key}
                          //@ts-ignore
                          value={tipoCuentaBancariaDbMapper[key]}
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
              name="cbu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CBU</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alias</FormLabel>
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
              name="cuentaEnExterior"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Tiene cuentas bancarias fuera de la Argentina
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

            {form.watch().cuentaEnExterior === "si" && (
              <FormField
                control={form.control}
                name="paisCuentaExterior"
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
            )}
          </div>

          {form.watch().cuentaEnExterior === "si" && (
            <div className="w-fill grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="iban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="swift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SWIFT</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bancoCorresponsal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banco Corresponsal</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
