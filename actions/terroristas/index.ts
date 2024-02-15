"use server";

import { PersonaTerrorista } from "@prisma/client";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const API_TERRORISTAS_ENTIDADES = "https://repet.jus.gob.ar/xml/entidades.json";
const API_TERRORISTAS_INDIVIDUOS = "https://repet.jus.gob.ar/xml/personas.json";

export const updateTerroristas = async () => {
  const session = await auth();

  if (!session) {
    return;
  }

  const responseEntidades = await fetch(API_TERRORISTAS_ENTIDADES);
  const responseIndividuos = await fetch(API_TERRORISTAS_INDIVIDUOS);

  const responseDataEntidades = await responseEntidades.json();
  const responseDataIndividuos = await responseIndividuos.json();

  const terroristasEntidades: PersonaTerrorista[] = responseDataEntidades.map(
    (data: any) => {
      return {
        dataId: data["DATAID"],
        nombre: data["FIRST_NAME"],
        comments: data["COMMENTS1"],
        organizacion: data["UN_LIST_TYPE"],
        desde: formatDate(data["LISTED_ON"]),
      };
    }
  );

  const terroristasIndividuos: PersonaTerrorista[] = responseDataIndividuos.map(
    (data: any) => {
      return {
        dataId: data["DATAID"],
        nombre: `${data["FIRST_NAME"]} ${data["SECOND_NAME"]} ${data["THIRD_NAME"]}`,
        comments: data["COMMENTS1"],
        organizacion: data["UN_LIST_TYPE"],
        desde: formatDate(data["LISTED_ON"]),
      };
    }
  );

  for (const terrorista of terroristasEntidades) {
    await db.personaTerrorista.upsert({
      where: {
        dataId: terrorista.dataId,
      },
      update: {
        ...terrorista,
      },
      create: {
        ...terrorista,
      },
    });
  }

  for (const terrorista of terroristasIndividuos) {
    await db.personaTerrorista.upsert({
      where: {
        dataId: terrorista.dataId,
      },
      update: {
        ...terrorista,
      },
      create: {
        ...terrorista,
      },
    });
  }

  console.log("Done");
};
