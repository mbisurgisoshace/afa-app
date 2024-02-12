import * as z from "zod";
import { UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email es requerido",
  }),
  password: z.string().min(1, {
    message: "Password es requerido",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email es requerido",
  }),
  password: z.string().min(6, {
    message: "Minimo de 6 caracteres requeridos",
  }),
  nombre: z.string().min(1, {
    message: "Nombre es requerido",
  }),
  apellido: z.string().min(1, {
    message: "Apellido es requerido",
  }),
  role: z.nativeEnum(UserRole).optional(),
});

export const CreateSubmittedFormSchema = z.object({
  formId: z.string(),
  submissionId: z.string(),
});
