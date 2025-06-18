"use client";

import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Entidad, PedidoEntidad, Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    id: "codigoEntidad",
    header: "Codigo",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 justify-between">
          {row.original.entidad.codigoEntidad}
        </div>
      );
    },
  },
  {
    size: 400,
    id: "nombreCompleto",
    filterFn: (row, columnId, filterValue) => {
      const codigo = row.original.entidad.codigoEntidad;
      const razonSocial =
        (row.original.entidad.nombreCompleto &&
          row.original.entidad.nombreCompleto.trim()) ||
        (row.original.entidad.razonSocial &&
          row.original.entidad.razonSocial.trim());

      return (
        !!razonSocial?.toLowerCase().includes(filterValue.toLowerCase()) ||
        codigo.includes(filterValue)
      );
    },
    header: "Nombre y Apellido / Razon Social",
    cell: ({ row }) => {
      const formulario = row.original;
      const razonSocial =
        (row.original.entidad.nombreCompleto &&
          row.original.entidad.nombreCompleto.trim()) ||
        (row.original.entidad.razonSocial &&
          row.original.entidad.razonSocial.trim());

      return (
        <div className="flex items-center gap-4 justify-between">
          {razonSocial?.toUpperCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "tipoReclamo",
    header: "Tipo",
    filterFn: (row, columnId, filterValue) => {
      return filterValue
        .map((value: string) => value.toLowerCase())
        .includes(row.original.tipoReclamo?.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="">{row.original.tipoReclamo?.replace("_", " ")}</div>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.estado;
      return (
        <div
          className={`capitalize ${
            estado === "activo" ? "text-green-600" : "text-red-600"
          }`}
        >
          <Badge variant={"destructive"}>Pendiente</Badge>
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
          <Button size={"icon"} asChild variant={"ghost"}>
            <Link href={`/entidades/${codigoEntidad}`}>
              <ChevronRightIcon size={24} strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
