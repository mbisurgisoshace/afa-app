"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createSolicitud } from "@/actions/solicitud";
import { useState } from "react";

export default function EnviarSolicitud({
  codigoEntidad,
}: {
  codigoEntidad: string;
}) {
  const [loading, setLoading] = useState(false);

  const onEnviarSolicitud = async () => {
    setLoading(true);
    try {
      await createSolicitud(codigoEntidad);
      toast.success("Solicitud enviada correctamente.");
    } catch (err) {
      toast.error("Ha ocurrido un error al enviar la solicitud via mail.");
    }
    setLoading(false);
  };

  return (
    <Button size={"xs"} onClick={onEnviarSolicitud} disabled={loading}>
      Enviar Solicitud
    </Button>
  );
}
