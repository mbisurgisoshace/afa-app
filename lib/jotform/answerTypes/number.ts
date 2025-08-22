import { JotformElement, JotformNumberAnswer } from "../types";

export const extractNumber = (jotformElement: JotformElement<any>): number => {
  if (!jotformElement.answer) return 0;
  return parseFloat(jotformElement.answer);
};
