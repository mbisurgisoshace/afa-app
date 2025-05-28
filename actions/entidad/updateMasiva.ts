"use server";

import { upsertEntidad } from ".";

export interface EntidadData {
  "NOMBRE CLUB": string;
  "CONTACTO 1": string;
  "CONTACTO 2": string;
  "CONTACTO 3": string;
  "CUENTA CONTABLE": number;
}

export const updateMasiva = async (entidadData: EntidadData[]) => {
  for (const entidad of entidadData) {
    const data = {
      tipoRelacion: "CLUB",
      tipoDePersona: "CLUB",
      razonSocial: entidad["NOMBRE CLUB"],
      codigoEntidad: entidad["CUENTA CONTABLE"].toString(),
      complianceEmail1: entidad["CONTACTO 1"],
      complianceEmail2: entidad["CONTACTO 2"],
      complianceEmail3: entidad["CONTACTO 3"],
    };

    await upsertEntidad(data);
  }
};
