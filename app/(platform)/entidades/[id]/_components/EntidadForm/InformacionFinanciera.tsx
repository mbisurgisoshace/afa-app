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
import {
  peorSituacionValue,
  perfilCumplimientoDeudorValue,
} from "../NosisResponseMapper";

export default function InformacionFinanciera() {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  const getScoreColor = (score: number) => {
    if (score >= 0 && score <= 299) {
      return "bg-red-600";
    } else if (score >= 300 && score <= 499) {
      return "bg-orange-600";
    } else if (score >= 500 && score <= 649) {
      return "bg-yellow-600";
    } else if (score >= 650 && score <= 999) {
      return "bg-green-600";
    }
  };

  return (
    <AccordionItem
      value="informacion_nosis"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Informacion Financiera</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="riesgoPeorSituacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peor situación</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={peorSituacionValue(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoCantidadBancos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad bancos</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoMontoTotal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto Total</FormLabel>
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
              name="riesgoAntiguedadBCRA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antiguedad BCRA (meses)</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoPeorSituacion12Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peor situación - Últ. 12 Meses</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={peorSituacionValue(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoCantidadBancos12Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad Entidades</FormLabel>
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
              name="riesgoPerfilCumplimientoDeudor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perfil Cumplimiento del Deudor</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      value={perfilCumplimientoDeudorValue(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoEsMoroso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dias Atraso Pago</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoCantidadSinFondosNoPagados6Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad Cheques Rechazados</FormLabel>
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
              name="riesgoMontoSinFondosNoPagados6Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto Cheques Rechazados</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoJuiciosCantidad12Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Juicios cantidad - Últ. 12 meses</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoConcursosQuiebrasCantidad12Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Concursos y quiebras cantidad - Últ. 12 meses
                  </FormLabel>
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
              name="riesgoScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score (0 - 999)</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input disabled {...field} />
                      <div
                        className={`rounded-full size-3 ${getScoreColor(
                          field.value
                        )} -ml-6`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoProveedorEstado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Es proveedor del estado</FormLabel>
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
              name="riesgoFacturasApocrifas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiene facturas apócrifas</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoDeudasFiscales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiene deudas fiscales</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoPedidoQuebrasCantidad12Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pedido quiebras cantidad - Últ. 12 meses
                  </FormLabel>
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
              name="riesgoSectorActividadPrincipalDelEmpleador"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Sector actividad principal del empleador (Nº1)
                  </FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riesgoSujetoObligado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CUIL/CUIT consultado es Sujeto Obligado</FormLabel>
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
              name="riesgoPersonaExpuestaPoliticamente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    CUIL/CUIT consultado es Persona expuesta políticamente
                  </FormLabel>
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
