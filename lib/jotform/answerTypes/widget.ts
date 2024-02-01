import { JotformElement, WidgetFieldName } from "../types";

export const extractWidgetAnswer = (jotformElement: JotformElement<string>) => {
  if (!jotformElement.answer || jotformElement.answer === "Accepted") return [];
  return JSON.parse(jotformElement.answer);
};

export const parseWidgetAnswer = (
  fieldName: WidgetFieldName,
  answers: any[]
) => {
  switch (fieldName) {
    case "dondeCotiza":
      return [];
    case "oficinasExterior":
    case "operacionesExterior":
      return parseExterior(answers);
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
    case "personasConInteresEconomicoAfa":
      return parsePersonaInteresEconomicoAfa(answers);
  }
};

const parseExterior = (answers: any[]) => {
  return answers.map((exterior) => exterior["Pais"]);
};

const parseRepresentantesLegales = (answers: any[]) => {
  return answers.map((representanteLegal) => ({
    tipo: "Representante Legal",
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
    tipo: "Empleado Ex AFA",
    nombreApellido: empleadoActualExAfa["Nombre y Apellido"],
    cargoEnAfa: empleadoActualExAfa["Cargo que ocupó en AFA"],
    fechaCargoEnAfa: empleadoActualExAfa["Desde fecha"]?.replaceAll("-", "/"),
  }));
};

const parseExEmpleadosActualesAfa = (answers: any[]) => {
  return answers.map((exEmpleadoActualAfa) => ({
    tipo: "Ex Empleado Actual AFA",
    nombreApellido: exEmpleadoActualAfa["Nombre y Apellido"],
    cargoEnAfa: exEmpleadoActualAfa["Cargo que ocupa en AFA"],
    fechaCargoEnAfa: exEmpleadoActualAfa[
      "Hasta que fecha trabajo en su empresa"
    ]?.replaceAll("-", "/"),
  }));
};

const parseFamiliaresComunAfa = (answers: any[]) => {
  return answers.map((familiarComunAfa) => ({
    tipo: "Familiar Comun AFA Entidad",
    nombreApellido: familiarComunAfa["Nombre y Apellido"],
    cargoEnAfa: familiarComunAfa["Cargo que ocupa en AFA"],
    fechaCargoEnAfa: familiarComunAfa["Desde fecha trabaja en AFA"]?.replaceAll(
      "-",
      "/"
    ),
  }));
};

const parsePersonaInteresEconomicoAfa = (answers: any[]) => {
  return answers.map((personaInteresEconomicoAfa) => ({
    tipo: "Personal Interes Economico AFA",
    nombreApellido: personaInteresEconomicoAfa["Nombre y Apellido"],
    tipoInteresAfa:
      personaInteresEconomicoAfa[
        "Describa brevemente el tipo de interes existente"
      ],
  }));
};

const parseAutoridadesSocietarias = (answers: any[]) => {
  return answers.map((autoridadSocietaria) => ({
    tipo: autoridadSocietaria["Tipo"],
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
    tipo: detallePropietario["Tipo"],
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
