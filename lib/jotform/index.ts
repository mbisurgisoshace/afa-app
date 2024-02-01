import { isObject, isArray } from "lodash";

import { Response } from "jotform/dist/types/response";

import {
  JotformElement,
  JotformResponseContent,
  WidgetFieldName,
} from "@/lib/jotform/types";
import {
  extractBaseAnswer,
  extractPhoneAnswer,
  extractRadioAnswer,
  extractWidgetAnswer,
  extractAddressAnswer,
  extractDatetimeAnswer,
  extractFullnameAnswer,
} from "@/lib/jotform/answerTypes";
import { parseWidgetAnswer } from "./answerTypes/widget";
import { EXCLUDED_FIELDS } from "./excludedFields";

export const jotformParser = (
  jotformResponse: Response<JotformResponseContent>
) => {
  let formattedFormSubmission: any = {
    personasInteres: [],
  };

  Object.keys(jotformResponse.content.answers)
    .filter((key) => {
      const fieldName = jotformResponse.content.answers[key].name;
      return !EXCLUDED_FIELDS.includes(fieldName);
    })
    .forEach((key) => {
      const jotformElement = jotformResponse.content.answers[key];
      const formattedAnswer = extractAnswer(jotformElement);

      if (isArray(formattedAnswer)) {
        //TODO: Extraer cada respuesta de acuerdo al nombre del campo
        const formattedWidgetAnswer = parseWidgetAnswer(
          jotformElement.name as WidgetFieldName,
          formattedAnswer
        );

        //formattedFormSubmission.personasInteres.push(...formattedAnswer);
        formattedFormSubmission.personasInteres.push(...formattedWidgetAnswer);
        return;
      }

      if (isObject(formattedAnswer)) {
        formattedFormSubmission = {
          ...formattedFormSubmission,
          ...formattedAnswer,
        };
        return;
      }

      formattedFormSubmission[jotformElement.name] = formattedAnswer;
    });

  return formattedFormSubmission;
};

const extractAnswer = (jotformElement: JotformElement<any>) => {
  switch (jotformElement.type) {
    case "control_email":
    case "control_textbox":
    case "control_dropdown":
      return extractBaseAnswer(jotformElement);
    case "control_phone":
      return extractPhoneAnswer(jotformElement);
    case "control_radio":
      return extractRadioAnswer(jotformElement);
    case "control_widget":
      return extractWidgetAnswer(jotformElement);
    case "control_fullname":
      return extractFullnameAnswer(jotformElement);
    case "control_datetime":
      return extractDatetimeAnswer(jotformElement);
    case "control_address":
      return extractAddressAnswer(jotformElement);
  }
};
