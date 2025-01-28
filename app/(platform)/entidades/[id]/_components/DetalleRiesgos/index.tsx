import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Terrorismo from "./Terrorismo";
import PaisesNoCooperantes from "./PaisesNoCooperantes";

export default function DetalleRiesgos() {
  return (
    <div className="flex flex-row">
      <Tabs defaultValue="riesgos" className="w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <TabsList className="grid grid-cols-3 bg-transparent">
              <TabsTrigger
                value="riesgos"
                className="
                border-b-2
                font-normal
                rounded-none 
                border-b-muted-foreground
                data-[state=active]:border-b-2
                data-[state=active]:shadow-none 
                data-[state=active]:text-primary
                data-[state=active]:bg-transparent 
                data-[state=active]:border-b-primary
                "
              >
                Matriz de Riesgo
              </TabsTrigger>
              <TabsTrigger
                value="terrorismo"
                className="
                border-b-2
                font-normal
                rounded-none 
                border-b-muted-foreground
                data-[state=active]:border-b-2
                data-[state=active]:shadow-none 
                data-[state=active]:text-primary
                data-[state=active]:bg-transparent 
                data-[state=active]:border-b-primary
                "
              >
                Terrorismo
              </TabsTrigger>
              <TabsTrigger
                value="paisesNoCooperantes"
                className="
                border-b-2
                font-normal
                rounded-none 
                border-b-muted-foreground
                data-[state=active]:border-b-2
                data-[state=active]:shadow-none 
                data-[state=active]:text-primary
                data-[state=active]:bg-transparent 
                data-[state=active]:border-b-primary
                "
              >
                Paises No Cooperantes
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="riesgos"></TabsContent>
        <TabsContent value="terrorismo">
          <Terrorismo />
        </TabsContent>
        <TabsContent value="paisesNoCooperantes">
          <PaisesNoCooperantes />
        </TabsContent>
      </Tabs>
    </div>
  );
}
