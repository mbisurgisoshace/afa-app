"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Terrorismo from "./Terrorismo";
import PaisesNoCooperantes from "./PaisesNoCooperantes";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  calcularRiesgoGeografico,
  calcularRiesgoTerrorismo,
} from "@/actions/riesgos";

interface DetalleRiesgosProps {
  entidadId: number;
}

export default function DetalleRiesgos({ entidadId }: DetalleRiesgosProps) {
  const [isPending, startTransition] = useTransition();

  const onCotejarRiesgoTerrorismo = async () => {
    startTransition(async () => {
      await calcularRiesgoTerrorismo(entidadId);
      toast.success(
        "Cotejo de Riesgo de Lavado de Activos y Financiamiento del Terrorismo realizado correctamente"
      );
    });
  };

  const onCotejarRiesgoGeografico = async () => {
    startTransition(async () => {
      await calcularRiesgoGeografico(entidadId);
      toast.success("Cotejo de Riesgo Geografico realizado correctamente");
    });
  };

  return (
    <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F]">
            Riesgo de Lavado de Activos y Financiamiento del Terrorismo
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: `}</span>
        </div>
        <Button
          onClick={onCotejarRiesgoTerrorismo}
          size={"xs"}
          disabled={isPending}
        >
          Cotejar
        </Button>
      </div>

      <DottedSeparator className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F]">Riesgo Geografico</h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: `}</span>
        </div>
        <Button
          onClick={onCotejarRiesgoGeografico}
          size={"xs"}
          disabled={isPending}
        >
          Cotejar
        </Button>
      </div>
      {/* <Tabs defaultValue="riesgos" className="w-full">
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
      </Tabs> */}
    </div>
  );
}
