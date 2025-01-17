"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";

interface FiltroProps {
  title: string;
  filtros: Set<string>;
  setFiltros: (filtros: Set<string>) => void;
  opciones: { value: string; label: string }[];
}

export const Filtro = ({
  title,
  filtros,
  setFiltros,
  opciones,
}: FiltroProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className="h-8 border-gray-300 border-dashed"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            {title}
            {filtros.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant={"secondary"}
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {filtros.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {filtros.size > 2 ? (
                    <Badge
                      variant={"secondary"}
                      className="rounded-sm px-1 font-normal"
                    >
                      {filtros.size} seleccionados
                    </Badge>
                  ) : (
                    opciones
                      .filter((opcion) => filtros.has(opcion.value))
                      .map((opcion) => (
                        <Badge
                          variant={"secondary"}
                          className="rounded-sm px-1 font-normal"
                          key={opcion.value}
                        >
                          {opcion.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No hay resultados</CommandEmpty>
              <CommandGroup>
                {opciones.map((opcion) => {
                  const isSelected = filtros.has(opcion.value);
                  return (
                    <CommandItem
                      key={opcion.value}
                      onSelect={() => {
                        if (isSelected) {
                          filtros.delete(opcion.value);
                        } else {
                          filtros.add(opcion.value);
                        }

                        setFiltros(new Set(filtros));
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>
                      <span>{opcion.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {filtros.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => setFiltros(new Set())}
                      className="justify-center text-center"
                    >
                      Limpiar filtro
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
