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

export default class BcraDataParser {
  private bcraResponse: BcraDataResponse;
  private bcraHistoricoResponse: BcraDataResponse;
  private chequesResponse: BcraResultChequesResponse;

  constructor(
    bcraResponse: BcraDataResponse,
    bcraHistoricoResponse: BcraDataResponse,
    chequesResponse: BcraResultChequesResponse
  ) {
    this.bcraResponse = bcraResponse;
    this.chequesResponse = chequesResponse;
    this.bcraHistoricoResponse = bcraHistoricoResponse;
  }

  getParsedData() {}
}
