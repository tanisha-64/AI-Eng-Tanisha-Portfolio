import type { AIProvider, ChatMessage } from "./provider";

const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

const GROQ_MODEL = "openai/gpt-oss-120b";

const REQUEST_TIMEOUT_MS = 30_000;

interface GroqResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
}

export const groqProvider: AIProvider = {
  name: "groq",

  isConfigured() {
    return Boolean(process.env.GROQ_API_KEY?.trim());
  },

  async generate(
    systemPrompt: string,
    messages: ChatMessage[]
  ): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not configured.");
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...messages,
          ],
          temperature: 0.4,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Groq API error:", {
          status: response.status,
          body: errorText,
        });

        throw new Error(
          `Groq request failed with status ${response.status}.`
        );
      }

      const data = (await response.json()) as GroqResponse;

      const content = data.choices?.[0]?.message?.content?.trim();

      if (!content) {
        throw new Error("Groq returned an empty response.");
      }

      return content;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Groq request timed out.");
      }

      throw error;
    } finally {
      clearTimeout(timeout);
    }
  },
};
