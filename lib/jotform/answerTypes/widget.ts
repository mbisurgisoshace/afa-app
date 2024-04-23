import { tipoPersonaInteresDbMapper } from "@/lib/jotform/mapper";
import { dbValueToPrismaEnumValue, formatDate } from "@/lib/utils";
import { JotformElement, WidgetFieldName } from "@/lib/jotform/types";

export const extractWidgetAnswer = (jotformElement: JotformElement<string>) => {
  if (!jotformElement.answer) return [];

  if (jotformElement.name === "dondeCotiza") return jotformElement.answer;

  return JSON.parse(jotformElement.answer);
};

export const parseWidgetAnswer = (
  fieldName: WidgetFieldName,
  answers: any[]
) => {
  switch (fieldName) {
    case "dondeCotiza":
      return [];
    case "directivosClub":
      return parseDirectivosClub(answers);
    case "oficinasExterior":
    case "operacionesExterior":
      return parseExterior(answers);
    case "vinculosOrganismos":
      return parseOrganismos(answers);
    case "familiaresComunEnAfa":
      return parseFamiliaresComunAfa(answers);
    case "representatesLegales":
      return parseRepresentantesLegales(answers);
    case "exEmpleadosActualAfa":
      return parseExEmpleadosActualesAfa(answers);
    case "detalleDePropietarios":
      return parseDetallePropietarios(answers);
    case "autoridadesSocietarias":
      return parseAutoridadesSocietarias(answers);
    case "empleadosActualesExAfa":
      return parseEmpleadosActualesExAfa(answers);
    case "descripcionConflictoAfa":
      return parseDescripcionesConflicto(answers);
    case "personasConInteresEconomicoAfa":
      return parsePersonaInteresEconomicoAfa(answers);
  }
};

const parseExterior = (answers: any[]) => {
  return answers.map((exterior) => exterior["Pais"]);
};

const parseOrganismos = (answers: any[]) => {
  return answers.map((organismo) => organismo["Organismo"]);
};

const parseDescripcionesConflicto = (answers: any[]) => {
  return answers.map(
    (conflictoInteres) =>
      conflictoInteres["Descripcion del conflicto de interés"]
  );
};

const parseRepresentantesLegales = (answers: any[]) => {
  return answers.map((representanteLegal) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      "Representante Legal",
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: representanteLegal["Nombre y Apellido"],
    documento: representanteLegal["D.N.I. / C.U.I.T."],
    telefono: representanteLegal["Teléfono"],
    email: representanteLegal["Correo electrónico"],
    expuestaPoliticamente:
      representanteLegal["¿Es Persona Expuesta Políticamente?"] === "Si",
    esPepEnCaracterDe: representanteLegal["Es PEP en carácter de"],
  }));
};

const parseEmpleadosActualesExAfa = (answers: any[]) => {
  return answers.map((empleadoActualExAfa) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      "Empleado Ex AFA",
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: empleadoActualExAfa["Nombre y Apellido"],
    cargoEnAfa: empleadoActualExAfa["Cargo que ocupó en AFA"],
    fechaCargoEnAfa: formatDate(
      empleadoActualExAfa["En que fecha ingreso en su empresa"]?.replaceAll(
        "-",
        "/"
      )
    ),
  }));
};

const parseExEmpleadosActualesAfa = (answers: any[]) => {
  return answers.map((exEmpleadoActualAfa) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      "Ex Empleado Actual AFA",
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: exEmpleadoActualAfa["Nombre y Apellido"],
    cargoEnAfa: exEmpleadoActualAfa["Cargo que ocupa en AFA"],
    fechaCargoEnAfa: formatDate(
      exEmpleadoActualAfa["Hasta que fecha trabajo en su empresa"]?.replaceAll(
        "-",
        "/"
      )
    ),
  }));
};

const parseFamiliaresComunAfa = (answers: any[]) => {
  return answers.map((familiarComunAfa) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      "Familiar Comun AFA Entidad",
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: familiarComunAfa["Nombre y Apellido"],
    cargoEnAfa: familiarComunAfa["Cargo que ocupa en AFA"],
    fechaCargoEnAfa: formatDate(
      familiarComunAfa["Desde fecha trabaja en AFA"]?.replaceAll("-", "/")
    ),
  }));
};

const parsePersonaInteresEconomicoAfa = (answers: any[]) => {
  return answers.map((personaInteresEconomicoAfa) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      "Personal Interes Economico AFA",
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: personaInteresEconomicoAfa["Nombre y Apellido"],
    tipoInteresAfa:
      personaInteresEconomicoAfa[
        "Describa brevemente el tipo de interes existente"
      ],
  }));
};

const parseAutoridadesSocietarias = (answers: any[]) => {
  return answers.map((autoridadSocietaria) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      autoridadSocietaria["Tipo"],
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: autoridadSocietaria["Nombre y Apellido"],
    documento: autoridadSocietaria["D.N.I. / C.U.I.T."],
    telefono: autoridadSocietaria["Teléfono"],
    email: autoridadSocietaria["Correo electrónico"],
    expuestaPoliticamente:
      autoridadSocietaria["¿Es Persona Expuesta Políticamente?"] === "Si",
    esPepEnCaracterDe: autoridadSocietaria["Es PEP en carácter de"],
  }));
};

const parseDetallePropietarios = (answers: any[]) => {
  return answers.map((detallePropietario) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      detallePropietario["Tipo"],
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: detallePropietario["Nombre y Apellido"],
    documento: detallePropietario["D.N.I. / C.U.I.T."],
    telefono: detallePropietario["Teléfono"],
    email: detallePropietario["Correo electrónico"],
    porcentajeAccionario: detallePropietario["% accionario"],
    expuestaPoliticamente:
      detallePropietario["Es Persona Expuesta Políticamente ?"] === "Si",
    esPepEnCaracterDe: detallePropietario["Es PEP en carácter de"],
  }));
};

const parseDirectivosClub = (answers: any[]) => {
  return answers.map((directivoClub) => ({
    tipoPersonaInteres: dbValueToPrismaEnumValue(
      directivoClub["Cargo"],
      tipoPersonaInteresDbMapper
    ),
    nombreApellido: directivoClub["Nombre y Apellido"],
    documento: directivoClub["D.N.I. / C.U.I.T."],
    telefono: directivoClub["Teléfono"],
    email: directivoClub["Correo electrónico"],
    fechaCargoEnAfa: formatDate(
      directivoClub["Ocupo el cargo DESDE"]?.replaceAll("-", "/")
    ),
    expuestaPoliticamente:
      directivoClub["Es Persona Expuesta Políticamente ?"] === "Si",
    esPepEnCaracterDe: directivoClub["Cargo que ocupa u ocupó en el estado"],
  }));
};
