"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { getInfoFinancieraData, getNosisData } from "@/actions/entidad";
import { toast } from "sonner";

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

  const onGetInfoFinanciera = async () => {
    setLoading(true);
    try {
      await getInfoFinancieraData(codigoEntidad);
      toast.success("Información financiera obtenida correctamente.");
    } catch (err) {
      toast.error("Ha ocurrido un error al obtener la información financiera.");
    }
    setLoading(false);
  };

  const formatFecha = (fecha: any) => {
    if (!fecha) return "";

    return format(fecha, "PPP", { locale: es });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onGetInfoFinanciera} size={"sm"} disabled={loading}>
        Informacion Financiera
      </Button>
      <span className="text-[10px] font-semibold text-gray-500">{`Ultima actualizacion: ${formatFecha(
        fechaActualizacion
      )}`}</span>
    </div>
  );
}
