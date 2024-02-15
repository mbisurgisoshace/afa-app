"use client";

import { es } from "date-fns/locale";
import { format, formatDistance } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircleIcon } from "lucide-react";

import { SubmittedForm } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<SubmittedForm>[] = [
  {
    size: 400,
    accessorKey: "submissionId",
    header: "ID del Formulario",
    cell: ({ row }) => {
      const formulario = row.original;

      return (
        <div className="flex items-center gap-4 justify-between">
          {formulario.submissionId}
          {!formulario.procesado && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-primary font-semibold flex items-center gap-2">
                    <AlertCircleIcon
                      size={16}
                      strokeWidth={1.5}
                      className="text-destructive"
                    />
                    Reenviar formulario
                  </span>
                </TooltipTrigger>
                <TooltipContent side={"bottom"}>
                  <p>
                    Error al sincronizar el formulario. Reenvialo para continuar
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de Envio",
    cell: ({ row }) => (
      <div className="text-right">
        {formatDistance(row.original.createdAt, new Date(), { locale: es })}
      </div>
    ),
  },
];
