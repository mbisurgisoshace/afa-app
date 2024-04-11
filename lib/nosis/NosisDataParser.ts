import { NosisTexto } from "./NosisTexto";
import { NosisEntero } from "./NosisEntero";
import { NosisMoneda } from "./NosisMoneda";
import { NosisBooleano } from "./NosisBooleano";

type VariableNosis = {
  Nombre: string;
  Valor: string;
  Descripcion: string;
  Tipo: string;
  FechaAct?: string;
};

export interface NosisDataResponse {
  Contenido: {
    Resultado: {
      Estado: number;
    };
    Datos: {
      Variables: VariableNosis[];
    };
  };
}

export default class NosisDataParser {
  private peorSituacion: NosisTexto;
  private cantidadBancos: NosisEntero;
  private montoTotal: NosisMoneda;
  private antiguedadBCRA: NosisEntero;
  private peorSituacion12Meses: NosisTexto;
  private cantidadBancos12Meses: NosisEntero;
  private perfilCumplimientoDeudor: NosisEntero;
  private esMoroso: NosisBooleano;
  private cantidadSinFondosNoPagados6Meses: NosisEntero;
  private montoSinFondosNoPagados6Meses: NosisMoneda;
  private juiciosCantidad12Meses: NosisEntero;
  private concursosQuiebrasCantidad12Meses: NosisEntero;
  private score: NosisEntero;
  private facturacionEstimada: NosisEntero;
  private proveedorEstado: NosisTexto;
  private facturasApocrifas: NosisBooleano;
  private deudasFiscales: NosisBooleano;
  private pedidoQuebrasCantidad12Meses: NosisEntero;
  private peorSituacionCon10Porciento12Mesas: NosisTexto;
  private sectorActividadPrincipalDelEmpleador: NosisTexto;
  private sujetoObligado: NosisTexto;
  private personaExpuestaPoliticamente: NosisTexto;
  private cantidadHomonimosEnBaseLaFt: NosisEntero;
  private enlanceHomonimosEnBaseLaFt: NosisTexto;
  private peorSituacion12MesesBcra: NosisTexto;

  constructor(nosisDataResponse: NosisDataResponse) {
    const CI_Vig_PeorSit = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "CI_Vig_PeorSit"
    )!;
    this.peorSituacion = new NosisTexto(CI_Vig_PeorSit.Valor);

    const CI_Vig_Total_CantBco =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "CI_Vig_Total_CantBcos"
      )!;
    this.cantidadBancos = new NosisEntero(CI_Vig_Total_CantBco.Valor);

    const CI_Vig_Total_Monto = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "CI_Vig_Total_Monto"
    )!;
    this.montoTotal = new NosisMoneda(CI_Vig_Total_Monto.Valor);

    const CI_Antiguedad = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "CI_Antiguedad"
    )!;
    this.antiguedadBCRA = new NosisEntero(CI_Antiguedad.Valor);

    const CI_12m_PeorSit = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "CI_12m_PeorSit"
    )!;
    this.peorSituacion12Meses = new NosisTexto(CI_12m_PeorSit.Valor);

    const CI_12m_Total_CantBcos =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "CI_12m_Total_CantBcos"
      )!;
    this.cantidadBancos12Meses = new NosisEntero(CI_12m_Total_CantBcos.Valor);

    const VR_12m_Cumplimiento =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "VR_12m_Cumplimiento"
      )!;
    this.perfilCumplimientoDeudor = new NosisEntero(VR_12m_Cumplimiento.Valor);

    const DX_Es = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "DX_Es"
    )!;
    this.esMoroso = new NosisBooleano(DX_Es.Valor);

    const HC_6m_SF_NoPag_Cant =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "HC_6m_SF_NoPag_Cant"
      )!;
    this.cantidadSinFondosNoPagados6Meses = new NosisEntero(
      HC_6m_SF_NoPag_Cant.Valor
    );

    const HC_6m_SF_NoPag_Monto =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "HC_6m_SF_NoPag_Monto"
      )!;
    this.montoSinFondosNoPagados6Meses = new NosisMoneda(
      HC_6m_SF_NoPag_Monto.Valor
    );

    const JU_12m_RZ_Cant = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "JU_12m_RZ_Cant"
    )!;
    this.juiciosCantidad12Meses = new NosisEntero(JU_12m_RZ_Cant.Valor);

    const CQ_12m_RZ_Cant = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "CQ_12m_RZ_Cant"
    )!;
    this.concursosQuiebrasCantidad12Meses = new NosisEntero(
      CQ_12m_RZ_Cant.Valor
    );

    const SCO_Vig = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "SCO_Vig"
    )!;
    this.score = new NosisEntero(SCO_Vig.Valor);

    const FE = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "FE"
    )!;
    this.facturacionEstimada = new NosisEntero(FE.Valor);

    const PE_Proveedor_Es = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "PE_Proveedor_Es"
    )!;
    this.proveedorEstado = new NosisTexto(PE_Proveedor_Es.Valor);

    const FA_Tiene = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "FA_Tiene"
    )!;
    this.facturasApocrifas = new NosisBooleano(FA_Tiene.Valor);

    const DF_Tiene = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "DF_Tiene"
    )!;
    this.deudasFiscales = new NosisBooleano(DF_Tiene.Valor);

    const PQ_12m_Cant = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "PQ_12m_Cant"
    )!;
    this.pedidoQuebrasCantidad12Meses = new NosisEntero(PQ_12m_Cant.Valor);

    const CI_12m_PeorSit_Porc =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "CI_12m_PeorSit_Porc"
      )!;
    this.peorSituacionCon10Porciento12Mesas = new NosisTexto(
      CI_12m_PeorSit_Porc.Valor
    );

    const VR_Relaciones_Detalle =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "VR_Relaciones_Detalle"
      )!;

    const VI_Empleador_Act01_Sector =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "VI_Empleador_Act01_Sector"
      )!;
    this.sectorActividadPrincipalDelEmpleador = new NosisTexto(
      VI_Empleador_Act01_Sector.Valor
    );

    const Com_SO_Es = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "Com_SO_Es"
    )!;
    this.sujetoObligado = new NosisTexto(Com_SO_Es.Valor);

    const Com_PEP_Es = nosisDataResponse.Contenido.Datos.Variables.find(
      (variable) => variable.Nombre === "Com_PEP_Es"
    )!;
    this.personaExpuestaPoliticamente = new NosisTexto(Com_PEP_Es.Valor);

    const Com_Homonimos_LAFT_Cant =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "Com_Homonimos_LAFT_Cant"
      )!;
    this.cantidadHomonimosEnBaseLaFt = new NosisEntero(
      Com_Homonimos_LAFT_Cant.Valor
    );

    const Com_Homonimos_LAFT_Link =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "Com_Homonimos_LAFT_Link"
      )!;
    this.enlanceHomonimosEnBaseLaFt = new NosisTexto(
      Com_Homonimos_LAFT_Link.Valor
    );

    const CI_12m_PeorSit_BCRA =
      nosisDataResponse.Contenido.Datos.Variables.find(
        (variable) => variable.Nombre === "CI_12m_PeorSit_BCRA"
      )!;
    this.peorSituacion12MesesBcra = new NosisTexto(CI_12m_PeorSit_BCRA.Valor);
  }

  getParsedData() {
    return {
      nosisPeorSituacion: this.peorSituacion.getValue(),
      nosisCantidadBancos: this.cantidadBancos.getValue(),
      nosisMontoTotal: this.montoTotal.getValue(),
      nosisAntiguedadBCRA: this.antiguedadBCRA.getValue(),
      nosisPeorSituacion12Meses: this.peorSituacion12Meses.getValue(),
      nosisCantidadBancos12Meses: this.cantidadBancos12Meses.getValue(),
      nosisPerfilCumplimientoDeudor: this.perfilCumplimientoDeudor.getValue(),
      nosisEsMoroso: this.esMoroso.getValue(),
      nosisCantidadSinFondosNoPagados6Meses:
        this.cantidadSinFondosNoPagados6Meses.getValue(),
      nosisMontoSinFondosNoPagados6Meses:
        this.montoSinFondosNoPagados6Meses.getValue(),
      nosisJuiciosCantidad12Meses: this.juiciosCantidad12Meses.getValue(),
      nosisConcursosQuiebrasCantidad12Meses:
        this.concursosQuiebrasCantidad12Meses.getValue(),
      nosisScore: this.score.getValue(),
      nosisFacturacionEstimada: this.facturacionEstimada.getValue(),
      nosisProveedorEstado: this.proveedorEstado.getValue(),
      nosisFacturasApocrifas: this.facturasApocrifas.getValue(),
      nosisDeudasFiscales: this.deudasFiscales.getValue(),
      nosisPedidoQuebrasCantidad12Meses:
        this.pedidoQuebrasCantidad12Meses.getValue(),
      nosisPeorSituacionCon10Porciento12Mesas:
        this.peorSituacionCon10Porciento12Mesas.getValue(),
      nosisSectorActividadPrincipalDelEmpleador:
        this.sectorActividadPrincipalDelEmpleador.getValue(),
      nosisSujetoObligado: this.sujetoObligado.getValue(),
      nosisPersonaExpuestaPoliticamente:
        this.personaExpuestaPoliticamente.getValue(),
      nosisCantidadHomonimosEnBaseLaFt:
        this.cantidadHomonimosEnBaseLaFt.getValue(),
      nosisEnlanceHomonimosEnBaseLaFt:
        this.enlanceHomonimosEnBaseLaFt.getValue(),
      nosisPeorSituacion12MesesBcra: this.peorSituacion12MesesBcra.getValue(),
    };
  }
}
