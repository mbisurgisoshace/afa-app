import { JotformElement } from "../types";

export const extractRadioAnswer = (
  jotformElement: JotformElement<string>
): boolean | string => {
  if (
    jotformElement.name === "decJuradaBeneficiarios" &&
    jotformElement.answer ===
      "Declaro bajo juramento que no existen otros beneficiarios finales que los anteriormente detallados"
  )
    return true;
  if (
    jotformElement.name === "decJuradaBeneficiarios" &&
    jotformElement.answer !==
      "Declaro bajo juramento que no existen otros beneficiarios finales que los anteriormente detallados"
  )
    return false;
  if (jotformElement.answer?.toLowerCase() === "si") return true;
  if (jotformElement.answer?.toLowerCase() === "no") return false;
  return jotformElement.answer;
};
