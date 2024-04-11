"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { getNosisData } from "@/actions/entidad";

interface NosisTriggerProps {
  codigoEntidad: string;
  fechaActualizacion?: any;
}

export default function NosisTrigger({
  codigoEntidad,
  fechaActualizacion,
}: NosisTriggerProps) {
  const [loading, setLoading] = useState(false);

  const onGetNosisData = async () => {
    setLoading(true);
    try {
      await getNosisData(codigoEntidad);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fecha: any) => {
    if (!fecha) return "";

    return format(fecha, "PPP", { locale: es });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onGetNosisData} size={"sm"} disabled={loading}>
        Obtener Datos Nosis
      </Button>
      <span className="text-[10px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
        fechaActualizacion
      )}`}</span>
    </div>
  );
}
