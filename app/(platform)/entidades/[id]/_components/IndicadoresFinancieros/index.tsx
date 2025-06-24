"use client";

import numeral from "numeral";
import { useCallback, useEffect, useState, useTransition } from "react";

import { IndicadoresWithEECC } from "@/types";
import IndicadorCard from "./_components/IndicadorCard";
import { getUltimosIndicadores } from "@/actions/estadosContables";

interface IndicadoresFinancierosProps {
  entidadId: number;
}

export default function IndicadoresFinancieros({
  entidadId,
}: IndicadoresFinancierosProps) {
  const [indicadoresFinancieros, setIndicadoresFinancieros] =
    useState<IndicadoresWithEECC | null>();

  const fetchIndicadoresFinancieros = useCallback(async () => {
    const indicadorFinanciero = await getUltimosIndicadores(entidadId);
    setIndicadoresFinancieros(indicadorFinanciero);
  }, [entidadId]);

  useEffect(() => {
    fetchIndicadoresFinancieros();
  }, [entidadId, fetchIndicadoresFinancieros]);

  return (
    <div className="w-full p-2">
      <>
        {indicadoresFinancieros ? (
          <>
            <h3 className="font-bold text-foreground">{`Indicadores financieros en base al ultimo balance presentado para el periodo entre ${indicadoresFinancieros?.eecc.fechaDesde} y ${indicadoresFinancieros?.eecc.fechaHasta}`}</h3>
            <div className="w-full flex items-center flex-col">
              <div className="max-w-5xl mt-5 grid grid-cols-3 gap-4 justify-items-center">
                <IndicadorCard
                  title="Liquidez Corriente"
                  footer="Capacidad de cubrir deudas de corto plazo con activos liquidos."
                  description={numeral(
                    indicadoresFinancieros.liquidezCorriente
                  ).format("0.00")}
                />
                <IndicadorCard
                  title="Endeudamiento Total"
                  footer="Porcentaje de activos financiado con deuda."
                  description={numeral(
                    indicadoresFinancieros.endeudamientoTotal
                  ).format("0.00%")}
                />
                <IndicadorCard
                  title="Solvencia"
                  footer="Grado de autofinanciamiento de la empresa."
                  description={numeral(indicadoresFinancieros.solvencia).format(
                    "0.00"
                  )}
                />
                <IndicadorCard
                  title="Rentabilidad sobre Ingresos (Margen Neto)"
                  footer="Porcentaje de utilidad obtenida por cada peso vendido."
                  description={numeral(
                    indicadoresFinancieros.rentabilidadSobreIngresos
                  ).format("0.00%")}
                />
                <IndicadorCard
                  title="Rentabilidad sobre los activos (ROA)"
                  footer="Eficiencia para generar ganancias usando los activos."
                  description={numeral(indicadoresFinancieros.roa).format(
                    "0.00"
                  )}
                />
                <IndicadorCard
                  title="Rentabilidad sobre el patrimonio (ROE)"
                  footer="Mide la rentabilidad obtenida por cada peso invertido por los propietarios."
                  description={numeral(indicadoresFinancieros.roe).format(
                    "0.00"
                  )}
                />
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
}
