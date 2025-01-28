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
