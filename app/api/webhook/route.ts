import Jotform from "jotform";
import { NextRequest, NextResponse } from "next/server";
import { Response } from "jotform/dist/types/response";

import { db } from "@/lib/db";
import { jotformParser } from "@/lib/jotform";
import { createEntidad } from "@/actions/entidad/entidad";
import { JotformResponseContent } from "@/lib/jotform/types";
import { createSubmittedForm } from "@/actions/jotform/submittedForm";

const jotformClient = new Jotform(process.env.JOTFORM_API_KEY);

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const submissionId = data.get("submissionId");

  if (!submissionId)
    return NextResponse.json(
      { error: "There is no submissionId" },
      { status: 400 }
    );

  const submission = (await jotformClient.submission.get(
    submissionId.toString()!
  )) as Response<JotformResponseContent>;

  /**
   * TODO: Guardar la informacion del formId y el submissionId y ponerle como estado no preocesado
   *       Buscar la submission id en JotForm, procesarla, y guardarla en la base de datos. Si por algun motivo,
   *       falla y no se puede guardar, se podra hacer de forma manual. Si se procesa correctamente, se cambia el
   *       estado a procesada.
   */
  // await createSubmittedForm({
  //   formId: submission.content.form_id,
  //   submissionId: submissionId.toString(),
  // });

  const formattedSubmission = jotformParser(submission);

  await createEntidad(formattedSubmission);

  //const data = await request.formData();
  //console.log("formID", data.get("formID"));
  //console.log("submissionID", data.get("submissionID"));
  return NextResponse.json({ data: submission, parsed: formattedSubmission });
  //return NextResponse.json({ data: submission });
  return NextResponse.json({ success: true });
}
