import { JotformElement, JotformPhoneAnswer } from "../types";

export const extractPhoneAnswer = (
  jotformElement: JotformElement<JotformPhoneAnswer>
): string => {
  if (!jotformElement.answer) return "";
  return jotformElement.answer.full;
};
