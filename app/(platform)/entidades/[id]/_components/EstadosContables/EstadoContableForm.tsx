"use client";

import { z } from "zod";
import numeral from "numeral";
import { es } from "date-fns/locale";
import { format, parse } from "date-fns";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EstadoContable } from "@prisma/client";
import { EstadoContableSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

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
import { DialogTitle } from "@radix-ui/react-dialog";
import MoneyInput from "@/components/MoneyInput";

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
      cuentasCobrar: estadoContable?.cuentasCobrar || 0,
      bienesDeCambio: estadoContable?.bienesDeCambio || 0,
      otrosActivos: estadoContable?.otrosActivos || 0,
      inversionesNoCorrientes: estadoContable?.inversionesNoCorrientes || 0,
      bienesDeUso: estadoContable?.bienesDeUso || 0,
      activosIntangibles: estadoContable?.activosIntangibles || 0,
      otrosActivosNoCorrientes: estadoContable?.otrosActivosNoCorrientes || 0,
      deudas: estadoContable?.deudas || 0,
      remuneracionesCargasSociales:
        estadoContable?.remuneracionesCargasSociales || 0,
      cargasFiscales: estadoContable?.cargasFiscales || 0,
      deudasBancariasFinancieras:
        estadoContable?.deudasBancariasFinancieras || 0,
      otrasDeudas: estadoContable?.otrasDeudas || 0,
      previsiones: estadoContable?.previsiones || 0,
      deudasNoCorrientes: estadoContable?.deudasNoCorrientes || 0,
      otrasDeudasNoCorrientes: estadoContable?.otrasDeudasNoCorrientes || 0,
      deudasBancariasFinancierasNoCorrientes:
        estadoContable?.deudasBancariasFinancierasNoCorrientes || 0,
      previsionesNoCorrientes: estadoContable?.previsionesNoCorrientes || 0,
      capital: estadoContable?.capital || 0,
      reservas: estadoContable?.reservas || 0,
      resultadosNoAsignados: estadoContable?.resultadosNoAsignados || 0,
      resultadoDelEjercicio: estadoContable?.resultadoDelEjercicio || 0,
      recursosIngresos: estadoContable?.recursosIngresos || 0,
      costoDeVenta: estadoContable?.costoDeVenta || 0,
      gastosOperativos: estadoContable?.gastosOperativos || 0,
      resultadosFinancierosPorTenencia:
        estadoContable?.resultadosFinancierosPorTenencia || 0,
      otrosIngresosEgresos: estadoContable?.otrosIngresosEgresos || 0,
      area: estadoContable?.area || 0,
      resultadosExtraordinarios: estadoContable?.resultadosExtraordinarios || 0,
      impuestoGanancias: estadoContable?.impuestoGanancias || 0,
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
    getTotalResultadosOrdinarios,
  } = useTotales(form);

  const onSubmit = async (values: z.infer<typeof EstadoContableSchema>) => {
    try {
      const eecc = {
        fechaDesde: format(values.fechaDesde, "dd/MM/yyyy"),
        fechaHasta: format(values.fechaHasta, "dd/MM/yyyy"),
        cajaBancos: parseFloat(values.cajaBancos),
        inversiones: parseFloat(values.inversiones),
        cuentasCobrar: parseFloat(values.cuentasCobrar),
        bienesDeCambio: parseFloat(values.bienesDeCambio),
        otrosActivos: parseFloat(values.otrosActivos),
        inversionesNoCorrientes: parseFloat(values.inversionesNoCorrientes),
        bienesDeUso: parseFloat(values.bienesDeUso),
        activosIntangibles: parseFloat(values.activosIntangibles),
        otrosActivosNoCorrientes: parseFloat(values.otrosActivosNoCorrientes),
        deudas: parseFloat(values.deudas),
        remuneracionesCargasSociales: parseFloat(
          values.remuneracionesCargasSociales
        ),
        cargasFiscales: parseFloat(values.cargasFiscales),
        deudasBancariasFinancieras: parseFloat(
          values.deudasBancariasFinancieras
        ),
        otrasDeudas: parseFloat(values.otrasDeudas),
        previsiones: parseFloat(values.previsiones),
        deudasNoCorrientes: parseFloat(values.deudasNoCorrientes),
        otrasDeudasNoCorrientes: parseFloat(values.otrasDeudasNoCorrientes),
        deudasBancariasFinancierasNoCorrientes: parseFloat(
          values.deudasBancariasFinancierasNoCorrientes
        ),
        previsionesNoCorrientes: parseFloat(values.previsionesNoCorrientes),
        capital: parseFloat(values.capital),
        reservas: parseFloat(values.reservas),
        resultadosNoAsignados: parseFloat(values.resultadosNoAsignados),
        resultadoDelEjercicio: getResultado(),
        recursosIngresos: parseFloat(values.recursosIngresos),
        costoDeVenta: parseFloat(values.costoDeVenta),
        gastosOperativos: parseFloat(values.gastosOperativos),
        resultadosFinancierosPorTenencia: parseFloat(
          values.resultadosFinancierosPorTenencia
        ),
        otrosIngresosEgresos: parseFloat(values.otrosIngresosEgresos),
        area: parseFloat(values.area),
        resultadosExtraordinarios: parseFloat(values.resultadosExtraordinarios),
        impuestoGanancias: parseFloat(values.impuestoGanancias),
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
    return (
      parseFloat(getTotalActivo().toFixed(2)) ===
      parseFloat(getTotalPasivo().toFixed(2))
    );
  };

  const fechaDesde = form.watch("fechaDesde");
  const fechaHasta = form.watch("fechaHasta");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[1340px]">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogTitle />
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
                            captionLayout="dropdown"
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
                            captionLayout="dropdown"
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
                      En miles de $
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
                      {/* <FormField
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
                      /> */}
                      <MoneyInput form={form} name={activo.id} />
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
                      {/* <FormField
                        control={form.control}
                        name={activo.id as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...registerWithMask(
                                  activo.id as any,
                                  "currency",
                                  {
                                    locale: "es-AR",
                                    prefix: "$",
                                    decimalScale: 2,
                                    fixedDecimalScale: true,
                                  }
                                )}
                                type="number"
                                className="h-5 text-sm"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      /> */}
                      <MoneyInput form={form} name={activo.id} />
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

                  <div className="w-full mt-6">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex flex-col">
                        {/* <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                          <h4 className="col-span-3 font-semibold text-[#070F3F]">
                            RESULTADOS ORDINARIOS
                          </h4>
                          <h4 className="text-center font-semibold text-[#070F3F]">
                            $
                          </h4>
                        </div> */}

                        {RESULTADO_ORDINARIO.map((resultado) => (
                          <div
                            key={resultado.id}
                            className="w-full grid grid-cols-4 border-b py-0.5 items-center"
                          >
                            <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                              {resultado.label}
                            </h4>
                            {/* <FormField
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
                            /> */}
                            <MoneyInput form={form} name={resultado.id} />
                          </div>
                        ))}

                        <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                          <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                            RESULTADO ORDINARIO
                          </h4>
                          <h4 className="text-center font-semibold text-sm text-[#070F3F] h-5">
                            {numeral(getTotalResultadosOrdinarios()).format(
                              "$0,0.00"
                            )}
                          </h4>
                        </div>

                        <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                          <h4 className="col-span-3 font-semibold text-sm text-[#070F3F]">
                            RESULTADOS EXTRAORDINARIOS
                          </h4>
                          <h4 className="text-center font-semibold text-sm text-[#070F3F]">
                            {/* <FormField
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
                            /> */}
                            <MoneyInput
                              form={form}
                              name={"resultadosExtraordinarios"}
                            />
                          </h4>
                        </div>

                        <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                          <h4 className="col-span-3 font-normal text-sm text-[#070F3F]">
                            Impuesto a las Ganancias
                          </h4>
                          <h4 className="text-center font-normal text-sm text-[#070F3F]">
                            {/* <FormField
                              control={form.control}
                              name={"impuestoGanancias"}
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
                            /> */}
                            <MoneyInput
                              form={form}
                              name={"impuestoGanancias"}
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
                </div>

                <div className="flex flex-col">
                  <div className="w-full grid grid-cols-4 border-b py-0.5 items-center">
                    <h4 className="text-center col-span-3 font-semibold text-sm text-gray-500">
                      PASIVO
                    </h4>
                    <h4 className="text-center font-semibold text-sm text-gray-500">
                      En miles de $
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
                      {/* <FormField
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
                      /> */}
                      <MoneyInput form={form} name={pasivo.id} />
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
                      {/* <FormField
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
                      /> */}
                      <MoneyInput form={form} name={pasivo.id} />
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
                      {/* <FormField
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
                      /> */}
                      <MoneyInput form={form} name={patrimonioNeto.id} />
                    </div>
                  ))}

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

                  <DialogFooter className="mt-auto">
                    <DialogClose asChild>
                      <Button variant={"secondary"} onClick={onClose}>
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant={"default"}
                      disabled={!fechaDesde || !fechaHasta || !isBalanceOk()}
                    >
                      Guardar
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
