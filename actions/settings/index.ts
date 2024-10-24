"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getTablasStatus = async () => {
  const session = await auth();

  if (!session) {
    return [];
  }

  return await db.tablaStatus.findMany();
};

export const updateTablaStatus = async (tabla: string) => {
  const session = await auth();

  if (!session) {
    return;
  }

  await db.tablaStatus.upsert({
    where: {
      tabla: tabla,
    },
    create: {
      tabla: tabla,
    },
    update: {
      tabla: tabla,
    },
  });

  revalidatePath("/settings");
};
