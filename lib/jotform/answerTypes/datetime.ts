import { formatDate } from "@/lib/utils";
import { JotformDatetimeAnswer, JotformElement } from "../types";

export const extractDatetimeAnswer = (
  jotformElement: JotformElement<JotformDatetimeAnswer>
): string | undefined => {
  if (!jotformElement.answer) return undefined;
  return (
    formatDate(
      `${jotformElement.answer.day}/${jotformElement.answer.month}/${jotformElement.answer.year}`
    ) || ""
  );
};
