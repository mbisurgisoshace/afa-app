import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import EntidadForm from "./_components/EntidadForm";
import { getEntidad, getTablas } from "@/actions/entidad";
import { useEntidadesStore } from "@/zustand/store";

interface EntidadProps {
  params: { id: string };
}

export default async function Entidad({ params }: EntidadProps) {
  const entidad = await getEntidad(parseInt(params.id));
  const { paises, industrias, actividadesAfip } = await getTablas();
  console.log(entidad);

  return (
    <div>
      <Tabs defaultValue="informacion" className="w-full">
        <TabsList className="grid w-[332px] grid-cols-2">
          <TabsTrigger value="informacion">Información básica</TabsTrigger>
          <TabsTrigger value="riesgos">Detalle de riesgos</TabsTrigger>
        </TabsList>
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
