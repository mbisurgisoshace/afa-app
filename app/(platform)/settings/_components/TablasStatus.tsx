"use client";

import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { updateTerroristas } from "@/actions/terroristas";
import { DottedSeparator } from "@/components/DottedSeparator";

interface TablasStatusProps {
  statuses: any[];
}

export const TablasStatus = ({ statuses }: TablasStatusProps) => {
  const [isPending, startTransition] = useTransition();

  const onUpdateListadoTerroristas = async () => {
    startTransition(async () => {
      await updateTerroristas();
      toast.success("Listado de Terroristas actualizado correctamente");
    });
  };

  console.log("statuses", statuses);

  const formatFecha = (fecha: any) => {
    if (!fecha) return "";

    return format(fecha, "PPP", { locale: es });
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F]">
            Listado de Vinculaciones Terroristas
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
            statuses.find((status) => status.tabla === "listado-terroristas")
              ?.updatedAt
          )}`}</span>
        </div>
        <Button
          onClick={onUpdateListadoTerroristas}
          size={"xs"}
          disabled={isPending}
        >
          Importar
        </Button>
      </div>

      {/* <DottedSeparator className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F]">
            Listado de Paises No Cooperantes
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
            statuses.find((status) => status.tabla === "paises-no-cooperantes")
              ?.updatedAt
          )}`}</span>
        </div>
        <Button size={"xs"} disabled={isPending}>
          Importar
        </Button>
      </div> */}
    </>
  );
};
