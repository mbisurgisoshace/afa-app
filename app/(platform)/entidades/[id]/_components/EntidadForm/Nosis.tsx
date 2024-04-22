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

export default function Nosis() {
  const form = useFormContext<z.infer<typeof EntidadSchema>>();

  return (
    <AccordionItem
      value="informacion_nosis"
      className="bg-white border border-[#DEDEDE] px-6 py-2 rounded-xl"
    >
      <AccordionTrigger>Datos Nosis</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-8">
          <div className="w-fill grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="nosisPeorSituacion"
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
              name="nosisCantidadBancos"
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
              name="nosisMontoTotal"
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
              name="nosisAntiguedadBCRA"
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
              name="nosisPeorSituacion12Meses"
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
              name="nosisCantidadBancos12Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad bancos - Últ. 12 Meses</FormLabel>
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
              name="nosisPerfilCumplimientoDeudor"
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
              name="nosisEsMoroso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Es moroso</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nosisCantidadSinFondosNoPagados6Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Cantidad sin fondos, no pagados - Últ. 6 Meses
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
              name="nosisMontoSinFondosNoPagados6Meses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Monto sin fondos, no pagados - Últ. 6 Meses
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
              name="nosisJuiciosCantidad12Meses"
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
              name="nosisConcursosQuiebrasCantidad12Meses"
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
              name="nosisScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score (0 - 999)</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nosisFacturacionEstimada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facturación estimada</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nosisProveedorEstado"
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
              name="nosisFacturasApocrifas"
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
              name="nosisDeudasFiscales"
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
              name="nosisPedidoQuebrasCantidad12Meses"
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
              name="nosisPeorSituacionCon10Porciento12Mesas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Peor situación (con 10%) - Últ. 12 meses
                  </FormLabel>
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
              name="nosisSectorActividadPrincipalDelEmpleador"
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
              name="nosisSujetoObligado"
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
              name="nosisPersonaExpuestaPoliticamente"
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

            <FormField
              control={form.control}
              name="nosisCantidadHomonimosEnBaseLaFt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Homónimos en base LA/FT según Razón Social o Nombre y
                    apellido.
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
              name="nosisEnlanceHomonimosEnBaseLaFt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enlace homónimos en base LA/FT según Razón Social o Nombre y
                    apellido.
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
              name="nosisPeorSituacion12MesesBcra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peor situación - Últ. 12 Meses BCRA.</FormLabel>
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
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
