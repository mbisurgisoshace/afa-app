"use server";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/utils";

export const createSolicitud = async (codigoEntidad: string) => {
  const entidad = await db.entidad.findUnique({ where: { codigoEntidad } });

  if (entidad) {
    const {
      complianceEmail1,
      complianceEmail2,
      compliancePersona1,
      compliancePersona2,
    } = entidad;

    const primerDigitoCodigoEntidad = parseInt(codigoEntidad[0], 10);
    const jotformBaseUrl =
      primerDigitoCodigoEntidad === 1
        ? process.env.JOTFORM_LINK_SOLICITUD_CLUBES!
        : process.env.JOTFORM_LINK_SOLICITUD_RESTO_ENTIDADES!;
    const jotformLink = `${jotformBaseUrl}?codigoEntidad=${codigoEntidad}`;

    await sendEmail(
      [
        { email: complianceEmail1!, name: compliancePersona1! },
        { email: complianceEmail2!, name: compliancePersona2! },
      ],
      [compliancePersona1!, compliancePersona2!],
      jotformLink
    );

    await db.pedidoEntidad.create({
      data: {
        entidadId: entidad.id,
        fecha: new Date(),
        tipoReclamo: "MAIL",
        fechaRespuesta: null,
      },
    });
  }
};

export const updateSolicitudEntidad = async (codigoEntidad: string) => {
  const entidad = await db.entidad.findUnique({ where: { codigoEntidad } });

  await db.pedidoEntidad.updateMany({
    where: { entidadId: entidad?.id },
    data: {
      fechaRespuesta: new Date(),
    },
  });
};
