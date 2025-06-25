"use client";

import { toast } from "sonner";
import { format } from "date-fns";
import { useCallback, useEffect, useState, useTransition } from "react";

import {
  calcularRiesgoCuitApocrifo,
  calcularRiesgoGeografico,
  calcularRiesgoSujetoSancionado,
  calcularRiesgoTerrorismo,
  getUltimoRiesgoCuitApocrifo,
  getUltimoRiesgoGeografico,
  getUltimoRiesgoSujetoSancionado,
  getUltimoRiesgoTerrorismo,
} from "@/actions/riesgos";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/DottedSeparator";
import {
  RiesgoCuitApocrifo,
  RiesgoGeografico,
  RiesgoSujetosSancionados,
  RiesgoTerrorista,
} from "@prisma/client";
import { MessageSquareWarningIcon } from "lucide-react";

interface DetalleRiesgosProps {
  entidadId: number;
}

export default function DetalleRiesgos({ entidadId }: DetalleRiesgosProps) {
  const [isPending, startTransition] = useTransition();
  const [ultimoRiesgoTerrorismo, setUltimoRiesgoTerrorismo] =
    useState<RiesgoTerrorista | null>();
  const [ultimoRiesgoGeografico, setUltimoRiesgoGeografico] =
    useState<RiesgoGeografico | null>();
  const [ultimoRiesgoCuitApocrifo, setUltimoRiesgoCuitApocrifo] =
    useState<RiesgoCuitApocrifo | null>();
  const [ultimoRiesgoSujetoSancionado, setUltimoRiesgoSujetoSancionado] =
    useState<RiesgoSujetosSancionados | null>();

  const fetchRiesgoTerrorismo = useCallback(async () => {
    const riesgoTerrorismo = await getUltimoRiesgoTerrorismo(entidadId);
    setUltimoRiesgoTerrorismo(riesgoTerrorismo);
  }, [entidadId]);

  const fetchRiesgoGeografico = useCallback(async () => {
    const riesgoGeografico = await getUltimoRiesgoGeografico(entidadId);
    setUltimoRiesgoGeografico(riesgoGeografico);
  }, [entidadId]);

  const fetchRiesgoCuitApocrifo = useCallback(async () => {
    const riesgoCuitApocrifo = await getUltimoRiesgoCuitApocrifo(entidadId);
    setUltimoRiesgoCuitApocrifo(riesgoCuitApocrifo);
  }, [entidadId]);

  const fetchRiesgoSujetoSancionado = useCallback(async () => {
    const riesgoSujetoSancionado = await getUltimoRiesgoSujetoSancionado(
      entidadId
    );
    setUltimoRiesgoSujetoSancionado(riesgoSujetoSancionado);
  }, [entidadId]);

  useEffect(() => {
    fetchRiesgoTerrorismo();
    fetchRiesgoGeografico();
    fetchRiesgoCuitApocrifo();
    fetchRiesgoSujetoSancionado();
  }, [
    entidadId,
    fetchRiesgoTerrorismo,
    fetchRiesgoGeografico,
    fetchRiesgoCuitApocrifo,
    fetchRiesgoSujetoSancionado,
  ]);

  const onCotejarRiesgoTerrorismo = async () => {
    startTransition(async () => {
      await calcularRiesgoTerrorismo(entidadId);
      toast.success(
        "Cotejo de Riesgo de Lavado de Activos y Financiamiento del Terrorismo realizado correctamente"
      );
      fetchRiesgoTerrorismo();
    });
  };

  const onCotejarRiesgoGeografico = async () => {
    startTransition(async () => {
      await calcularRiesgoGeografico(entidadId);
      toast.success("Cotejo de Riesgo Geografico realizado correctamente");
      fetchRiesgoGeografico();
    });
  };

  const onCotejarRiesgoCuitApocrifo = async () => {
    startTransition(async () => {
      await calcularRiesgoCuitApocrifo(entidadId);
      toast.success("Cotejo de Riesgo Apocrifo realizado correctamente");
      fetchRiesgoCuitApocrifo();
    });
  };

  const onCotejarRiesgoSujetoSancionado = async () => {
    startTransition(async () => {
      await calcularRiesgoSujetoSancionado(entidadId);
      toast.success(
        "Cotejo de Riesgo Sujeto Obligado Sancionado realizado correctamente"
      );
      fetchRiesgoSujetoSancionado();
    });
  };

  return (
    <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F] flex items-center gap-2">
            Riesgo de Lavado de Activos y Financiamiento del Terrorismo
            <MessageSquareWarningIcon
              size={24}
              className={`${
                (ultimoRiesgoTerrorismo &&
                  //@ts-ignore
                  ultimoRiesgoTerrorismo.porcentajeCoincidencia > 70 &&
                  "text-destructive") ||
                "text-muted-foreground"
              }`}
            />
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${
            ultimoRiesgoTerrorismo
              ? `${format(ultimoRiesgoTerrorismo.createdAt, "dd/MM/yyyy")}`
              : ""
          }`}</span>
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
          <h4 className="font-semibold text-[#070F3F] flex items-center gap-2">
            Riesgo Geografico
            <MessageSquareWarningIcon
              size={24}
              className={`${
                (ultimoRiesgoGeografico &&
                  ultimoRiesgoGeografico.riesgoso &&
                  "text-destructive") ||
                "text-muted-foreground"
              }`}
            />
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${
            ultimoRiesgoGeografico
              ? `${format(ultimoRiesgoGeografico.createdAt, "dd/MM/yyyy")}`
              : ""
          }`}</span>
        </div>
        <Button
          onClick={onCotejarRiesgoGeografico}
          size={"xs"}
          disabled={isPending}
        >
          Cotejar
        </Button>
      </div>

      <DottedSeparator className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F] flex items-center gap-2">
            Riesgo Sujeto Sancionado
            <MessageSquareWarningIcon
              size={24}
              className={`${
                (ultimoRiesgoSujetoSancionado &&
                  ultimoRiesgoSujetoSancionado.riesgoso &&
                  "text-destructive") ||
                "text-muted-foreground"
              }`}
            />
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${
            ultimoRiesgoSujetoSancionado
              ? `${format(
                  ultimoRiesgoSujetoSancionado.createdAt,
                  "dd/MM/yyyy"
                )}`
              : ""
          }`}</span>
        </div>
        <Button
          onClick={onCotejarRiesgoSujetoSancionado}
          size={"xs"}
          disabled={isPending}
        >
          Cotejar
        </Button>
      </div>

      <DottedSeparator className="my-4" />

      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#070F3F] flex items-center gap-2">
            Riesgo Cuit Apocrifo
            <MessageSquareWarningIcon
              size={24}
              className={`${
                (ultimoRiesgoCuitApocrifo &&
                  ultimoRiesgoCuitApocrifo.riesgoso &&
                  "text-destructive") ||
                "text-muted-foreground"
              }`}
            />
          </h4>
          <span className="text-[12px] font-semibold text-gray-500">{`Ultima actualizacion: ${
            ultimoRiesgoCuitApocrifo
              ? `${format(ultimoRiesgoCuitApocrifo.createdAt, "dd/MM/yyyy")}`
              : ""
          }`}</span>
        </div>
        <Button
          onClick={onCotejarRiesgoCuitApocrifo}
          size={"xs"}
          disabled={isPending}
        >
          Cotejar
        </Button>
      </div>
    </div>
  );
}
