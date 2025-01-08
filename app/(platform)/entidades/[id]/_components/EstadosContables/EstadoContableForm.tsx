"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EstadoContable } from "@prisma/client";
import { EstadoContableSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Dialog, DialogFooter, DialogContent } from "@/components/ui/dialog";

interface EstadoContableFormProps {
  isOpen: boolean;
  onClose: () => void;
  estadoContable?: EstadoContable;
}

const ACTIVO_CORRIENTE = [
  {
    id: "cajaBancos",
    label: "Caja y Bancos",
  },
  {
    id: "inversiones",
    label: "Inversiones",
  },
  {
    id: "cuentasPorCobrarAsociados",
    label: "Cuentas por Cobrar Asociados",
  },
  {
    id: "cuentasCobrarTerceros",
    label: "Cuentas a Cobrar a Terceros",
  },
  {
    id: "derechosRecibirServicios",
    label: "Derechos a Recibir Servicios",
  },
  {
    id: "otrosCreditos",
    label: "Otros Creditos",
  },
  {
    id: "bienesParaConsumo",
    label: "Bienes para Consumo",
  },
  {
    id: "otrosActivos",
    label: "Otros Activos",
  },
];

const ACTIVO_NO_CORRIENTE = [
  {
    id: "inversionesNoCorrientes",
    label: "Inversiones No Corrientes",
  },
  {
    id: "bienesDeUso",
    label: "Bienes de Uso",
  },
  {
    id: "activosIntangibles",
    label: "Activos Intangibles",
  },
  {
    id: "otrosActivosNoCorrientes",
    label: "Otros Activos No Corrientes",
  },
];

const PASIVO_CORRIENTE = [
  {
    id: "deudas",
    label: "Deudas",
  },
  {
    id: "fondosConDestinoEspecifico",
    label: "Fondos con Destino Especifico",
  },
  {
    id: "previsiones",
    label: "Previsiones",
  },
];

const PASIVO_NO_CORRIENTE = [
  {
    id: "deudasNoCorrientes",
    label: "Deudas No Corrientes",
  },
  {
    id: "fondosConDestinoEspecificoNoCorrientes",
    label: "Fondos con Destino Especifico No Ctes",
  },
  {
    id: "previsionesNoCorrientes",
    label: "Previsiones No Corrientes",
  },
];

const PATRIMONIO_NETO = [
  { id: "capital", label: "Capital" },
  { id: "reservas", label: "Reservas" },
  { id: "resultadosNoAsignados", label: "Resultados No Asignados" },
  { id: "resultadoDelEjercicio", label: "Resultado del Ejercicio" },
];

const RESULTADO_ORDINARIO = [
  { id: "recursosIngresos", label: "Recursos e Ingresos" },
  { id: "gastosOperativos", label: "Gastos Operativos" },
  {
    id: "resultadosFinancierosPorTenencia",
    label: "Resultados Financieros y Por Tenencia",
  },
];

export default function EstadoContableForm({
  isOpen,
  onClose,
  estadoContable,
}: EstadoContableFormProps) {
  const form = useForm<z.infer<typeof EstadoContableSchema>>({
    resolver: zodResolver(EstadoContableSchema),
    defaultValues: {
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

  const getTotalActivoCorriente = () => {
    const activoCorriente = ACTIVO_CORRIENTE.reduce(
      (acc, activo) => acc + parseFloat(form.watch(activo.id as any)),
      0
    );

    return activoCorriente;
  };

  const getTotalActivoNoCorriente = () => {
    const activoNoCorriente = ACTIVO_NO_CORRIENTE.reduce(
      (acc, activo) => acc + parseFloat(form.watch(activo.id as any)),
      0
    );

    return activoNoCorriente;
  };

  const getTotalActivo = () => {
    return getTotalActivoCorriente() + getTotalActivoNoCorriente();
  };

  const getTotalPasivoCorriente = () => {
    const pasivoCorriente = PASIVO_CORRIENTE.reduce(
      (acc, pasivo) => acc + parseFloat(form.watch(pasivo.id as any)),
      0
    );

    return pasivoCorriente;
  };

  const getTotalPasivoNoCorriente = () => {
    const pasivoNoCorriente = PASIVO_NO_CORRIENTE.reduce(
      (acc, pasivo) => acc + parseFloat(form.watch(pasivo.id as any)),
      0
    );

    return pasivoNoCorriente;
  };

  const getTotalPatrimonioNeto = () => {
    const patrimonioNeto = PATRIMONIO_NETO.reduce(
      (acc, patrimonio) => acc + parseFloat(form.watch(patrimonio.id as any)),
      0
    );

    return patrimonioNeto;
  };

  const getTotalPasivo = () => {
    return (
      getTotalPasivoCorriente() +
      getTotalPasivoNoCorriente() +
      getTotalPatrimonioNeto()
    );
  };

  const getTotalResultadosOrdinarios = () => {
    const resultadosOrdinarios = RESULTADO_ORDINARIO.reduce(
      (acc, resultado) => acc + parseFloat(form.watch(resultado.id as any)),
      0
    );

    return resultadosOrdinarios;
  };

  const getResultado = () => {
    return (
      getTotalResultadosOrdinarios() +
      parseFloat(form.watch("resultadosExtraordinarios"))
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <Form {...form}>
          <div>
            <h3 className="mb-4 text-3xl font-semibold text-primary">
              Estado de Situacion Patrimonial
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                    ACTIVO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-gray-500">
                    $
                  </h4>
                </div>
                {ACTIVO_CORRIENTE.map((activo) => (
                  <div
                    key={activo.id}
                    className="w-full grid grid-cols-4 border-b py-2 items-center"
                  >
                    <h4 className="col-span-3 text-lg font-normal text-[#070F3F]">
                      {activo.label}
                    </h4>
                    <FormField
                      control={form.control}
                      name={activo.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    TOTAL ACTIVO CORRIENTE
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <Input disabled value={getTotalActivoCorriente()} />
                  </h4>
                </div>

                {ACTIVO_NO_CORRIENTE.map((activo) => (
                  <div
                    key={activo.id}
                    className="w-full grid grid-cols-4 border-b py-2 items-center"
                  >
                    <h4 className="col-span-3 text-lg font-normal text-[#070F3F]">
                      {activo.label}
                    </h4>
                    <FormField
                      control={form.control}
                      name={activo.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    TOTAL ACTIVO NO CORRIENTE
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <Input disabled value={getTotalActivoNoCorriente()} />
                  </h4>
                </div>

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                    TOTAL DEL ACTIVO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <Input disabled value={getTotalActivo()} />
                  </h4>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                    PASIVO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-gray-500">
                    $
                  </h4>
                </div>

                {PASIVO_CORRIENTE.map((pasivo) => (
                  <div
                    key={pasivo.id}
                    className="w-full grid grid-cols-4 border-b py-2 items-center"
                  >
                    <h4 className="col-span-3 text-lg font-normal text-[#070F3F]">
                      {pasivo.label}
                    </h4>
                    <FormField
                      control={form.control}
                      name={pasivo.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    TOTAL PASIVO CORRIENTE
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <Input disabled value={getTotalPasivoCorriente()} />
                  </h4>
                </div>

                {PASIVO_NO_CORRIENTE.map((pasivo) => (
                  <div
                    key={pasivo.id}
                    className="w-full grid grid-cols-4 border-b py-2 items-center"
                  >
                    <h4 className="col-span-3 text-lg font-normal text-[#070F3F]">
                      {pasivo.label}
                    </h4>
                    <FormField
                      control={form.control}
                      name={pasivo.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    TOTAL PASIVO NO CORRIENTE
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <Input disabled value={getTotalPasivoNoCorriente()} />
                  </h4>
                </div>

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                    PATRIMONIO NETO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-gray-500">
                    <Input className="opacity-0" />
                  </h4>
                </div>

                {PATRIMONIO_NETO.map((patrimonioNeto) => (
                  <div
                    key={patrimonioNeto.id}
                    className="w-full grid grid-cols-4 border-b py-2 items-center"
                  >
                    <h4 className="col-span-3 text-lg font-normal text-[#070F3F]">
                      {patrimonioNeto.label}
                    </h4>
                    <FormField
                      control={form.control}
                      name={patrimonioNeto.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    TOTAL DEL PATRIMONIO NETO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <Input disabled value={getTotalPatrimonioNeto()} />
                  </h4>
                </div>

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                    TOTAL DEL PASIVO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-gray-500">
                    <Input disabled value={getTotalPasivo()} />
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mt-4 mb-4 text-3xl font-semibold text-primary">
              Estado de Resultados
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    RESULTADOS ORDINARIOS
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    $
                  </h4>
                </div>

                {RESULTADO_ORDINARIO.map((resultado) => (
                  <div
                    key={resultado.id}
                    className="w-full grid grid-cols-4 border-b py-2 items-center"
                  >
                    <h4 className="col-span-3 text-lg font-normal text-[#070F3F]">
                      {resultado.label}
                    </h4>
                    <FormField
                      control={form.control}
                      name={resultado.id as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                    RESULTADOS EXTRAORDINARIOS
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                    <FormField
                      control={form.control}
                      name={"resultadosExtraordinarios"}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </h4>
                </div>

                <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                  <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                    RESULTADO DEL EJERCICIO
                  </h4>
                  <h4 className="text-center text-xl font-semibold text-gray-500">
                    <Input disabled value={getResultado()} />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Form>

        <DialogFooter>
          <Button variant={"default"} onClick={onClose}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
