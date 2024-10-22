import { columns } from "./_components/columns";
// import { DataTable } from "@/components/DataTable";
import { getFormularios } from "@/actions/formularios";
import { DataTable } from "@/components/DataTable/index";
import { FiltersToolbar } from "./_components/FiltersToolbar";

export default async function Formularios() {
  const formularios = await getFormularios();

  return (
    <div className="w-full max-w-[1196px] m-auto flex flex-col h-full">
      <div className="flex items-center justify-between mt-2 mb-4">
        <h3 className="text-2xl font-semibold text-[#070F3F]">Formularios</h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg overflow-scroll h-full">
        <DataTable
          data={formularios}
          columns={columns}
          filteringTool={FiltersToolbar}
        />
      </div>
    </div>
  );
}
