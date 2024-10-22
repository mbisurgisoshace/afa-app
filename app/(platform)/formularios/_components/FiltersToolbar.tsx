"use client";

import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";

const opcionesProcesado = [
  { value: "true", label: "Procesado" },
  { value: "false", label: "Sin procesar" },
];

interface FiltersToolbarProps<TData> {
  table: Table<TData>;
}

export function FiltersToolbar<TData>({ table }: FiltersToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    table.getColumn("submissionId")?.setFilterValue(["false"]);
  }, [table]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("submissionId") && (
          <DataTableFacetedFilter
            column={table.getColumn("submissionId")}
            title="Estado"
            options={opcionesProcesado}
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
