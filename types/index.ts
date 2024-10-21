import { Prisma } from "@prisma/client";

const entidadWithPersonasInteres = Prisma.validator<Prisma.EntidadArgs>()({
  include: { personasInteres: true },
});

export type EntidadWithPersonasInteres = Prisma.EntidadGetPayload<
  typeof entidadWithPersonasInteres
>;

export type SearchParams = {
  page: string;
  tipo: string;
  search: string;
};
