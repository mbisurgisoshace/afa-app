type JotformAnswerType =
  | "control_email"
  | "control_phone"
  | "control_radio"
  | "control_widget"
  | "control_address"
  | "control_textbox"
  | "control_datetime"
  | "control_fullname"
  | "control_dropdown";
type JotformSubmissionStatus = "ACTIVE" | "DELETED";

export type WidgetFieldName =
  | "dondeCotiza"
  | "directivosClub"
  | "oficinasExterior"
  | "vinculosOrganismos"
  | "operacionesExterior"
  | "representatesLegales"
  | "exEmpleadosActualAfa"
  | "familiaresComunEnAfa"
  | "detalleDePropietarios"
  | "autoridadesSocietarias"
  | "empleadosActualesExAfa"
  | "descripcionConflictoAfa"
  | "personasConInteresEconomicoAfa";

export type JotformPhoneAnswer = {
  full: string;
};

export type JotformFullnameAnswer = {
  first: string;
  middle: string;
  last: string;
};

export type JotformDatetimeAnswer = {
  day: string;
  month: string;
  year: string;
};

export type JotFormAddressAnswer = {
  addr_line1: string;
  city: string;
  state: string;
  postal: string;
  country: string;
};

export interface JotformElement<AnswerType> {
  name: string;
  answer: AnswerType;
  type: JotformAnswerType;
}

export type JotformResponseContent = {
  id: string;
  form_id: string;
  created_at: string;
  status: JotformSubmissionStatus;
  answers: Record<string, JotformElement<any>>;
};
