"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface ActionsToolbarProps<TData> {
  table: Table<TData>;
}

export function ActionsToolbar<TData>({ table }: ActionsToolbarProps<TData>) {
  return (
    <div>
      <Button
        size={"xs"}
        onClick={() => {
          console.log("selected rows:", table.getSelectedRowModel().rows);
        }}
      >
        Envio Masivo de Solicitudes
      </Button>
    </div>
  );
}
