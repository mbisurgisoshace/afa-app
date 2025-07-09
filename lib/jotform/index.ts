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
import { EXCLUDED_FIELDS } from "./excludedFields";
import { parseWidgetAnswer } from "./answerTypes/widget";
import { dbValueToPrismaEnumValue } from "../utils";
import {
  condicionIvaDbMapper,
  estadoCivilDbMapper,
  sexoDbMapper,
  tipoActividadDbMapper,
  tipoCuentaBancariaDbMapper,
  tipoDocumentoAfipDbMapper,
  tipoDocumentoDbMapper,
  tipoEntidadDbMapper,
  tipoPersonaInteresDbMapper,
  tipoRelacionDbMapper,
  tipoSocietarioDbMapper,
} from "@/lib/jotform/mapper";

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

      if (jotformElement.name === "dondeCotiza" && !isArray(formattedAnswer)) {
        formattedFormSubmission[jotformElement.name] = (
          formattedAnswer as string
        ).split("\n");

        return;
      }

      if (isArray(formattedAnswer)) {
        const formattedWidgetAnswer = parseWidgetAnswer(
          jotformElement.name as WidgetFieldName,
          formattedAnswer
        );

        if (
          jotformElement.name === "oficinasExterior" ||
          jotformElement.name === "vinculosOrganismos" ||
          jotformElement.name === "operacionesExterior" ||
          jotformElement.name === "descripcionConflictoAfa"
        ) {
          formattedFormSubmission[jotformElement.name] = formattedWidgetAnswer;
        } else {
          if (formattedWidgetAnswer) {
            formattedFormSubmission.personasInteres.push(
              ...formattedWidgetAnswer
            );
          }
        }

        return;
      }

      if (isObject(formattedAnswer)) {
        formattedFormSubmission = {
          ...formattedFormSubmission,
          ...formattedAnswer,
        };
        return;
      }

      formattedFormSubmission[jotformElement.name] = mapEnumAnswer(
        formattedAnswer,
        jotformElement.name
      );
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

const mapEnumAnswer = (answer: any, fieldName: string) => {
  switch (fieldName) {
    case "tipoRelacion":
      return dbValueToPrismaEnumValue(answer, tipoRelacionDbMapper);
    case "tipoActividad":
      return dbValueToPrismaEnumValue(answer, tipoActividadDbMapper);
    case "tipoDePersona":
      return dbValueToPrismaEnumValue(answer, tipoEntidadDbMapper);
    case "tipoCuentaBancaria":
      return dbValueToPrismaEnumValue(answer, tipoCuentaBancariaDbMapper);
    case "tipoSocietario":
      return dbValueToPrismaEnumValue(answer, tipoSocietarioDbMapper);
    case "tipoDocumento":
      return dbValueToPrismaEnumValue(answer, tipoDocumentoDbMapper);
    case "tipoDocumentoAfip":
      return dbValueToPrismaEnumValue(answer, tipoDocumentoAfipDbMapper);
    case "condicionIva":
      return dbValueToPrismaEnumValue(answer, condicionIvaDbMapper);
    case "sexo":
      return dbValueToPrismaEnumValue(answer, sexoDbMapper);
    case "estadoCivil":
      return dbValueToPrismaEnumValue(answer, estadoCivilDbMapper);
    default:
      return answer;
  }
};
