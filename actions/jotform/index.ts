"use server";

import { z } from "zod";
import { SubmittedForm } from "@prisma/client";

import { db } from "@/lib/db";
import { CreateSubmittedFormSchema } from "@/schemas";

export const createSubmittedForm = async (
  submittedForm: z.infer<typeof CreateSubmittedFormSchema>
): Promise<SubmittedForm> => {
  return await db.submittedForm.create({
    data: submittedForm,
  });
};

export const processSubmittedForm = async (id: string) => {
  await db.submittedForm.update({
    where: {
      id,
    },
    data: { procesado: true },
  });
};
