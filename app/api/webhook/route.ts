import Jotform from "jotform";
import { NextResponse } from "next/server";

const jotformClient = new Jotform(process.env.JOTFORM_API_KEY);

export async function POST(request: Request) {
  /**
   * TODO: Guardar la informacion del formId y el submissionId y ponerle como estado no preocesado
   *       Buscar la submission id en JotForm, procesarla, y guardarla en la base de datos. Si por algun motivo,
   *       falla y no se puede guardar, se podra hacer de forma manual. Si se procesa correctamente, se cambia el
   *       estado a procesada.
   */
  const submission = await jotformClient.submission.get("5825343381359658069");

  //const data = await request.formData();
  //console.log("formID", data.get("formID"));
  //console.log("submissionID", data.get("submissionID"));
  return NextResponse.json({ data: submission });
  return NextResponse.json({ success: true });
}
