"use client";

import { ChevronRightIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Entidad } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Entidad>[] = [
  {
    accessorKey: "codigoEntidad",
    header: "Codigo",
  },
  {
    size: 400,
    accessorKey: "submissionId",
    header: "Nombre y Apellido / Razon Social",
    cell: ({ row }) => {
      const formulario = row.original;

      return <div className="flex items-center gap-4 justify-between"></div>;
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => <div className="text-right"></div>,
  },
  {
    accessorKey: "acciones",
    header: "",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex items-center gap-4 text-primary justify-evenly">
          <Button size={"icon"} asChild variant={"ghost"}>
            <Link href={`/entidades/${id}`}>
              <ChevronRightIcon size={24} strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
