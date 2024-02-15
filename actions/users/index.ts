"use server";

import { db } from "@/lib/db";

export const getUsers = async () => {
  const users = await db.user.findMany();
  return users.map((user) => ({
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};
