export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface AIProvider {
  readonly name: string;

  isConfigured(): boolean;

  generate(
    systemPrompt: string,
    messages: ChatMessage[]
  ): Promise<string>;
}