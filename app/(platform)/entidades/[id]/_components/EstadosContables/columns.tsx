"use client";

import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { EstadoContable } from "@prisma/client";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<EstadoContable>[] = [
  {
    accessorKey: "fechaDesde",
    header: "Desde",
  },
  {
    accessorKey: "fechaHasta",
    header: "Hasta",
  },
  {
    accessorKey: "acciones",
    header: "",
    size: 10,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex items-center gap-4 text-primary justify-evenly">
          {/* <Button size={"icon"} asChild variant={"ghost"}>
            <Link href={`/entidades/${codigoEntidad}`}>
              <ChevronRightIcon size={24} strokeWidth={1.5} />
            </Link>
          </Button> */}
        </div>
      );
    },
  },
];
