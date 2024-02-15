import { columns } from "./_components/columns";
import { DataTable } from "@/components/DataTable";
import { getFormularios } from "@/actions/formularios";

export default async function Formularios() {
  const formularios = await getFormularios();

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-[#070F3F]">Formularios</h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
        <DataTable data={formularios} columns={columns} />
      </div>
    </div>
  );
}
