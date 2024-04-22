export const peorSituacionValue = (value: string) => {
  if (!value) return "";

  switch (value) {
    case "1":
      return "En situación normal (atraso hasta 31 días).";
    case "2":
      return "Con seguimiento especial / Riesgo bajo (atraso de 31 a 90 días).";
    case "3":
      return "Con problemas / Riesgo medio (atraso de 91 a 180 días).";
    case "4":
      return "Con alto riesgo de insolvencia / Riesgo alto (atraso de 181 a 365 días).";
    case "5":
      return "Irrecuperable (Atraso de más de 365 días).";
    case "6":
      return "Irrecuperable por disposición técnica (Morosos de ex Entidades Financieras, con atraso de más de 180 días).";
    case "0":
      return "Sin Datos";
    default:
      return "Sin Datos";
  }
};

export const perfilCumplimientoDeudorValue = (value: number) => {
  if (!value) return "";

  switch (value) {
    case 1:
      return "No tiene ninguna información negativa.";
    case -1:
      return "Tiene alguna información negativa.";
    case 0:
      return "No tiene ninguna información crediticia.";
    default:
      return "No tiene ninguna información crediticia.";
  }
};
