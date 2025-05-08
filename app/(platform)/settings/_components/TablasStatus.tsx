"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import {
  CuitApocrifoData,
  deleteCuitsApocrifos,
  updateCuitsApocrifos,
} from "@/actions/cuitsApocrifos";
import { Button } from "@/components/ui/button";
import { blobToData, chunkArray } from "@/lib/utils";
import { updateTablaStatus } from "@/actions/settings";
import { updateTerroristas } from "@/actions/terroristas";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  PaisNoCooperanteData,
  updatePaisesNoCooperantes,
} from "@/actions/paisesNoCooperantes";
import {
  SujetoSancionadoData,
  updateSujetosSancionados,
} from "@/actions/sujetosSancionados";

interface TablasStatusProps {
  statuses: any[];
}

export const TablasStatus = ({ statuses }: TablasStatusProps) => {
  const [isPending, startTransition] = useTransition();
  const cuitApocrifosFileRef = useRef<HTMLInputElement>(null);
  const paisesNoCooperantesFileRef = useRef<HTMLInputElement>(null);
  const sujetosObligadosSancionadosFileRef = useRef<HTMLInputElement>(null);
  const [cuitsApocrifosProcesados, setCuitsApocrifosProcesados] = useState("");

  const onUpdateListadoTerroristas = async () => {
    startTransition(async () => {
      await updateTerroristas();
      toast.success("Listado de Terroristas actualizado correctamente");
    });
  };

  const onUpdatePaisesNoCooperantes = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    startTransition(async () => {
      const file = e.target.files?.[0];

      if (file) {
        const result = await blobToData(file);
        const binaryString = result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[2];
        const worksheet = workbook.Sheets[sheetName];
        const data: PaisNoCooperanteData[] =
          XLSX.utils.sheet_to_json(worksheet);
        await updatePaisesNoCooperantes(data);
        toast.success(
          "Listado de Paises No Cooperantes actualizado correctamente"
        );
      }
    });
  };

  const onUpdateCuitApocrifos = async (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const file = e.target.files?.[0];

      if (file) {
        const result = await blobToData(file);
        const binaryString = result;

        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[2];
        const worksheet = workbook.Sheets[sheetName];
        const data: CuitApocrifoData[] = XLSX.utils.sheet_to_json(worksheet);
        const dataChunks = chunkArray(data, 1000);

        await deleteCuitsApocrifos();
        let processed = 0;
        for (const chunk of dataChunks) {
          setCuitsApocrifosProcesados(`${processed} de ${data.length}`);
          await updateCuitsApocrifos(chunk);
          processed += chunk.length;
        }

        setCuitsApocrifosProcesados("");
        await updateTablaStatus("cuit-apocrifos");
        toast.success("Listado de CUITs Apocrifos actualizado correctamente");
      }
    });
  };

  const onUpdateSujetosObligadosSancionados = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    startTransition(async () => {
      const file = e.target.files?.[0];

      if (file) {
        const result = await blobToData(file);
        const binaryString = result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[2];
        const worksheet = workbook.Sheets[sheetName];
        const data: SujetoSancionadoData[] =
          XLSX.utils.sheet_to_json(worksheet);
        await updateSujetosSancionados(data);
        toast.success(
          "Listado de Sujetos Obligados Sancionados actualizado correctamente"
        );
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
          <h4 className="font-semibold text-[#070F3F]">
            Listado de Paises No Cooperantes
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
            statuses.find((status) => status.tabla === "paises-no-cooperantes")
              ?.updatedAt
          )}`}</span>
        </div>
        <input
          hidden
          type="file"
          accept=".xlsx, .xls"
          ref={paisesNoCooperantesFileRef}
          onChange={onUpdatePaisesNoCooperantes}
        />
        <Button
          onClick={() => {
            paisesNoCooperantesFileRef.current?.click();
          }}
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
          {`${
            cuitsApocrifosProcesados
              ? `Importar (${cuitsApocrifosProcesados})`
              : "Importar"
          }`}
        </Button>
      </div>

      <DottedSeparator className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F]">
            Sujetos Obligados Sancionados
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
            statuses.find(
              (status) => status.tabla === "sujetos-obligados-sancionados"
            )?.updatedAt
          )}`}</span>
        </div>
        <input
          hidden
          type="file"
          accept=".xlsx, .xls"
          ref={sujetosObligadosSancionadosFileRef}
          onChange={onUpdateSujetosObligadosSancionados}
        />
        <Button
          onClick={() => {
            sujetosObligadosSancionadosFileRef.current?.click();
          }}
          size={"xs"}
          disabled={isPending}
        >
          Importar
        </Button>
      </div>
    </>
  );
};
