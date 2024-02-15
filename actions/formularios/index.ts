"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getFormularios = async () => {
  return await db.submittedForm.findMany();
};

export const procesarFormulario = async (submissionId: string) => {
  revalidatePath("/formularios");
};
