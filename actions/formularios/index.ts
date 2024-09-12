"use server";

import Jotform from "jotform";
import { revalidatePath } from "next/cache";
import { Response } from "jotform/dist/types/response";

import { db } from "@/lib/db";
import { createEntidad, upsertEntidad } from "../entidad";
import { jotformParser } from "@/lib/jotform";
import { SubmittedForm } from "@prisma/client";
import { processSubmittedForm } from "../jotform";
import { JotformResponseContent } from "@/lib/jotform/types";

const jotformClient = new Jotform(process.env.JOTFORM_API_KEY);

export const getFormularios = async () => {
  return await db.submittedForm.findMany();
};

export const procesarFormulario = async (submittedForm: SubmittedForm) => {
  const { submissionId } = submittedForm;
  const submission = (await jotformClient.submission.get(
    submissionId.toString()!
  )) as Response<JotformResponseContent>;
  const formattedSubmission = jotformParser(submission);

  try {
    //await createEntidad(formattedSubmission);
    await upsertEntidad(formattedSubmission);
    await processSubmittedForm(submittedForm.id);
    revalidatePath("/formularios");
  } catch (err) {
    console.log("err", err);
    throw err;
    /**
     * TODO: Enviar algun tipo de notificacion via email o similar con el numero de submissionId
     */
  }
};
