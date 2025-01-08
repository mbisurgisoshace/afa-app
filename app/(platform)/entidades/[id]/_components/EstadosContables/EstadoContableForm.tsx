"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface EstadoContableFormProps {
  isOpen: boolean;
  onClose: () => void;
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
}: EstadoContableFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
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
                  <Input />
                </div>
              ))}

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                  TOTAL ACTIVO CORRIENTE
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input disabled />
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
                  <Input />
                </div>
              ))}

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                  TOTAL ACTIVO NO CORRIENTE
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input disabled />
                </h4>
              </div>

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                  TOTAL DEL ACTIVO
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input disabled />
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
                  <Input />
                </div>
              ))}

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                  TOTAL PASIVO CORRIENTE
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input disabled />
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
                  <Input />
                </div>
              ))}

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                  TOTAL PASIVO NO CORRIENTE
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input disabled />
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
                  <Input />
                </div>
              ))}

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                  TOTAL DEL PATRIMONIO NETO
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input disabled />
                </h4>
              </div>

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                  TOTAL DEL PASIVO
                </h4>
                <h4 className="text-center text-xl font-semibold text-gray-500">
                  <Input disabled />
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
                  <Input />
                </div>
              ))}

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="col-span-3 text-xl font-semibold text-[#070F3F]">
                  RESULTADOS EXTRAORDINARIOS
                </h4>
                <h4 className="text-center text-xl font-semibold text-[#070F3F]">
                  <Input />
                </h4>
              </div>

              <div className="w-full grid grid-cols-4 border-b py-2 items-center">
                <h4 className="text-center col-span-3 text-xl font-semibold text-gray-500">
                  RESULTADO DEL EJERCICIO
                </h4>
                <h4 className="text-center text-xl font-semibold text-gray-500">
                  <Input disabled />
                </h4>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant={"default"} onClick={onClose}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
