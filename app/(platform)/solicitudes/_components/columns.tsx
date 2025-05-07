"use client";

import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Entidad } from "@prisma/client";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Entidad>[] = [
  {
    accessorKey: "codigoEntidad",
    header: "Codigo",
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
