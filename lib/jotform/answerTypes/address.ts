import { JotFormAddressAnswer, JotformElement } from "../types";

export const extractAddressAnswer = (
  jotformElement: JotformElement<JotFormAddressAnswer>
) => {
  if (!jotformElement.answer)
    return {
      direccion: "",
      ciudad: "",
      estado: "",
      codigoPostal: "",
      pais: "",
    };
  return {
    direccion: jotformElement.answer.addr_line1,
    ciudad: jotformElement.answer.city,
    estado: jotformElement.answer.state,
    codigoPostal: jotformElement.answer.postal,
    pais: jotformElement.answer.country,
  };
};
