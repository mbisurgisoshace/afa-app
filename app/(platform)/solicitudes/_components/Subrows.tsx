"use client";

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

export const renderSubComponent = ({ row }: { row: Row<any> }) => {
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
