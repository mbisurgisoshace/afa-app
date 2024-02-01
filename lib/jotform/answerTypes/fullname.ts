import { JotformElement, JotformFullnameAnswer } from "../types";

export const extractFullnameAnswer = (
  jotformElement: JotformElement<JotformFullnameAnswer>
): string => {
  if (!jotformElement.answer) return "";
  return `${jotformElement.answer.first} ${jotformElement.answer.middle} ${jotformElement.answer.last}`;
};
