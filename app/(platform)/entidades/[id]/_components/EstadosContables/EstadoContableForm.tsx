"use client";

import { z } from "zod";
import numeral from "numeral";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EstadoContable } from "@prisma/client";
import { EstadoContableSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Dialog, DialogFooter, DialogContent } from "@/components/ui/dialog";

import {
  PATRIMONIO_NETO,
  ACTIVO_CORRIENTE,
  PASIVO_CORRIENTE,
  ACTIVO_NO_CORRIENTE,
  PASIVO_NO_CORRIENTE,
  RESULTADO_ORDINARIO,
} from "./clasificacion";
import useTotales from "./useTotales";

import { cn } from "@/lib/utils";

import {
  createEstadoContable,
  updateEstadoContable,
} from "@/actions/estadosContables";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popoverDialog";

interface EstadoContableFormProps {
  isOpen: boolean;
  entidadId: number;
  onClose: () => void;
  estadoContable?: EstadoContable;
  onEstadoContableAdded: () => void;
}

export default function EstadoContableForm({
  isOpen,
  onClose,
  entidadId,
  estadoContable,
  onEstadoContableAdded,
}: EstadoContableFormProps) {
  const form = useForm<z.infer<typeof EstadoContableSchema>>({
    resolver: zodResolver(EstadoContableSchema),
    defaultValues: {
      fechaDesde: estadoContable?.fechaDesde
        ? parse(estadoContable.fechaDesde, "dd/MM/yyyy", new Date())
        : undefined,
      fechaHasta: estadoContable?.fechaHasta
        ? parse(estadoContable.fechaHasta, "dd/MM/yyyy", new Date())
        : undefined,
      cajaBancos: estadoContable?.cajaBancos || 0,
      inversiones: estadoContable?.inversiones || 0,
      cuentasPorCobrarAsociados: estadoContable?.cuentasPorCobrarAsociados || 0,
      cuentasCobrarTerceros: estadoContable?.cuentasCobrarTerceros || 0,
      derechosRecibirServicios: estadoContable?.derechosRecibirServicios || 0,
      otrosCreditos: estadoContable?.otrosCreditos || 0,
      bienesParaConsumo: estadoContable?.bienesParaConsumo || 0,
      otrosActivos: estadoContable?.otrosActivos || 0,
      inversionesNoCorrientes: estadoContable?.inversionesNoCorrientes || 0,
      bienesDeUso: estadoContable?.bienesDeUso || 0,
      activosIntangibles: estadoContable?.activosIntangibles || 0,
      otrosActivosNoCorrientes: estadoContable?.otrosActivosNoCorrientes || 0,
      deudas: estadoContable?.deudas || 0,
      fondosConDestinoEspecifico:
        estadoContable?.fondosConDestinoEspecifico || 0,
      previsiones: estadoContable?.previsiones || 0,
      deudasNoCorrientes: estadoContable?.deudasNoCorrientes || 0,
      fondosConDestinoEspecificoNoCorrientes:
        estadoContable?.fondosConDestinoEspecificoNoCorrientes || 0,
      previsionesNoCorrientes: estadoContable?.previsionesNoCorrientes || 0,
      capital: estadoContable?.capital || 0,
      reservas: estadoContable?.reservas || 0,
      resultadosNoAsignados: estadoContable?.resultadosNoAsignados || 0,
      resultadoDelEjercicio: estadoContable?.resultadoDelEjercicio || 0,
      recursosIngresos: estadoContable?.recursosIngresos || 0,
      gastosOperativos: estadoContable?.gastosOperativos || 0,
      resultadosFinancierosPorTenencia:
        estadoContable?.resultadosFinancierosPorTenencia || 0,
      resultadosExtraordinarios: estadoContable?.resultadosExtraordinarios || 0,
    },
  });

  const {
    getTotalActivo,
    getTotalActivoCorriente,
    getTotalActivoNoCorriente,
    getTotalPasivo,
    getTotalPasivoCorriente,
    getTotalPasivoNoCorriente,
    getTotalPatrimonioNeto,
    getResultado,
  } = useTotales(form);

  const onSubmit = async (values: z.infer<typeof EstadoContableSchema>) => {
    try {
      const eecc = {
        fechaDesde: format(values.fechaDesde, "dd/MM/yyyy"),
        fechaHasta: format(values.fechaHasta, "dd/MM/yyyy"),
        cajaBancos: parseFloat(values.cajaBancos),
        inversiones: parseFloat(values.inversiones),
        cuentasPorCobrarAsociados: parseFloat(values.cuentasPorCobrarAsociados),
        cuentasCobrarTerceros: parseFloat(values.cuentasCobrarTerceros),
        derechosRecibirServicios: parseFloat(values.derechosRecibirServicios),
        otrosCreditos: parseFloat(values.otrosCreditos),
        bienesParaConsumo: parseFloat(values.bienesParaConsumo),
        otrosActivos: parseFloat(values.otrosActivos),
        inversionesNoCorrientes: parseFloat(values.inversionesNoCorrientes),
        bienesDeUso: parseFloat(values.bienesDeUso),
        activosIntangibles: parseFloat(values.activosIntangibles),
        otrosActivosNoCorrientes: parseFloat(values.otrosActivosNoCorrientes),
        deudas: parseFloat(values.deudas),
        fondosConDestinoEspecifico: parseFloat(
          values.fondosConDestinoEspecifico
        ),
        previsiones: parseFloat(values.previsiones),
        deudasNoCorrientes: parseFloat(values.deudasNoCorrientes),
        fondosConDestinoEspecificoNoCorrientes: parseFloat(
          values.fondosConDestinoEspecificoNoCorrientes
        ),
        previsionesNoCorrientes: parseFloat(values.previsionesNoCorrientes),
        capital: parseFloat(values.capital),
        reservas: parseFloat(values.reservas),
        resultadosNoAsignados: parseFloat(values.resultadosNoAsignados),
        resultadoDelEjercicio: parseFloat(values.resultadoDelEjercicio),
        recursosIngresos: parseFloat(values.recursosIngresos),
        gastosOperativos: parseFloat(values.gastosOperativos),
        resultadosFinancierosPorTenencia: parseFloat(
          values.resultadosFinancierosPorTenencia
        ),
        resultadosExtraordinarios: parseFloat(values.resultadosExtraordinarios),
      };

      if (estadoContable) {
        await updateEstadoContable(estadoContable.id, eecc);
      } else {
        await createEstadoContable(entidadId, eecc);
      }

      onEstadoContableAdded();
    } catch (err) {
      console.log("err", err);
    }
  };

  const isBalanceOk = (): boolean => {
    return getTotalActivo() === getTotalPasivo();
  };

  const fechaDesde = form.watch("fechaDesde");
  const fechaHasta = form.watch("fechaHasta");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1340px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="flex gap-9 items-center mb-1">
                <h3 className="text-xl font-semibold text-primary">
                  Estado de Situacion Patrimonial
                </h3>
                <FormField
                  control={form.control}
                  name="fechaDesde"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Periodo Desde</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          style={{ zIndex: 9999 }}
                          align="start"
                        >
                          <Calendar
                            locale={es}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fechaHasta"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Periodo Hasta</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          style={{ zIndex: 9999 }}
                          align="start"
                        >
                          <Calendar
                            locale={es}
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      ACTIVO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500">
                      $
                    </h4>
                  </div>
                  {ACTIVO_CORRIENTE.map((activo) => (
                    <div
                      key={activo.id}
                      className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                    >
                      <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                        {activo.label}
                      </h4>
                      <FormField
                        control={form.control}
                        name={activo.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                      TOTAL ACTIVO CORRIENTE
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-[#070F3F] h-5">
                      {numeral(getTotalActivoCorriente()).format("$0,0.00")}
                    </h4>
                  </div>

                  {ACTIVO_NO_CORRIENTE.map((activo) => (
                    <div
                      key={activo.id}
                      className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                    >
                      <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                        {activo.label}
                      </h4>
                      <FormField
                        control={form.control}
                        name={activo.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                      TOTAL ACTIVO NO CORRIENTE
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-[#070F3F] h-5">
                      {numeral(getTotalActivoNoCorriente()).format("$0,0.00")}
                    </h4>
                  </div>

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      TOTAL DEL ACTIVO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500 h-5">
                      {numeral(getTotalActivo()).format("$0,0.00")}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      PASIVO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500">
                      $
                    </h4>
                  </div>

                  {PASIVO_CORRIENTE.map((pasivo) => (
                    <div
                      key={pasivo.id}
                      className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                    >
                      <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                        {pasivo.label}
                      </h4>
                      <FormField
                        control={form.control}
                        name={pasivo.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                      TOTAL PASIVO CORRIENTE
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-[#070F3F] h-5">
                      {numeral(getTotalPasivoCorriente()).format("$0,0.00")}
                    </h4>
                  </div>

                  {PASIVO_NO_CORRIENTE.map((pasivo) => (
                    <div
                      key={pasivo.id}
                      className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                    >
                      <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                        {pasivo.label}
                      </h4>
                      <FormField
                        control={form.control}
                        name={pasivo.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                      TOTAL PASIVO NO CORRIENTE
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-[#070F3F] h-5">
                      {numeral(getTotalPasivoNoCorriente()).format("$0,0.00")}
                    </h4>
                  </div>

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      PATRIMONIO NETO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500 h-5"></h4>
                  </div>

                  {PATRIMONIO_NETO.map((patrimonioNeto) => (
                    <div
                      key={patrimonioNeto.id}
                      className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                    >
                      <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                        {patrimonioNeto.label}
                      </h4>
                      <FormField
                        control={form.control}
                        name={patrimonioNeto.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <div
                    key={"resultadoDelEjercicio"}
                    className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                  >
                    <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                      Resultado del Ejercicio
                    </h4>
                    <FormField
                      control={form.control}
                      name={"resultadoDelEjercicio"}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              disabled
                              type="number"
                              value={getResultado()}
                              className="h-5 text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                      TOTAL DEL PATRIMONIO NETO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-[#070F3F] h-5">
                      {numeral(getTotalPatrimonioNeto()).format("$0,0.00")}
                    </h4>
                  </div>

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      TOTAL DEL PASIVO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500 h-5">
                      {numeral(getTotalPasivo()).format("$0,0.00")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mt-2 mb-2 text-xl font-semibold text-primary">
                Estado de Resultados
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-[#070F3F]">
                      RESULTADOS ORDINARIOS
                    </h4>
                    <h4 className="text-center font-semibold text-[#070F3F]">
                      $
                    </h4>
                  </div>

                  {RESULTADO_ORDINARIO.map((resultado) => (
                    <div
                      key={resultado.id}
                      className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                    >
                      <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                        {resultado.label}
                      </h4>
                      <FormField
                        control={form.control}
                        name={resultado.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                      RESULTADOS EXTRAORDINARIOS
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-[#070F3F]">
                      <FormField
                        control={form.control}
                        name={"resultadosExtraordinarios"}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </h4>
                  </div>

                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      RESULTADO DEL EJERCICIO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500 h-5">
                      {numeral(getResultado()).format("$0,0.00")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant={"secondary"} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant={"default"}
                disabled={!fechaDesde || !fechaHasta || !isBalanceOk()}
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
