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

export const EntidadSchema = z.object({
  codigoEntidad: z.string(),
  fecha: z.any(),
  tipoRelacion: z.any(),
  tipoActividad: z.any(),
  condicionIva: z.any(),
  codigoActividadAfip: z.any(),
  tipoIndustria: z.any(),
  ingresosEnPesos: z.any(),
  fechaCierrePesos: z.any(),
  tipoDePersona: z.any(),
  direccion: z.any(),
  ciudad: z.any(),
  estado: z.any(),
  pais: z.any(),
  codigoPostal: z.any(),
  telefono: z.any(),
  email: z.any(),
  contactoAfa: z.any(),
  titularCuentaBancaria: z.any(),
  bancoCuentaBancaria: z.any(),
  sucursalCuentaBancaria: z.any(),
  numeroCuentaBancaria: z.any(),
  tipoCuentaBancaria: z.any(),
  cbu: z.any(),
  alias: z.any(),
  cuentaEnExterior: z.any(),
  paisCuentaExterior: z.any(),
  iban: z.any(),
  swift: z.any(),
  bancoCorresponsal: z.any(),
  tieneOficinasExterior: z.any(),
  oficinasExterior: z.any(),
  tieneOperacionesExterior: z.any(),
  operacionesExterior: z.any(),
  montoOperacionesExterior: z.any(),
  fechaCierrePesosExterior: z.any(),
  porcentajeExportacionVsTotal: z.any(),
});
