"use client";

import { Button } from "@/components/ui/button";
import { createSolicitud } from "@/actions/solicitud";

export default function EnviarSolicitud({
  codigoEntidad,
}: {
  codigoEntidad: string;
}) {
  return (
    <Button
      size={"xs"}
      onClick={() => {
        createSolicitud(codigoEntidad);
      }}
    >
      Enviar Solicitud
    </Button>
  );
}
