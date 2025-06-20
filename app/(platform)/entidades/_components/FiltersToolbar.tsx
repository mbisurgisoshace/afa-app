"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

const opcionesTipo = [
  { value: "Club", label: "Club" },
  { value: "Sponsor", label: "Sponsor" },
  { value: "Proveedor", label: "Proveedor" },
  { value: "Agente_Comercial", label: "Agente Comercial" },
];

const opcionesDatos = [
  { value: "Completos", label: "Completos" },
  { value: "Incompletos", label: "Incompletos" },
];

interface FiltersToolbarProps<TData> {
  table: Table<TData>;
}

export function FiltersToolbar<TData>({ table }: FiltersToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Buscar por razon social/nombre completo"
          value={
            (table.getColumn("nombreCompleto")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("nombreCompleto")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[350px]"
        />
        {table.getColumn("tipo") && (
          <DataTableFacetedFilter
            column={table.getColumn("tipo")}
            title="Tipo"
            options={opcionesTipo}
          />
        )}
        {table.getColumn("codigoEntidad") && (
          <DataTableFacetedFilter
            column={table.getColumn("codigoEntidad")}
            title="Datos"
            options={opcionesDatos}
          />
        )}
        {/* {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
