import numeral from "numeral";
import { es } from "date-fns/locale";
import { formatDate } from "date-fns";
import { PersonaInteres } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const representatesLegalesColumns: ColumnDef<PersonaInteres>[] = [
  {
    accessorKey: "tipoPersonaInteres",
    header: "Tipo",
  },
  {
    accessorKey: "nombreApellido",
    header: "Nombre y Apellido",
  },
  {
    accessorKey: "documento",
    header: "DNI/CUIT",
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "expuestaPoliticamente",
    header: "Es P.E.P",
    cell: ({ row }) => (
      <div>{row.original.expuestaPoliticamente ? "Si" : "No"}</div>
    ),
  },
  {
    accessorKey: "esPepEnCaracterDe",
    header: "Es P.E.P en caracter de",
  },
];

export const propietariosBeneficiariosColumns: ColumnDef<PersonaInteres>[] = [
  {
    accessorKey: "tipoPersonaInteres",
    header: "Tipo",
  },
  {
    accessorKey: "nombreApellido",
    header: "Nombre y Apellido",
  },
  {
    accessorKey: "documento",
    header: "DNI/CUIT",
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "porcentajeAccionario",
    header: "% Accionario",
    cell: ({ row }) => (
      <div>
        {row.original.porcentajeAccionario
          ? numeral(row.original.porcentajeAccionario / 100).format("0.00%")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expuestaPoliticamente",
    header: "Es P.E.P",
    cell: ({ row }) => (
      <div>{row.original.expuestaPoliticamente ? "Si" : "No"}</div>
    ),
  },
  {
    accessorKey: "esPepEnCaracterDe",
    header: "Es P.E.P en caracter de",
  },
];

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
