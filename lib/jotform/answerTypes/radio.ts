import { JotformElement } from "../types";

export const extractRadioAnswer = (
  jotformElement: JotformElement<string>
): boolean | string => {
  if (jotformElement.answer?.toLowerCase() === "si") return true;
  if (jotformElement.answer?.toLowerCase() === "no") return false;
  return jotformElement.answer;
};
