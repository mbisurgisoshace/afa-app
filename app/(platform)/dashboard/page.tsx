import {
  getSolicitudesByTipo,
  getSolicitudesSinRespuestaByTipo,
} from "@/actions/solicitud";
import DashboardCard from "./_components/DashboardCard";

export default async function Dashboard() {
  const emailsMensuales = await getSolicitudesByTipo("MAIL");
  const emailsSinRespuesta = await getSolicitudesSinRespuestaByTipo("MAIL");

  return (
    <div className="w-full max-w-[1196px] m-auto flex flex-col h-full">
      <div className="flex gap-4">
        <DashboardCard
          title="Mails Enviados"
          footer="Mails enviados en el mes actual"
          description={emailsMensuales.length.toString()}
        />
        <DashboardCard
          title="Mails sin Contestar"
          footer="Total de mails sin contestar"
          description={emailsSinRespuesta.length.toString()}
        />
      </div>
    </div>
  );
}
