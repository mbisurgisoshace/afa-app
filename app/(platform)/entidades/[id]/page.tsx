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
import { getEntidad } from "@/actions/entidad";

interface EntidadProps {
  params: { id: string };
}

export default async function Entidad({ params }: EntidadProps) {
  const entidad = await getEntidad(parseInt(params.id));
  console.log(entidad);

  return (
    <div>
      <Tabs defaultValue="informacion" className="w-full">
        <TabsList className="grid w-[332px] grid-cols-2">
          <TabsTrigger value="informacion">Información básica</TabsTrigger>
          <TabsTrigger value="riesgos">Detalle de riesgos</TabsTrigger>
        </TabsList>
        <TabsContent value="informacion">
          <EntidadForm />
        </TabsContent>
        <TabsContent value="riesgos">Riesgos</TabsContent>
      </Tabs>
    </div>
  );
}
