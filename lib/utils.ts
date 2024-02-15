import { formatISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

import { Mapper } from "@/lib/jotform/mapper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dbValueToPrismaEnumValue<I, O>(
  value: keyof I,
  mapper: Mapper<I, O>
): O {
  return mapper[value];
}

export function formatDate(date: string) {
  if (!date) return undefined;

  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2];

  return formatISO(new Date(parseInt(year), parseInt(month), parseInt(day)));
}

export function generateRandomPassword() {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()-_+=<>?/[]{},.;:";
  const allChars = lowerCaseChars + upperCaseChars + specialChars;

  let password = "";

  password += lowerCaseChars.charAt(
    Math.floor(Math.random() * lowerCaseChars.length)
  );

  password += upperCaseChars.charAt(
    Math.floor(Math.random() * upperCaseChars.length)
  );

  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  for (let i = 0; i < 8; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  password = password
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  return password;
}
