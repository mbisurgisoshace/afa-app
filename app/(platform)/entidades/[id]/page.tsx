import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import EntidadForm from "./_components/EntidadForm";
import NosisTrigger from "./_components/NosisTrigger";
import { getEntidad, getTablas } from "@/actions/entidad";

interface EntidadProps {
  params: { id: string };
}

export default async function Entidad({ params }: EntidadProps) {
  const entidad = await getEntidad(params.id);
  console.log("entidad", entidad);

  const { paises, industrias, actividadesAfip } = await getTablas();

  return (
    <div className="flex flex-row">
      <Tabs defaultValue="informacion" className="w-full">
        <div className="flex flex-row justify-between items-center">
          <TabsList className="grid w-[332px] grid-cols-2">
            <TabsTrigger value="informacion">Información básica</TabsTrigger>
            <TabsTrigger value="riesgos">Detalle de riesgos</TabsTrigger>
          </TabsList>
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
        <TabsContent value="riesgos">Riesgos</TabsContent>
      </Tabs>
    </div>
  );
}
