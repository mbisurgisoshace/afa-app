"use client";

import * as XLSX from "xlsx";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChangeEvent, useRef, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { updateTerroristas } from "@/actions/terroristas";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  CuitApocrifoData,
  updateCuitsApocrifos,
} from "@/actions/cuitsApocrifos";

interface TablasStatusProps {
  statuses: any[];
}

export const TablasStatus = ({ statuses }: TablasStatusProps) => {
  const [isPending, startTransition] = useTransition();
  const cuitApocrifosFileRef = useRef<HTMLInputElement>(null);

  const onUpdateListadoTerroristas = async () => {
    startTransition(async () => {
      await updateTerroristas();
      toast.success("Listado de Terroristas actualizado correctamente");
    });
  };

  const onUpdateCuitApocrifos = async (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const file = e.target.files?.[0];
      const reader = new FileReader();

      if (file) {
        reader.onload = async (event) => {
          const binaryString = event.target?.result;
          const workbook = XLSX.read(binaryString, { type: "binary" });
          const sheetName = workbook.SheetNames[2];
          const worksheet = workbook.Sheets[sheetName];
          const data: CuitApocrifoData[] = XLSX.utils.sheet_to_json(worksheet);
          await updateCuitsApocrifos(data);

          toast.success("Listado de CUITs Apocrifos actualizado correctamente");
        };

        reader.readAsArrayBuffer(file);
      }
    });
  };

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

      <DottedSeparator className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F]">CUITs Apocrifos</h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
            statuses.find((status) => status.tabla === "cuit-apocrifos")
              ?.updatedAt
          )}`}</span>
        </div>
        <input
          hidden
          type="file"
          accept=".xlsx, .xls"
          ref={cuitApocrifosFileRef}
          onChange={onUpdateCuitApocrifos}
        />
        <Button
          onClick={() => {
            cuitApocrifosFileRef.current?.click();
          }}
          size={"xs"}
          disabled={isPending}
        >
          Importar
        </Button>
      </div>
      {/* <div className="flex flex-row items-center justify-between">
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
