"use server";

import { startOfMonth, endOfMonth } from "date-fns";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/utils";
import { TipoReclamo } from "@prisma/client";

export const getSolicitudesPendientes = async () => {
  // const solicitudes = await db.pedidoEntidad.findMany({
  //   where: {
  //     fechaRespuesta: null,
  //   },
  //   select: {
  //     id: true,
  //     entidad: {
  //       select: {
  //         codigoEntidad: true,
  //         razonSocial: true,
  //         nombreCompleto: true,
  //       },
  //     },
  //     fecha: true,
  //     tipoReclamo: true,
  //     fechaRespuesta: true,
  //   },
  //   orderBy: {
  //     fecha: "desc",
  //   },
  // });
  const solicitudes = await db.entidad.findMany({
    where: {
      solicitudes: {
        some: {
          fechaRespuesta: null,
        },
      },
    },
    select: {
      id: true,
      tipoRelacion: true,
      codigoEntidad: true,
      razonSocial: true,
      nombreCompleto: true,
      solicitudes: {
        where: {
          fechaRespuesta: null,
        },
        select: {
          id: true,
          fecha: true,
          tipoReclamo: true,
          fechaRespuesta: true,
        },
      },
    },
  });

  return solicitudes;
};

export const getSolicitudesByTipo = async (tipoReclamo: TipoReclamo) => {
  const endDate = endOfMonth(new Date());
  const startDate = startOfMonth(new Date());

  const solicitudes = await db.pedidoEntidad.findMany({
    where: {
      tipoReclamo,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return solicitudes;
};

export const getSolicitudesSinRespuestaByTipo = async (
  tipoReclamo: TipoReclamo
) => {
  const solicitudes = await db.pedidoEntidad.findMany({
    where: {
      tipoReclamo,
      fechaRespuesta: null,
    },
  });

  return solicitudes;
};

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
