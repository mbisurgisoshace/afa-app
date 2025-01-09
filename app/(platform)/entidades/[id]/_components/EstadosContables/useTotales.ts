import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { EstadoContableSchema } from "@/schemas";

import {
  PATRIMONIO_NETO,
  ACTIVO_CORRIENTE,
  PASIVO_CORRIENTE,
  ACTIVO_NO_CORRIENTE,
  PASIVO_NO_CORRIENTE,
  RESULTADO_ORDINARIO,
} from "./clasificacion";

export default function useTotales(
  form: UseFormReturn<z.infer<typeof EstadoContableSchema>>
) {
  const getTotalActivoCorriente = () => {
    const activoCorriente = ACTIVO_CORRIENTE.reduce(
      (acc, activo) => acc + parseFloat(form.watch(activo.id as any)),
      0
    );

    return activoCorriente;
  };

  const getTotalActivoNoCorriente = () => {
    const activoNoCorriente = ACTIVO_NO_CORRIENTE.reduce(
      (acc, activo) => acc + parseFloat(form.watch(activo.id as any)),
      0
    );

    return activoNoCorriente;
  };

  const getTotalActivo = () => {
    return getTotalActivoCorriente() + getTotalActivoNoCorriente();
  };

  const getTotalPasivoCorriente = () => {
    const pasivoCorriente = PASIVO_CORRIENTE.reduce(
      (acc, pasivo) => acc + parseFloat(form.watch(pasivo.id as any)),
      0
    );

    return pasivoCorriente;
  };

  const getTotalPasivoNoCorriente = () => {
    const pasivoNoCorriente = PASIVO_NO_CORRIENTE.reduce(
      (acc, pasivo) => acc + parseFloat(form.watch(pasivo.id as any)),
      0
    );

    return pasivoNoCorriente;
  };

  const getTotalPatrimonioNeto = () => {
    const patrimonioNeto = PATRIMONIO_NETO.reduce(
      (acc, patrimonio) => acc + parseFloat(form.watch(patrimonio.id as any)),
      0
    );

    return patrimonioNeto;
  };

  const getTotalPasivo = () => {
    return (
      getTotalPasivoCorriente() +
      getTotalPasivoNoCorriente() +
      getTotalPatrimonioNeto()
    );
  };

  const getTotalResultadosOrdinarios = () => {
    const resultadosOrdinarios = RESULTADO_ORDINARIO.reduce(
      (acc, resultado) => acc + parseFloat(form.watch(resultado.id as any)),
      0
    );

    return resultadosOrdinarios;
  };

  const getResultado = () => {
    return (
      getTotalResultadosOrdinarios() +
      parseFloat(form.watch("resultadosExtraordinarios"))
    );
  };

  return {
    getTotalActivo,
    getTotalActivoCorriente,
    getTotalActivoNoCorriente,
    getTotalPasivo,
    getTotalPasivoCorriente,
    getTotalPasivoNoCorriente,
    getTotalPatrimonioNeto,
    getTotalResultadosOrdinarios,
    getResultado,
  };
}
