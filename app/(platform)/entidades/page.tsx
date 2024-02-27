import { columns } from "./_components/columns";
import { getEntidades } from "@/actions/entidad";
import { DataTable } from "@/components/DataTable";

export default async function Entidades() {
  const entidades = await getEntidades();

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-[#070F3F]">Entidades</h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
        <DataTable data={entidades} columns={columns} />
      </div>
    </div>
  );
}
