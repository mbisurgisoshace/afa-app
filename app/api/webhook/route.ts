import Jotform from "jotform";
import { NextRequest, NextResponse } from "next/server";
import { Response } from "jotform/dist/types/response";

import { db } from "@/lib/db";
import { jotformParser } from "@/lib/jotform";
import { createEntidad } from "@/actions/entidad/entidad";
import { JotformResponseContent } from "@/lib/jotform/types";
import {
  createSubmittedForm,
  processSubmittedForm,
} from "@/actions/jotform/submittedForm";

const jotformClient = new Jotform(process.env.JOTFORM_API_KEY);

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const submissionId = data.get("submissionID");

  if (!submissionId)
    return NextResponse.json(
      { error: "There is no submissionId" },
      { status: 400 }
    );

  const submission = (await jotformClient.submission.get(
    submissionId.toString()!
  )) as Response<JotformResponseContent>;

  const submittedForm = await createSubmittedForm({
    formId: submission.content.form_id,
    submissionId: submissionId.toString(),
  });

  const formattedSubmission = jotformParser(submission);

  try {
    await createEntidad(formattedSubmission);
    await processSubmittedForm(submittedForm.id);
  } catch (err) {
    console.log("err", err);

    /**
     * TODO: Enviar algun tipo de notificacion via email o similar con el numero de submissionId
     */
  }

  return NextResponse.json({ data: submission, parsed: formattedSubmission });
  return NextResponse.json({ success: true });
}
