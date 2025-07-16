"use client";

import { toast } from "sonner";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  createRecordatorioSolicitud,
  createSolicitud,
} from "@/actions/solicitud";
import { MailWarningIcon } from "lucide-react";

export default function Tareas({
  children,
  codigoEntidad,
  align = "start",
  solicitudesPendientes,
}: {
  codigoEntidad: string;
  children?: React.ReactNode;
  solicitudesPendientes: boolean;
  align?: "end" | "start" | "center";
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

  const onEnviarRecordatorioSolicitud = async () => {
    setLoading(true);
    try {
      await createRecordatorioSolicitud(codigoEntidad);
      toast.success("Recordatorio de solicitud enviado correctamente.");
    } catch (err) {
      toast.error(
        "Ha ocurrido un error al enviar el recordatorio de solicitud via mail."
      );
    }
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || <Button size={"xs"}>Tareas</Button>}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align={align}>
        <DropdownMenuLabel>Envios de Mail</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEnviarSolicitud} disabled={loading}>
            Solicitud inicial
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onEnviarRecordatorioSolicitud}
            disabled={loading || !solicitudesPendientes}
            className="flex items-center justify-between"
          >
            Recordatorio de solicitud
            {solicitudesPendientes && (
              <MailWarningIcon size={18} className="text-destructive" />
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
