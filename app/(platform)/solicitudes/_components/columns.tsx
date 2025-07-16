"use client";

import { differenceInDays } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronRightIcon, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EntidadWithSolicitudes } from "@/types";
import Tareas from "../../entidades/[id]/_components/Tareas";
import { Button } from "@/components/ui/button";

const PLAZO_RESPUESTA = 30;

export const columns: ColumnDef<EntidadWithSolicitudes>[] = [
  {
    id: "codigoEntidad",
    header: "Codigo",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? (
              <ChevronDownIcon size={18} />
            ) : (
              <ChevronRightIcon size={18} />
            )}
          </button>
          {row.original.codigoEntidad}
        </div>
      );
    },
  },
  {
    size: 400,
    id: "nombreCompleto",
    filterFn: (row, columnId, filterValue) => {
      const codigo = row.original.codigoEntidad;
      const razonSocial =
        (row.original.nombreCompleto && row.original.nombreCompleto.trim()) ||
        (row.original.razonSocial && row.original.razonSocial.trim());

      return (
        !!razonSocial?.toLowerCase().includes(filterValue.toLowerCase()) ||
        codigo.includes(filterValue)
      );
    },
    header: "Nombre y Apellido / Razon Social",
    cell: ({ row }) => {
      const formulario = row.original;
      const razonSocial =
        (row.original.nombreCompleto && row.original.nombreCompleto.trim()) ||
        (row.original.razonSocial && row.original.razonSocial.trim());

      return (
        <div className="flex items-center gap-4 justify-between">
          {razonSocial?.toUpperCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    filterFn: (row, columnId, filterValue) => {
      return filterValue
        .map((value: string) => value.toLowerCase())
        .includes(row.original.tipoRelacion?.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="">{row.original.tipoRelacion?.replace("_", " ")}</div>
    ),
  },
  {
    accessorKey: "respuestaFueraDePlazo",
    header: "Fuera de Plazo",
    size: 100,
    filterFn: (row, columnId, filterValue) => {
      const { solicitudes } = row.original;
      const ultimaSolicitud = solicitudes[solicitudes.length - 1];
      const respuestaFueraDePlazo =
        differenceInDays(new Date(), ultimaSolicitud.fecha) > PLAZO_RESPUESTA
          ? "Si"
          : "No";

      return filterValue
        .map((value: string) => value.toLowerCase())
        .includes(respuestaFueraDePlazo.toLowerCase());
    },
    cell: ({ row }) => {
      const { solicitudes } = row.original;
      const ultimaSolicitud = solicitudes[solicitudes.length - 1];
      const respuestaFueraDePlazo =
        differenceInDays(new Date(), ultimaSolicitud.fecha) > PLAZO_RESPUESTA
          ? "Si"
          : "No";

      return (
        <div className="flex items-center gap-4 text-primary justify-evenly">
          <Badge
            className="h-6 w-6 rounded-full px-1 font-semibold text-[10px] tabular-nums flex items-center justify-center"
            variant={respuestaFueraDePlazo === "Si" ? "destructive" : "success"}
          >
            {respuestaFueraDePlazo}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "acciones",
    header: "",
    size: 10,
    cell: ({ row }) => {
      const { id, codigoEntidad } = row.original;
      return (
        <div className="flex items-center gap-4 text-primary justify-evenly">
          <Tareas
            align="center"
            solicitud={false}
            solicitudesPendientes
            codigoEntidad={codigoEntidad}
          >
            <Button variant="ghost" size={"icon"} className="h-5 w-5 p-0">
              <span className="sr-only">Abrir</span>
              <MoreVertical />
            </Button>
          </Tareas>
        </div>
      );
    },
  },
];
