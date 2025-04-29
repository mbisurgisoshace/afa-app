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

    // await sendEmail(
    //   [
    //     { email: complianceEmail1!, name: compliancePersona1! },
    //     { email: complianceEmail2!, name: compliancePersona2! },
    //   ],
    //   [compliancePersona1!, compliancePersona2!]
    // );
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
