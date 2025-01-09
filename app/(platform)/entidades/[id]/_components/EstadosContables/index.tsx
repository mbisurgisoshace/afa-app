"use client";

import { useCallback, useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { columns } from "./columns";
import { EstadoContable } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { getEstadosContables } from "@/actions/estadosContables";

import EstadoContableForm from "./EstadoContableForm";

interface EstadosContablesProps {
  entidadId: number;
}

export default function EstadosContables({ entidadId }: EstadosContablesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [estadosContables, setEstadosContables] = useState<EstadoContable[]>(
    []
  );

  const fetchEstadosContables = useCallback(async () => {
    const estadosContables = await getEstadosContables(entidadId);
    setEstadosContables(estadosContables);
  }, [entidadId]);

  useEffect(() => {
    fetchEstadosContables();
  }, [entidadId, fetchEstadosContables]);

  const onEstadoContableAdded = async () => {
    setIsOpen(false);
    await fetchEstadosContables();
  };

  return (
    <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg overflow-scroll h-full">
      <div className="flex mb-6">
        <Button
          size={"sm"}
          className="ml-auto"
          variant={"tertiary"}
          onClick={() => setIsOpen(true)}
        >
          <PlusCircledIcon />
          <span className="ml-2 text-sm font-normal">Nuevo EECC</span>
        </Button>
      </div>
      <DataTable data={estadosContables} columns={columns} />
      {isOpen && (
        <EstadoContableForm
          isOpen={isOpen}
          entidadId={entidadId}
          onClose={() => setIsOpen(false)}
          onEstadoContableAdded={onEstadoContableAdded}
        />
      )}
    </div>
  );
}
