import { Prisma } from "@prisma/client";

const entidadWithPersonasInteres = Prisma.validator<Prisma.EntidadArgs>()({
  include: { personasInteres: true },
});

export type EntidadWithPersonasInteres = Prisma.EntidadGetPayload<
  typeof entidadWithPersonasInteres
>;

const entidadWithSolicitudes = Prisma.validator<Prisma.EntidadArgs>()({
  include: { solicitudes: true },
});

export type EntidadWithSolicitudes = Prisma.EntidadGetPayload<
  typeof entidadWithSolicitudes
>;

export type SearchParams = {
  page: string;
  tipo: string;
  search: string;
};
