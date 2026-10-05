import type { AIProvider, ChatMessage } from "./provider";
import { retrieve } from "../rag/retrieval";

function cleanChunk(text: string): string {
  return text
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const FALLBACK_MESSAGE =
  "I don't have enough verified information about that — feel free to reach out to Tanisha directly at mitanisha74@gmail.com.";

export const localProvider: AIProvider = {
  name: "local",

  isConfigured() {
    return true;
  },

  async generate(
    _systemPrompt: string,
    messages: ChatMessage[]
  ): Promise<string> {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    const query = lastUserMessage?.content?.trim() || "";

    if (!query) {
      return FALLBACK_MESSAGE;
    }

    const lowerQuery = query.toLowerCase();
    if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("number") ||
      lowerQuery.includes("call") ||
      lowerQuery.includes("mobile") ||
      lowerQuery.includes("reach") ||
      lowerQuery.includes("email")
    ) {
      return "For inquiries and contact, you can reach Tanisha directly via email at mitanisha74@gmail.com or connect on LinkedIn (https://www.linkedin.com/in/tanishagupta71/).";
    }

    const matches = retrieve(query, 2);

    if (!matches.length || matches[0].score < 2) {
      return FALLBACK_MESSAGE;
    }

    const answer = matches
      .map((match) => cleanChunk(match.text))
      .filter(Boolean)
      .join(" ");

    return answer || FALLBACK_MESSAGE;
  },
};