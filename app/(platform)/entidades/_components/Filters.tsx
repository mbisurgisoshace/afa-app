"use client";

import qs from "query-string";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

import { Filtro } from "./Filtro";
import { SearchParams } from "@/types";
import { SearchInput } from "./SearchInput";
import { Button } from "@/components/ui/button";

const opcionesTipo = [
  { value: "CLUB", label: "Club" },
  { value: "SPONSOR", label: "Sponsor" },
  { value: "PROVEEDOR", label: "Proveedor" },
  { value: "AGENTE_COMERCIAL", label: "Agente Comercial" },
];

interface FilteringToolsProps {
  searchParams: SearchParams;
}

export const FilteringTools = ({ searchParams }: FilteringToolsProps) => {
  const router = useRouter();
  const [hasNewFilters, setHasNewFilters] = useState(
    !!searchParams.search || !!searchParams.tipo
  );
  const [value, setValue] = useState(searchParams.search || "");

  const [filtroTipos, setFiltroTipos] = useState(
    searchParams.tipo
      ? new Set(searchParams.tipo?.split(",").map((tipo) => tipo.toUpperCase()))
      : new Set<string>()
  );

  const onApplyFilter = () => {
    setHasNewFilters(true);
    const url = qs.stringifyUrl(
      {
        url: "/entidades",
        query: {
          page: 1,
          search: value,
          tipo: Array.from(filtroTipos).join(","),
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  const onClearFilter = () => {
    setValue("");
    setFiltroTipos(new Set<string>());
    setHasNewFilters(false);
    const url = qs.stringifyUrl(
      {
        url: "/entidades",
        query: {},
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        search={value}
        setSearch={(value) => {
          setValue(value);
          setHasNewFilters(false);
        }}
      />
      <Filtro
        title="Tipo"
        filtros={filtroTipos}
        opciones={opcionesTipo}
        setFiltros={(tipos) => {
          setFiltroTipos(tipos);
          setHasNewFilters(false);
        }}
      />
      {(value || filtroTipos.size > 0) && !hasNewFilters && (
        <Button
          size={"sm"}
          variant={"link"}
          onClick={onApplyFilter}
          className="flex items-center gap-2"
        >
          <CheckCircle size={"16"} />
          Aplicar Filtro
        </Button>
      )}
      {hasNewFilters && (
        <Button
          size={"sm"}
          variant={"link"}
          onClick={onClearFilter}
          className="flex items-center gap-2"
        >
          <XCircle size={"16"} />
          Limpiar Filtro
        </Button>
      )}
    </div>
  );
};
