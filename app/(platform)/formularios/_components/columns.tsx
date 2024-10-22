"use client";

import { toast } from "sonner";
import { es } from "date-fns/locale";
import { formatDistance } from "date-fns";
import { AlertCircleIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { SubmittedForm } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { procesarFormulario } from "@/actions/formularios";

async function onProcesarFormulario(submittedForm: SubmittedForm) {
  try {
    await procesarFormulario(submittedForm);
    toast.success("El formulario fue procesado correctamente.");
  } catch (err) {
    toast.error("Ha ocurrido un error procesando el formulario.");
  }
}

export const columns: ColumnDef<SubmittedForm>[] = [
  {
    size: 400,
    accessorKey: "submissionId",
    header: "ID del Formulario",
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.original.procesado.toString());
    },
    cell: ({ row }) => {
      const formulario = row.original;

      return (
        <div className="flex items-center gap-4 justify-between">
          {formulario.submissionId}
          {!formulario.procesado && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    onClick={() => onProcesarFormulario(formulario)}
                    className="text-sm text-primary font-semibold flex items-center gap-2"
                  >
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
