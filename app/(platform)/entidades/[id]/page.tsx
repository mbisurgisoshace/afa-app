import { MessageSquareWarningIcon } from "lucide-react";

import {
  getUltimoRiesgo,
  getUltimoRiesgoCuitApocrifo,
  getUltimoRiesgoGeografico,
  getUltimoRiesgoSujetoSancionado,
  getUltimoRiesgoTerrorismo,
} from "@/actions/riesgos";
import { Badge } from "@/components/ui/badge";
import EntidadForm from "./_components/EntidadForm";
import NosisTrigger from "./_components/NosisTrigger";
import { getEntidad, getTablas } from "@/actions/entidad";
import DetalleRiesgos from "./_components/DetalleRiesgos";
import EnviarSolicitud from "./_components/EnviarSolicitud";
import EstadosContables from "./_components/EstadosContables";
import IndicadoresFinancieros from "./_components/IndicadoresFinancieros";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tareas from "./_components/Tareas";
import { hasSolicitudesPendientes } from "@/actions/solicitud";
import calcularRiesgo from "@/lib/riesgo/CalculadorRiesgo";

interface EntidadProps {
  params: { id: string };
}

export default async function Entidad({ params }: EntidadProps) {
  const entidad = await getEntidad(params.id);

  const ultimoRiesgo = await getUltimoRiesgo(entidad!.id);
  const ultimoRiesgoGeografico = await getUltimoRiesgoGeografico(entidad!.id);
  const ultimoRiesgoTerrorista = await getUltimoRiesgoTerrorismo(entidad!.id);
  const ultimoRiesgoCuitApocrifo = await getUltimoRiesgoCuitApocrifo(
    entidad!.id
  );
  const ultimoRiesgoSujetoSancionado = await getUltimoRiesgoSujetoSancionado(
    entidad!.id
  );
  const tieneSolicitudesPendientes = await hasSolicitudesPendientes(
    entidad?.codigoEntidad!
  );

  const { paises, oficios, industrias, profesiones, actividadesAfip } =
    await getTablas();

  const esRiesgoso = () => {
    if (!entidad) return false;
    return (
      (ultimoRiesgoGeografico && ultimoRiesgoGeografico.riesgoso) ||
      (ultimoRiesgoTerrorista &&
        //@ts-ignore
        ultimoRiesgoTerrorista.porcentajeCoincidencia > 70) ||
      (ultimoRiesgoCuitApocrifo && ultimoRiesgoCuitApocrifo.riesgoso) ||
      (ultimoRiesgoSujetoSancionado && ultimoRiesgoSujetoSancionado.riesgoso)
    );
  };

  const getRiesgo = (score?: number | null) => {
    if (!score)
      return {
        text: "Sin Calificar",
        variant: "sinCalificar",
      };
    if (score >= 0 && score <= 1.5) {
      return {
        text: "Riesgo Bajo",
        variant: "riesgoBajo",
      };
    } else if (score > 1.5 && score <= 2.5) {
      return {
        text: "Riesgo Medio-Bajo",
        variant: "riesgoMedioBajo",
      };
    } else if (score > 2.5 && score <= 3.5) {
      return {
        text: "Riesgo Medio",
        variant: "riesgoIntermedio",
      };
    } else if (score > 3.5 && score <= 4.6) {
      return {
        text: "Riesgo Medio-Alto",
        variant: "riesgoMedioAlto",
      };
    } else if (score > 4.6) {
      return {
        text: "Riesgo Alto",
        variant: "riesgoAlto",
      };
    } else {
      return {
        text: "Sin Calificar",
        variant: "sinCalificar",
      };
    }
  };

  const riesgo = getRiesgo(ultimoRiesgo?.valorRiesgoFinal.toNumber());
  console.log("RIESGO", riesgo);
  console.log("ULTIMO RIESGO", ultimoRiesgo);

  const razonSocial =
    (entidad?.nombreCompleto && entidad?.nombreCompleto.trim()) ||
    (entidad?.razonSocial && entidad?.razonSocial.trim()) ||
    "";

  const shouldRenderEECC =
    entidad?.tipoDePersona && entidad.tipoDePersona !== "HUMANA";

  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center font-semibold text-lg text-muted-foreground gap-4">
        {razonSocial?.toUpperCase()}
        <Badge variant={riesgo.variant as any}>{`${
          ultimoRiesgo?.valorRiesgoFinal.toNumber().toFixed(2) ? " - " : ""
        } ${riesgo?.text}`}</Badge>
        {/* <EnviarSolicitud codigoEntidad={entidad?.codigoEntidad!} /> */}
        <Tareas
          codigoEntidad={entidad?.codigoEntidad!}
          solicitudesPendientes={tieneSolicitudesPendientes}
        />
        {esRiesgoso() && (
          <MessageSquareWarningIcon size={24} className="text-destructive" />
        )}
      </h2>
      <Tabs defaultValue="informacion" className="w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <TabsList
              className={`grid grid-cols-${shouldRenderEECC ? "4" : "3"}`}
            >
              <TabsTrigger value="informacion">Información básica</TabsTrigger>
              {shouldRenderEECC && (
                <TabsTrigger value="eecc">Estados Contables</TabsTrigger>
              )}
              <TabsTrigger value="indicadores">
                Indicadores Financieros
              </TabsTrigger>
              <TabsTrigger value="riesgos">Detalle de Riesgos</TabsTrigger>
            </TabsList>
          </div>
          <NosisTrigger
            codigoEntidad={params.id}
            fechaActualizacion={entidad?.riesgoUltimaActualizacion}
          />
        </div>
        <TabsContent value="informacion">
          {entidad && (
            <EntidadForm
              entidad={entidad}
              tablas={{
                paises,
                oficios,
                industrias,
                profesiones,
                actividadesAfip,
              }}
            />
          )}
        </TabsContent>
        <TabsContent value="eecc">
          {entidad && <EstadosContables entidadId={entidad.id} />}
        </TabsContent>
        <TabsContent value="indicadores">
          {entidad && <IndicadoresFinancieros entidadId={entidad.id} />}
        </TabsContent>
        <TabsContent value="riesgos">
          {entidad && <DetalleRiesgos entidadId={entidad.id} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
