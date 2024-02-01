import { JotformElement } from "../types";

export const extractBaseAnswer = (
  jotformElement: JotformElement<string>
): string => {
  return jotformElement.answer;
};
