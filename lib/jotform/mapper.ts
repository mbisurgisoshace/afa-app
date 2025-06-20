import {
  TipoEntidad,
  CondicionIva,
  TipoRelacion,
  TipoActividad,
  TipoDocumento,
  TipoDocumentoAfip,
  TipoPersonaInteres,
  TipoCuentaBancaria,
  TipoSocietario,
  Sexo,
  EstadoCivil,
} from "@prisma/client";

export type Mapper<I, O> = Record<keyof I, O>;

export const sexoDbMapper = {
  Masculino: Sexo.MASCULINO,
  Femenino: Sexo.FEMENINO,
};

export const estadoCivilDbMapper = {
  "Soltero/a": EstadoCivil.SOLTERO_A,
  "Casado/a": EstadoCivil.CASADO_A,
  "Divorciado/a": EstadoCivil.DIVORCIADO_A,
  "Viudo/a": EstadoCivil.VIUDO_A,
  "Concubino/a": EstadoCivil.CONCUBINO_A,
};

export const tipoActividadDbMapper = {
  Comercial: TipoActividad.COMERCIAL,
  Industrial: TipoActividad.INDUSTRIAL,
  Produccion: TipoActividad.PRODUCCION,
};

export const condicionIvaDbMapper = {
  "Responsable Inscripto": CondicionIva.RESPONSABLE_INSCRIPTO,
  "Responsable Monotributo": CondicionIva.RESPONSABLE_MONOTRIBUTO,
  Exento: CondicionIva.EXENTO,
  "IVA Exento": CondicionIva.IVA_EXENTO,
  "Ganancias Exento": CondicionIva.GANANCIAS_EXENTO,
  "Sujeto emisor Factura A con Leyenda":
    CondicionIva.SUJETO_EMISOR_FACTURA_A_LEYENDA,
};

export const tipoEntidadDbMapper = {
  Club: TipoEntidad.CLUB,
  Humana: TipoEntidad.HUMANA,
  Juridica: TipoEntidad.JURIDICA,
  "Organismo Publico": TipoEntidad.ORGANISMO_PUBLICO,
  "Fundacion o Asociacion Civil": TipoEntidad.FUNDACION_ASOCIACION_CIVIL,
  Fideicomiso: TipoEntidad.FIDEICOMISO,
  Otra: TipoEntidad.OTROS,
};

export const tipoCuentaBancariaDbMapper = {
  "Caja de Ahorro en pesos": TipoCuentaBancaria.CAJA_AHORRO_PESOS,
  "Cuenta corriente en Pesos": TipoCuentaBancaria.CUENTA_CORRIENTE_PESOS,
  "Cuenta unica": TipoCuentaBancaria.CUENTA_UNICA,
  "Caja de Ahorro en dolares": TipoCuentaBancaria.CAJA_AHORRO_DOLARES,
  "Cuenta corriente en dolares": TipoCuentaBancaria.CUENTA_CORRIENTE_DOLARES,
  Otra: TipoCuentaBancaria.OTRA,
};

export const tipoSocietarioDbMapper = {
  "Sociedad Anonima": TipoSocietario.SOCIEDAD_ANONIMA,
  "Sociedad Anonima con participacion estatal mayoritaria":
    TipoSocietario.SOCIEDAD_ANONIMA_PARTICIPACION_ESTATAL,
  "Sociedad Colectiva": TipoSocietario.SOCIEDAD_COLECTIVA,
  "Sociedad de Capital e Industria": TipoSocietario.SOCIEDAD_CAPITAL_INDUSTRIA,
  "Sociedad de hecho": TipoSocietario.SOCIEDAD_HECHO,
  "Sociedad de Responsabilidad Limitada":
    TipoSocietario.SOCIEDAD_RESPONSABILIDAD_LIMITADA,
  "Sociedad en comandita por acciones":
    TipoSocietario.SOCIEDAD_COMANDITA_ACCIONES,
  "Asociacion Civil": TipoSocietario.ASOCIACION_CIVIL,
  Otra: TipoSocietario.OTRA,
};

export const tipoDocumentoDbMapper = {
  DNI: TipoDocumento.DNI,
  DU: TipoDocumento.DU,
  CI: TipoDocumento.CI,
  "Libreta Enloramiento": TipoDocumento.LIBRETA_ENROLAMIENTO,
  Pasaporte: TipoDocumento.PASAPORTE,
};

export const tipoRelacionDbMapper = {
  Proveedor: TipoRelacion.PROVEEDOR,
  Sponsor: TipoRelacion.SPONSOR,
  "Agente Comercial": TipoRelacion.AGENTE_COMERCIAL,
  Club: TipoRelacion.CLUB,
};

export const tipoDocumentoAfipDbMapper = {
  "C.U.I.T.": TipoDocumentoAfip.CUIT,
  "C.U.I.L.": TipoDocumentoAfip.CUIL,
};

export const tipoPersonaInteresDbMapper = {
  Presidente: TipoPersonaInteres.PRESIDENTE,
  "Socio Gerente": TipoPersonaInteres.SOCIO_GERENTE,
  Director: TipoPersonaInteres.DIRECTOR,
  Apoderado: TipoPersonaInteres.APODERADO,
  "Representante Legal": TipoPersonaInteres.REPRESENTANTE_LEGAL,
  Socio: TipoPersonaInteres.SOCIO,
  Accionista: TipoPersonaInteres.ACCIONISTA,
  "Beneficiario Final": TipoPersonaInteres.BENEFICIARIO_FINAL,
  "Empleado Ex AFA": TipoPersonaInteres.EMPLEADO_EX_AFA,
  "Ex Empleado Actual AFA": TipoPersonaInteres.EX_EMPLEADO_ACTUAL_AFA,
  "Familiar Comun AFA Entidad": TipoPersonaInteres.FAMILIAR_COMUN_AFA_ENTIDAD,
  "Personal Interes Economico AFA":
    TipoPersonaInteres.PERSONAL_INTERES_ECONOMICO_AFA,
  Otro: TipoPersonaInteres.OTRO,
  Secretario: TipoPersonaInteres.SECRETARIO,
  Vicepresidente: TipoPersonaInteres.VICEPRESIDENTE,
  Tesorero: TipoPersonaInteres.TESORERO,
  Vocal: TipoPersonaInteres.VOCAL,
};
