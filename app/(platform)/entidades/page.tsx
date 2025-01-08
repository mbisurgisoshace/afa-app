import { SearchParams } from "@/types";
import { columns } from "./_components/columns";
import { getEntidades } from "@/actions/entidad";
import { DataTable } from "@/components/DataTable/index";
import { FiltersToolbar } from "./_components/FiltersToolbar";

interface EntidadesProps {
  searchParams: SearchParams;
}

export default async function Entidades({ searchParams }: EntidadesProps) {
  const entidades = await getEntidades(searchParams);

  return (
    <div className="w-full max-w-[1196px] m-auto flex flex-col h-full">
      <div className="flex items-center justify-between mt-2 mb-4">
        <h3 className="text-2xl font-semibold text-[#070F3F]">
          Administración de entidades
        </h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg overflow-scroll h-full">
        <DataTable
          data={entidades}
          columns={columns}
          filteringTool={FiltersToolbar}
        />
      </div>
    </div>
  );
}
