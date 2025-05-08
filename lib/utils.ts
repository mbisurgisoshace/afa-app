import https from "https";
import axios, { AxiosRequestConfig } from "axios";
import { formatISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { doubleMetaphone as metaphone } from "double-metaphone";

import { Mapper } from "@/lib/jotform/mapper";
import { emailClient } from "./mailtrap";
import { Address } from "mailtrap";

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

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export function blobToData(blob: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result);
    reader.readAsArrayBuffer(blob);
  });
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string) {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp = Array(len2 + 1)
    .fill(0)
    .map(() => Array(len1 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[0][i] = i;
  for (let j = 0; j <= len2; j++) dp[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[j][i] = dp[j - 1][i - 1];
      } else {
        dp[j][i] = Math.min(dp[j - 1][i - 1], dp[j][i - 1], dp[j - 1][i]) + 1;
      }
    }
  }
  return dp[len2][len1];
}

// Calculate Jaccard similarity for words
function jaccardSimilarity(set1: string[], set2: string[]) {
  const intersection = set1.filter((item) => set2.includes(item)).length;
  const union = new Set([...set1, ...set2]).size;
  return intersection / union;
}

// Phonetic comparison using Double Metaphone
function phoneticComparison(name1: string, name2: string) {
  const [primary1, alt1] = metaphone(name1);
  const [primary2, alt2] = metaphone(name2);
  return primary1 === primary2 ||
    primary1 === alt2 ||
    alt1 === primary2 ||
    alt1 === alt2
    ? 1
    : 0;
}

// Token-based comparison (e.g., first/last names)
function compareTokens(name1: string, name2: string) {
  const tokens1 = name1.split(/\s+/);
  const tokens2 = name2.split(/\s+/);
  const levenshteinScores: any[] = [];

  tokens1.forEach((token1) => {
    tokens2.forEach((token2) => {
      const dist = levenshteinDistance(token1, token2);
      const maxLen = Math.max(token1.length, token2.length);
      const similarity = 1 - dist / maxLen; // Normalized similarity
      levenshteinScores.push(similarity);
    });
  });

  // Average similarity across all token pairs
  return levenshteinScores.length
    ? levenshteinScores.reduce((a, b) => a + b, 0) / levenshteinScores.length
    : 0;
}

function isInitialMatch(name1: string, name2: string) {
  const tokens1 = name1.split(/\s+/);
  const tokens2 = name2.split(/\s+/);

  // Check if one name has a single initial in place of the first name
  if (tokens1.length > 1 && tokens2.length > 1) {
    const firstToken1 = tokens1[0];
    const firstToken2 = tokens2[0];

    // If one of the tokens is just an initial, check if it matches the full first name
    if (
      (firstToken1.length === 1 && firstToken1[0] === firstToken2[0]) ||
      (firstToken2.length === 1 && firstToken2[0] === firstToken1[0])
    ) {
      return true;
    }
  }
  return false;
}

// Main matching algorithm: combines phonetic, fuzzy, and word-based comparison
export function matchNames(name1: string, name2: string) {
  // Preprocess names: lowercase and trim whitespace
  const processedName1 = name1.toLowerCase().trim();
  const processedName2 = name2.toLowerCase().trim();

  // Direct equality check: if names are identical, return 100%
  if (processedName1 === processedName2) {
    return 100;
  }

  // Initial matching check
  const initialMatch = isInitialMatch(processedName1, processedName2);

  // Phonetic similarity (returns 1 if names are phonetically similar, 0 otherwise)
  const phoneticScore = phoneticComparison(processedName1, processedName2);

  // Fuzzy similarity based on tokenized names (Levenshtein)
  const tokenSimilarity = compareTokens(processedName1, processedName2);

  // Word-based similarity (Jaccard index on words)
  const words1 = processedName1.split(/\s+/);
  const words2 = processedName2.split(/\s+/);
  const wordSimilarity = jaccardSimilarity(words1, words2);

  // Boost score if there's an initial match
  let combinedScore =
    0.4 * phoneticScore + 0.4 * tokenSimilarity + 0.2 * wordSimilarity;
  if (initialMatch) {
    combinedScore = Math.min(combinedScore + 0.2, 1); // Boost by 20%, but cap at 1
  }

  // return (combinedScore * 100).toFixed(2) + "%"; // Return match percentage
  return combinedScore * 100; // Return match percentage
}

export async function sendEmail(recipients: Address[], contactos: string[]) {
  const sender = {
    email: "compliance@clama360.com",
    name: "Clama360",
  };

  await emailClient.send({
    from: sender,
    to: recipients,
    template_uuid: process.env.SEND_SOLICITUD_TEMPLATE_ID!,
    template_variables: {
      personas: contactos.join(" / "),
    },
  });
}

export async function fetch(url: string, options?: AxiosRequestConfig) {
  const agent = new https.Agent({ rejectUnauthorized: false });

  try {
    return await axios(url, { ...options, httpsAgent: agent });
  } catch (error) {
    console.log("error", error);
  }
}
