"use client";

import { Table } from "@tanstack/react-table";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";

const opcionesTipo = [
  { value: "Club", label: "Club" },
  { value: "Sponsor", label: "Sponsor" },
  { value: "Proveedor", label: "Proveedor" },
  { value: "Agente_Comercial", label: "Agente Comercial" },
];

const opcionesRespuestaFueraDePlazo = [
  { value: "Si", label: "Si" },
  { value: "No", label: "No" },
];

interface FiltersToolbarProps<TData> {
  table: Table<TData>;
}

export function FiltersToolbar<TData>({ table }: FiltersToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("tipo") && (
          <DataTableFacetedFilter
            column={table.getColumn("tipo")}
            title="Tipo"
            options={opcionesTipo}
          />
        )}
        {table.getColumn("respuestaFueraDePlazo") && (
          <DataTableFacetedFilter
            column={table.getColumn("respuestaFueraDePlazo")}
            title="Respuesta fuera de plazo"
            options={opcionesRespuestaFueraDePlazo}
          />
        )}
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
