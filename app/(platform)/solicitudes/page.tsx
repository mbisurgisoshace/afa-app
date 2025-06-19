import { columns } from "./_components/columns";
import { DataTable } from "@/components/DataTable/index";
import { renderSubComponent } from "./_components/Subrows";
import { FiltersToolbar } from "./_components/FiltersToolbar";
import { getSolicitudesPendientes } from "@/actions/solicitud";
import { EntidadWithSolicitudes, SearchParams } from "@/types";

interface EntidadesProps {
  searchParams: SearchParams;
}

export default async function Solicitudes({ searchParams }: EntidadesProps) {
  const solicitudes =
    (await getSolicitudesPendientes()) as EntidadWithSolicitudes[];

  return (
    <div className="w-full max-w-[1196px] m-auto flex flex-col h-full">
      <div className="flex items-center justify-between mt-2 mb-4">
        <h3 className="text-2xl font-semibold text-[#070F3F]">
          Administración de solicitudes pendientes
        </h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg overflow-scroll h-full">
        <DataTable
          columns={columns}
          data={solicitudes}
          filteringTool={FiltersToolbar}
          renderSubComponent={renderSubComponent}
        />
      </div>
    </div>
  );
}
