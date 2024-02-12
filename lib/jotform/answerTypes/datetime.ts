import { formatDate } from "@/lib/utils";
import { JotformDatetimeAnswer, JotformElement } from "../types";

export const extractDatetimeAnswer = (
  jotformElement: JotformElement<JotformDatetimeAnswer>
): string => {
  if (!jotformElement.answer) return "";
  return (
    formatDate(
      `${jotformElement.answer.day}/${jotformElement.answer.month}/${jotformElement.answer.year}`
    ) || ""
  );
};
