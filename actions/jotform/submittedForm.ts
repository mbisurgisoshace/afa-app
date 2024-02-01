"use server";

import { db } from "@/lib/db";
import { SubmittedForm } from "@prisma/client";

export const createSubmittedForm = async (
  submittedForm: SubmittedForm
): Promise<SubmittedForm> => {
  return await db.submittedForm.create({
    data: submittedForm,
  });
};

export const processSubmittedForm = async (id: string) => {
  await db.submittedForm.update({
    where: { id },
    data: { procesado: true },
  });
};
