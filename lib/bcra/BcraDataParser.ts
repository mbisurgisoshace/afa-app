interface BcraResultChequesDetalle {
  nroCheque: number;
  fechaRechazo: string;
  monto: number;
  fechaPago: string;
  fechaPagoMulta: string;
  estadoMulta: string;
  ctaPersonal: boolean;
  denomJuridica: string;
  enRevision: boolean;
  procesoJud: boolean;
}

interface BcraResultChequesEntidad {
  entidad: number;
  detalle: BcraResultChequesDetalle[];
}

interface BcraResultChequesCausal {
  causal: string;
  entidades: BcraResultChequesEntidad[];
}

interface BcraResultCheques {
  identificacion: number;
  denominacion: string;
  causales: BcraResultChequesCausal[];
}

export interface BcraResultChequesResponse {
  status: number;
  results: BcraResultCheques;
}

interface BcraResultEntidad {
  entidad: string;
  situacion: number;
  fechaSit1: string;
  monto: number;
  diasAtrasoPago: number;
  refinanciaciones: boolean;
  recategorizacionOblig: boolean;
  situacionJuridica: boolean;
  irrecDisposicionTecnica: boolean;
  enRevision: boolean;
  procesoJud: boolean;
}

interface BcraResultPeriodo {
  periodo: string;
  entidades: BcraResultEntidad[];
}

interface BcraResult {
  identificacion: string;
  denominacion: string;
  periodos: BcraResultPeriodo[];
}

export interface BcraDataResponse {
  status: number;
  results: BcraResult;
}

interface BcraParsedData {
  riesgoPeorSituacion: string;
  riesgoCantidadBancos: number;
  riesgoMontoTotal: number;
  riesgoAntiguedadBCRA: number;
  riesgoPeorSituacion12Meses: string;
  riesgoCantidadBancos12Meses: number;
  riesgoPerfilCumplimientoDeudor: number;
  riesgoEsMoroso: boolean;
  riesgoCantidadSinFondosNoPagados6Meses: number;
  riesgoMontoSinFondosNoPagados6Meses: number;
  riesgoJuiciosCantidad12Meses: number;
  riesgoConcursosQuiebrasCantidad12Meses: number;
  riesgoScore: number;
  riesgoProveedorEstado: string;
  riesgoFacturasApocrifas: boolean;
  riesgoDeudasFiscales: boolean;
  riesgoPedidoQuebrasCantidad12Meses: number;
  riesgoPeorSituacionCon10Porciento12Mesas: string;
  riesgoSectorActividadPrincipalDelEmpleador: string;
  riesgoSujetoObligado: string;
  riesgoPersonaExpuestaPoliticamente: string;
  riesgoUltimaActualizacion: Date;
}

export interface SujetoObligadoResponse {
  cuit: number;
  tipoSujeto: string;
  estado: string;
  mensaje: string;
}

export default class BcraDataParser {
  private bcraResponse: BcraDataResponse;
  private bcraHistoricoResponse: BcraDataResponse;
  private chequesResponse: BcraResultChequesResponse;
  private sujetoObligadoResponse: SujetoObligadoResponse[];

  constructor(
    bcraResponse: BcraDataResponse,
    bcraHistoricoResponse: BcraDataResponse,
    chequesResponse: BcraResultChequesResponse,
    sujetoObligadoResponse: SujetoObligadoResponse[]
  ) {
    this.bcraResponse = bcraResponse;
    this.chequesResponse = chequesResponse;
    this.bcraHistoricoResponse = bcraHistoricoResponse;
    this.sujetoObligadoResponse = sujetoObligadoResponse;
  }

  getParsedData(): BcraParsedData {
    return {
      riesgoPeorSituacion: this.getRiesgoPeorSituacion(),
      riesgoCantidadBancos:
        this.bcraResponse.results.periodos[0].entidades.length,
      riesgoMontoTotal: this.getRiesgoMontoTotal(),
      riesgoAntiguedadBCRA: this.getRiesgoAntiguedadBCRA(),
      riesgoPeorSituacion12Meses: this.getRiesgoPeorSituacion12Meses(),
      riesgoCantidadBancos12Meses: this.getRiesgoCantidadBancos12Meses(),
      riesgoPerfilCumplimientoDeudor: this.getRiesgoPerfilCumplimientoDeudor(),
      riesgoEsMoroso: this.getRiesgoEsMoroso(),
      riesgoCantidadSinFondosNoPagados6Meses:
        this.getRiesgoCantidadSinFondosNoPagados6Meses(),
      riesgoMontoSinFondosNoPagados6Meses:
        this.getRiesgoMontoSinFondosNoPagados6Meses(),
      riesgoJuiciosCantidad12Meses: this.getRiesgoJuiciosCantidad12Meses(),
      riesgoConcursosQuiebrasCantidad12Meses:
        this.getRiesgoConcursosQuiebrasCantidad12Meses(),
      riesgoScore: this.getRiesgoScore(),
      riesgoProveedorEstado: this.getRiesgoProveedorEstado(),
      riesgoFacturasApocrifas: this.getRiesgoFacturasApocrifas(),
      riesgoDeudasFiscales: this.getRiesgoDeudasFiscales(),
      riesgoPedidoQuebrasCantidad12Meses:
        this.getRiesgoPedidoQuebrasCantidad12Meses(),
      riesgoPeorSituacionCon10Porciento12Mesas:
        this.getRiesgoPeorSituacionCon10Porciento12Mesas(),
      riesgoSectorActividadPrincipalDelEmpleador:
        this.getRiesgoSectorActividadPrincipalDelEmpleador(),
      riesgoSujetoObligado: this.getRiesgoSujetoObligado(),
      riesgoPersonaExpuestaPoliticamente:
        this.getRiesgoPersonaExpuestaPoliticamente(),
      riesgoUltimaActualizacion: this.getRiesgoUltimaActualizacion(),
    };
  }

  private getRiesgoPeorSituacion(): string {
    let peorSituacion = 1;

    this.bcraHistoricoResponse.results.periodos[0].entidades.forEach(
      (entidad) => {
        if (entidad.situacion > peorSituacion) {
          peorSituacion = entidad.situacion;
        }
      }
    );

    return peorSituacion.toString();
  }

  private getRiesgoMontoTotal(): number {
    return this.bcraHistoricoResponse.results.periodos[0].entidades.reduce(
      (total, entidad) => total + entidad.monto,
      0
    );
  }

  private getRiesgoAntiguedadBCRA(): number {
    // TODO: implement
    return 0;
  }

  private getRiesgoEsMoroso(): boolean {
    return this.bcraHistoricoResponse.results.periodos[0].entidades.some(
      (entidad) => entidad.diasAtrasoPago > 0
    );
  }

  private getRiesgoPeorSituacion12Meses(): string {
    let peorSituacion = 1;

    this.bcraHistoricoResponse.results.periodos.forEach((periodo) => {
      periodo.entidades.forEach((entidad) => {
        if (entidad.situacion > peorSituacion) {
          peorSituacion = entidad.situacion;
        }
      });
    });

    return peorSituacion.toString();
  }

  private getRiesgoCantidadBancos12Meses(): number {
    let entidades: Map<string, any> = new Map();

    this.bcraHistoricoResponse.results.periodos.forEach((periodo) => {
      periodo.entidades.forEach((entidad) => {
        if (entidad.situacion > 0 && !entidades.has(entidad.entidad)) {
          entidades.set(entidad.entidad, entidad);
        }
      });
    });

    return entidades.size;
  }

  private getRiesgoPerfilCumplimientoDeudor(): number {
    // TODO: implement
    return 0;
  }

  private getRiesgoJuiciosCantidad12Meses(): number {
    let entidades: Map<string, any> = new Map();

    this.bcraHistoricoResponse.results.periodos.forEach((periodo) => {
      periodo.entidades.forEach((entidad) => {
        if (entidad.procesoJud && !entidades.has(entidad.entidad)) {
          entidades.set(entidad.entidad, entidad);
        }
      });
    });

    return entidades.size;
  }

  private getRiesgoConcursosQuiebrasCantidad12Meses(): number {
    // TODO: implement
    return 0;
  }

  private getRiesgoCantidadSinFondosNoPagados6Meses(): number {
    const causalSinFondo = this.chequesResponse.results.causales.find(
      (causal) => causal.causal === "SIN FONDOS"
    );

    return (
      causalSinFondo?.entidades.reduce((total, entidad) => {
        return total + entidad.detalle.length;
      }, 0) || 0
    );
  }

  private getRiesgoMontoSinFondosNoPagados6Meses(): number {
    const causalSinFondo = this.chequesResponse.results.causales.find(
      (causal) => causal.causal === "SIN FONDOS"
    );

    return (
      causalSinFondo?.entidades.reduce((total, entidad) => {
        return (
          total +
          entidad.detalle.reduce((total, detalle) => {
            return total + detalle.monto;
          }, 0)
        );
      }, 0) || 0
    );
  }

  private getRiesgoScore(): number {
    // TODO: implement
    return 0;
  }

  private getRiesgoProveedorEstado(): string {
    // TODO: implement
    return "";
  }

  private getRiesgoFacturasApocrifas(): boolean {
    // TODO: implement
    return false;
  }

  private getRiesgoDeudasFiscales(): boolean {
    // TODO: implement
    return false;
  }

  private getRiesgoPedidoQuebrasCantidad12Meses(): number {
    // TODO: implement
    return 0;
  }

  private getRiesgoPeorSituacionCon10Porciento12Mesas(): string {
    // TODO: implement
    return "";
  }

  private getRiesgoSectorActividadPrincipalDelEmpleador(): string {
    // TODO: implement
    return "";
  }

  private getRiesgoSujetoObligado(): string {
    if (this.sujetoObligadoResponse.length > 0) return "Posible SO";

    return "";
  }

  private getRiesgoPersonaExpuestaPoliticamente(): string {
    // TODO: implement
    return "";
  }

  private getRiesgoUltimaActualizacion(): Date {
    // TODO: implement
    return new Date();
  }
}
