"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { updateTablaStatus } from "../settings";

export interface CuitApocrifoData {
  CUIT: string;
  " Descripcion ": string;
  " Fecha Condicion Apocrifo": string;
  " Fecha Publicacion": string;
}

export const updateCuitsApocrifos = async (
  cuitsApocrifosData: CuitApocrifoData[]
) => {
  const session = await auth();

  if (!session) {
    return;
  }

  const cuitsApocrifos = cuitsApocrifosData.map((data) => {
    return {
      cuit: data.CUIT,
      descripcion: data[" Descripcion "],
      fechaCondicionApocrifo: formatDate(data[" Fecha Condicion Apocrifo"])!,
      fechaPublicacion: formatDate(data[" Fecha Publicacion"])!,
    };
  });

  await db.cuitApocrifo.deleteMany();
  await db.cuitApocrifo.createMany({
    data: cuitsApocrifos,
  });

  await updateTablaStatus("cuit-apocrifos");
};
