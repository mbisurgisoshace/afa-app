import { es } from "date-fns/locale";
import { formatDate } from "date-fns";
import { PersonaInteres } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const empleadosActualesExAfaColumns: ColumnDef<PersonaInteres>[] = [
  {
    accessorKey: "nombreApellido",
    header: "Nombre y Apellido",
  },
  {
    accessorKey: "cargoEnAfa",
    header: "Cargo que ocupo en AFA",
  },
  {
    accessorKey: "fechaCargoEnAfa",
    header: "Fecha de ingreso a la empresa",
    cell: ({ row }) => (
      <div className="text-right">
        {formatDate(row.original.fechaCargoEnAfa!, "dd/MM/yyyy", {
          locale: es,
        })}
      </div>
    ),
  },
];

export const exEmpleadosActualesAfaColumns: ColumnDef<PersonaInteres>[] = [
  {
    accessorKey: "nombreApellido",
    header: "Nombre y Apellido",
  },
  {
    accessorKey: "cargoEnAfa",
    header: "Cargo que ocupa en AFA",
  },
  {
    accessorKey: "fechaCargoEnAfa",
    header: "Fecha de egreso a la empresa",
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.fechaCargoEnAfa
          ? formatDate(row.original.fechaCargoEnAfa!, "dd/MM/yyyy", {
              locale: es,
            })
          : ""}
      </div>
    ),
  },
];

export const familiaresEnComunColumns: ColumnDef<PersonaInteres>[] = [
  {
    accessorKey: "nombreApellido",
    header: "Nombre y Apellido",
  },
  {
    accessorKey: "cargoEnAfa",
    header: "Cargo que ocupa en AFA",
  },
  {
    accessorKey: "fechaCargoEnAfa",
    header: "Fecha de ingreso a la AFA",
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.fechaCargoEnAfa
          ? formatDate(row.original.fechaCargoEnAfa!, "dd/MM/yyyy", {
              locale: es,
            })
          : ""}
      </div>
    ),
  },
];

export const intereseEconomicoEnComunColumns: ColumnDef<PersonaInteres>[] = [
  {
    accessorKey: "nombreApellido",
    header: "Nombre y Apellido",
  },
  {
    accessorKey: "cargoEnAfa",
    header: "Cargo que ocupa en AFA",
  },
  {
    accessorKey: "fechaCargoEnAfa",
    header: "Fecha de ingreso a la AFA",
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.fechaCargoEnAfa
          ? formatDate(row.original.fechaCargoEnAfa!, "dd/MM/yyyy", {
              locale: es,
            })
          : ""}
      </div>
    ),
  },
];
