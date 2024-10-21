import { SearchParams } from "@/types";
import { columns } from "./_components/columns";
import { getEntidades } from "@/actions/entidad";
import { DataTable } from "@/components/DataTable";
import { FilteringTools } from "./_components/Filters";

interface EntidadesProps {
  searchParams: SearchParams;
}

export default async function Entidades({ searchParams }: EntidadesProps) {
  const entidades = await getEntidades(searchParams);

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-[#070F3F]">
          Administración de entidades
        </h3>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <FilteringTools searchParams={searchParams} />
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
        <DataTable data={entidades} columns={columns} />
      </div>
    </div>
  );
}
