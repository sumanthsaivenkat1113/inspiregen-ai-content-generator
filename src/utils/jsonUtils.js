import { jsonrepair } from "jsonrepair";
export const extractJsonFromTags = (text) => {
  const match = text.match(/<json>([\s\S]*?)<\/json>/);
  if (!match) throw new Error("No <json> block found in AI output");
  return match[1].trim();
};
export const safeParseJson = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    const repaired = jsonrepair(jsonString);
    return JSON.parse(repaired);
  }
};