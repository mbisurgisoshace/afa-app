"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle, XCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  search: string;
}

export function SearchInput({ search }: SearchInputProps) {
  console.log("search", search);

  const router = useRouter();
  const [value, setValue] = useState(search || "");
  const [hasNewFilters, setHasNewFilters] = useState(!!search);

  const onApplyFilter = () => {
    setHasNewFilters(true);
    const url = qs.stringifyUrl(
      {
        url: "/entidades",
        query: {
          search: value,
          page: 1,
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

  console.log("value", value);
  console.log("filters", hasNewFilters);

  return (
    <div className="mb-2 flex items-center">
      <div className="relative w-[464px]">
        <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          value={value}
          className="bg-white"
          onChange={(e) => {
            setHasNewFilters(false);
            setValue(e.target.value);
          }}
          placeholder="Buscar por codigo de entidad o nombre"
        />
      </div>
      {value && !hasNewFilters && (
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
}
