"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

export function SearchInput({ search, setSearch }: SearchInputProps) {
  return (
    <div className="flex items-center">
      <div className="relative w-[464px]">
        <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          value={search}
          className="bg-white"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Buscar por codigo de entidad o nombre"
        />
      </div>
    </div>
  );
}
