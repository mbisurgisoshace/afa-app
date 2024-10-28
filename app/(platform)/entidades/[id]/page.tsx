import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import EntidadForm from "./_components/EntidadForm";
import NosisTrigger from "./_components/NosisTrigger";
import { getEntidad, getTablas } from "@/actions/entidad";
import { CalcularRiesgo } from "./_components/CalcularRiesgo";

interface EntidadProps {
  params: { id: string };
}

export default async function Entidad({ params }: EntidadProps) {
  const entidad = await getEntidad(params.id);

  const { paises, industrias, actividadesAfip } = await getTablas();

  const getRiesgo = (score?: number | null) => {
    if (!score)
      return {
        text: "Sin Calificar",
        variant: "sinCalificar",
      };
    if (score >= 0 && score <= 299) {
      return {
        text: "Riesgo Alto",
        variant: "riesgoAlto",
      };
    } else if (score >= 300 && score <= 499) {
      return {
        text: "Riesgo Medio",
        variant: "riesgoMedio",
      };
    } else if (score >= 500 && score <= 649) {
      return {
        text: "Riesgo Intermedio",
        variant: "riesgoIntermedio",
      };
    } else if (score >= 650 && score <= 999) {
      return {
        text: "Riesgo Bajo",
        variant: "riesgoBajo",
      };
    } else {
      return {
        text: "Sin Calificar",
        variant: "sinCalificar",
      };
    }
  };

  const riesgo = getRiesgo(entidad?.nosisScore);

  const razonSocial =
    (entidad?.nombreCompleto && entidad?.nombreCompleto.trim()) ||
    (entidad?.razonSocial && entidad?.razonSocial.trim()) ||
    "";

  return (
    <div className="flex flex-row">
      <Tabs defaultValue="informacion" className="w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <TabsList className="grid w-[332px] grid-cols-2">
              <TabsTrigger value="informacion">Información básica</TabsTrigger>
              <TabsTrigger value="riesgos">Detalle de riesgos</TabsTrigger>
            </TabsList>
            <h2 className="flex items-center font-semibold text-lg text-muted-foreground gap-4">
              {razonSocial?.toUpperCase()}
              <Badge variant={riesgo.variant as any}>{riesgo?.text}</Badge>
            </h2>
          </div>
          <NosisTrigger
            codigoEntidad={params.id}
            fechaActualizacion={entidad?.nosisUltimaActualizacion}
          />
        </div>
        <TabsContent value="informacion">
          {entidad && (
            <EntidadForm
              tablas={{ paises, industrias, actividadesAfip }}
              entidad={entidad}
            />
          )}
        </TabsContent>
        <TabsContent value="riesgos">
          <CalcularRiesgo
            razonSocial={razonSocial}
            personasDeInteres={
              entidad?.personasInteres.map(
                (persona) => persona.nombreApellido || ""
              ) || []
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
