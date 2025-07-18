"use server";

import { format, startOfMonth, endOfMonth } from "date-fns";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/utils";
import { TipoReclamo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const hasSolicitudesPendientes = async (codigoEntidad: string) => {
  const entidad = await db.entidad.findUnique({
    where: { codigoEntidad },
  });

  if (entidad) {
    const solicitudesPendientes = await db.pedidoEntidad.findMany({
      where: {
        tipoReclamo: "MAIL",
        entidadId: entidad.id,
        fechaRespuesta: null,
      },
    });

    return solicitudesPendientes.length > 0;
  }

  return false;
};

export const getSolicitudesPendientes = async () => {
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
      razonSocial,
      nombreCompleto,
      complianceEmail1,
      complianceEmail2,
      compliancePersona1,
      compliancePersona2,
    } = entidad;

    let sujeto = razonSocial || nombreCompleto || "";

    const primerDigitoCodigoEntidad = parseInt(codigoEntidad[0], 10);
    const jotformBaseUrl =
      primerDigitoCodigoEntidad === 1
        ? process.env.JOTFORM_LINK_SOLICITUD_CLUBES!
        : process.env.JOTFORM_LINK_SOLICITUD_RESTO_ENTIDADES!;
    const jotformLink = `${jotformBaseUrl}?codigoEntidad=${codigoEntidad}`;
    const formulario =
      primerDigitoCodigoEntidad === 1
        ? "Registro de Clubes"
        : "Registro de Proveedor, Sponsor y Agente Comercial";

    await sendEmail(
      process.env.SEND_SOLICITUD_TEMPLATE_ID!,
      [
        { email: complianceEmail1!, name: compliancePersona1! },
        { email: complianceEmail2!, name: compliancePersona2! },
      ],
      {
        formulario,
        link: jotformLink,
        personas: [sujeto].join(" / "),
        fecha: format(new Date(), "dd/MM/yyyy"),
      }
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

export const createRecordatorioSolicitud = async (codigoEntidad: string) => {
  const entidad = await db.entidad.findUnique({ where: { codigoEntidad } });

  if (entidad) {
    const pedidoEntidad = await db.pedidoEntidad.findFirst({
      where: {
        entidadId: entidad?.id,
        fechaRespuesta: null,
        tipoReclamo: "MAIL",
      },
      orderBy: {
        fecha: "desc",
      },
    });

    const {
      razonSocial,
      nombreCompleto,
      complianceEmail1,
      complianceEmail2,
      compliancePersona1,
      compliancePersona2,
    } = entidad;

    let sujeto = razonSocial || nombreCompleto || "";

    const primerDigitoCodigoEntidad = parseInt(codigoEntidad[0], 10);
    const jotformBaseUrl =
      primerDigitoCodigoEntidad === 1
        ? process.env.JOTFORM_LINK_SOLICITUD_CLUBES!
        : process.env.JOTFORM_LINK_SOLICITUD_RESTO_ENTIDADES!;
    const jotformLink = `${jotformBaseUrl}?codigoEntidad=${codigoEntidad}`;
    const formulario =
      primerDigitoCodigoEntidad === 1
        ? "Registro de Clubes"
        : "Registro de Proveedor, Sponsor y Agente Comercial";

    await sendEmail(
      process.env.SEND_RECORDATORIO_TEMPLATE_ID!,
      [
        { email: complianceEmail1!, name: compliancePersona1! },
        { email: complianceEmail2!, name: compliancePersona2! },
      ],
      {
        formulario,
        link: jotformLink,
        personas: [sujeto].join(" / "),
        fechaSolicitud: format(pedidoEntidad?.fecha!, "dd/MM/yyyy"),
        fecha: format(new Date(), "dd/MM/yyyy"),
      }
    );

    await db.pedidoEntidad.create({
      data: {
        entidadId: entidad.id,
        fecha: new Date(),
        tipoReclamo: "MAIL",
        fechaRespuesta: null,
      },
    });

    revalidatePath("/solicitudes");
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
