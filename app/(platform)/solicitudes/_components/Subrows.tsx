"use client";

import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";
import { Row } from "@tanstack/react-table";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EntidadWithSolicitudes } from "@/types";
import { Button } from "@/components/ui/button";
import { createRecordatorioSolicitud } from "@/actions/solicitud";

export const renderSubComponent = ({
  row,
}: {
  row: Row<EntidadWithSolicitudes>;
}) => {
  // const onEnviarRecordatorioSolicitud = async () => {
  //   try {
  //     await createRecordatorioSolicitud(row.original.codigoEntidad);
  //     toast.success("Recordatorio de solicitud enviado correctamente.");
  //   } catch (err) {
  //     toast.error(
  //       "Ha ocurrido un error al enviar el recordatorio de solicitud via mail."
  //     );
  //   }
  // };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-primary hover:bg-primary">
          <TableHead className="text-white text-xs h-7">
            Tipo de Reclamo
          </TableHead>
          <TableHead className="text-white text-xs h-7">
            Fecha de Reclamo
          </TableHead>
          <TableHead className="text-white text-xs h-7">Estado</TableHead>
          {/* <TableHead className="text-white text-xs h-7"></TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {row.original.solicitudes.map((solicitud) => (
          <TableRow key={solicitud.id}>
            <TableCell className="text-xs h-7">
              {solicitud.tipoReclamo}
            </TableCell>
            <TableCell className="text-xs h-7">
              {format(solicitud.fecha, "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="text-xs h-7">
              <Badge variant={"destructive"}>Pendiente</Badge>
            </TableCell>
            {/* <TableCell className="text-xs h-7 flex">
              <Button
                size={"xs"}
                variant={"outline"}
                className="ml-auto"
                onClick={onEnviarRecordatorioSolicitud}
              >
                Enviar recordatorio
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
