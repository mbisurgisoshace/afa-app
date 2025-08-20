import { toNumber } from "lodash";

import { CampoRiesgo, RiesgoScore } from "@prisma/client";
import { db } from "@/lib/db";

export async function calcularRiesgoScore(
  entidadId: number,
  campo: CampoRiesgo
) {
  const eecc = await db.estadoContable.findFirst({
    where: {
      entidadId: entidadId,
    },
    orderBy: {
      fechaHasta: "desc",
    },
    include: {
      IndicadorFinanciero: true,
    },
  });

  if (!eecc) return 1 * toNumber(campo.ponderacionRiesgo);

  const riesgo = await db.riesgoScore.findMany({});

  const liquidezCorriente = buscarPorRango(
    riesgo.filter((item) => item.campoIndicador === "liquidezCorriente"),
    toNumber(eecc.IndicadorFinanciero[0].liquidezCorriente)
  );

  const endeudamientoTotal = buscarPorRango(
    riesgo.filter((item) => item.campoIndicador === "endeudamientoTotal"),
    toNumber(eecc.IndicadorFinanciero[0].endeudamientoTotal)
  );

  const solvencia = buscarPorRango(
    riesgo.filter((item) => item.campoIndicador === "solvencia"),
    toNumber(eecc.IndicadorFinanciero[0].solvencia)
  );

  const roa = buscarPorRango(
    riesgo.filter((item) => item.campoIndicador === "roa"),
    toNumber(eecc.IndicadorFinanciero[0].roa)
  );

  const roe = buscarPorRango(
    riesgo.filter((item) => item.campoIndicador === "roe"),
    toNumber(eecc.IndicadorFinanciero[0].roe)
  );

  const porcentajeCargasFiscales = buscarPorRango(
    riesgo.filter((item) => item.campoIndicador === "porcentajeCargasFiscales"),
    toNumber(eecc.IndicadorFinanciero[0].porcentajeCargasFiscales)
  );

  const rentabilidadSobreIngresos = buscarPorRango(
    riesgo.filter(
      (item) => item.campoIndicador === "rentabilidadSobreIngresos"
    ),
    toNumber(eecc.IndicadorFinanciero[0].rentabilidadSobreIngresos)
  );

  const riesgoLiquidezCorriente =
    toNumber(liquidezCorriente?.ponderacion || 0) *
    toNumber(liquidezCorriente?.valoracionRiesgo || 0);

  const riesgoEndeudamientoTotal =
    toNumber(endeudamientoTotal?.ponderacion || 0) *
    toNumber(endeudamientoTotal?.valoracionRiesgo || 0);

  const riesgoSolvencia =
    toNumber(solvencia?.ponderacion || 0) *
    toNumber(solvencia?.valoracionRiesgo || 0);

  const riesgoRoa =
    toNumber(roa?.ponderacion || 0) * toNumber(roa?.valoracionRiesgo || 0);

  const riesgoRoe =
    toNumber(roe?.ponderacion || 0) * toNumber(roe?.valoracionRiesgo || 0);

  const riesgoPorcentajeCargasFiscales =
    toNumber(porcentajeCargasFiscales?.ponderacion || 0) *
    toNumber(porcentajeCargasFiscales?.valoracionRiesgo || 0);

  const riesgoRentabilidadSobreIngresos =
    toNumber(rentabilidadSobreIngresos?.ponderacion || 0) *
    toNumber(rentabilidadSobreIngresos?.valoracionRiesgo || 0);

  return (
    (riesgoLiquidezCorriente +
      riesgoEndeudamientoTotal +
      riesgoSolvencia +
      riesgoRoa +
      riesgoRoe +
      riesgoPorcentajeCargasFiscales +
      riesgoRentabilidadSobreIngresos) *
    toNumber(campo.ponderacionRiesgo)
  );
}

function buscarPorRango(lista: RiesgoScore[], valor: number) {
  return (
    lista.find(
      (item) => valor >= toNumber(item.desde) && valor <= toNumber(item.hasta)
    ) || null
  );
}
