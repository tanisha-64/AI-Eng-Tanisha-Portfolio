"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import { profile } from "@/data/profile";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_INPUT_LENGTH = 1000;
const MAX_MESSAGES = 20;

const SUGGESTED_PROMPTS = [
  "Who is Tanisha?",
  "What does Tanisha build?",
  "Tell me about her projects.",
  "What are her strongest technical areas?",
  "What research is she exploring?",
];

function createMessage(
  role: Message["role"],
  content: string
): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export default function AITwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    if (loading) return;
    setOpen(false);
  }, [loading]);

  const openTwin = useCallback(() => {
    setOpen(true);
  }, []);

  // Open AI Twin from Navigation.
  useEffect(() => {
    const handleOpen = () => openTwin();

    window.addEventListener("open-ai-twin", handleOpen);

    return () => {
      window.removeEventListener("open-ai-twin", handleOpen);
    };
  }, [openTwin]);

  // Escape closes the dialog.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, close]);

  // Focus input when opened.
  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [open]);

  // Keep conversation scrolled to latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const cleanText = text.trim();

      if (!cleanText || loading) return;

      if (cleanText.length > MAX_INPUT_LENGTH) {
        setError(
          `Please keep your question under ${MAX_INPUT_LENGTH} characters.`
        );
        return;
      }

      const userMessage = createMessage("user", cleanText);

      const nextMessages = [...messages, userMessage].slice(-MAX_MESSAGES);

      setMessages(nextMessages);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        });

        const data: unknown = await response.json();

        if (
          !response.ok ||
          !data ||
          typeof data !== "object" ||
          typeof (data as { reply?: unknown }).reply !== "string"
        ) {
          const apiError =
            data &&
            typeof data === "object" &&
            typeof (data as { error?: unknown }).error === "string"
              ? (data as { error: string }).error
              : "Something went wrong.";

          throw new Error(apiError);
        }

        const assistantMessage = createMessage(
          "assistant",
          (data as { reply: string }).reply
        );

        setMessages((current) => [
          ...current,
          assistantMessage,
        ].slice(-MAX_MESSAGES));
      } catch (error) {
        console.error("AI Twin request failed:", error);

        setError(
          "Couldn't reach the AI Twin right now. Please try again, or reach Tanisha directly."
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, messages]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {/* Mobile trigger */}
      {!open && (
        <motion.button
          type="button"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openTwin}
          data-cursor="ai"
          aria-label="Open Tanisha's AI Twin"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3.5 font-mono-label text-[11px] tracking-[0.15em] md:hidden"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          AI TWIN ✦
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close AI Twin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 cursor-default border-0"
              style={{
                background: "rgba(7, 7, 7, 0.72)",
                backdropFilter: "blur(6px)",
              }}
            />

            {/* Dialog */}
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-twin-title"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col overflow-hidden rounded-t-3xl md:bottom-8 md:left-auto md:right-8 md:w-[420px] md:rounded-3xl"
              style={{
                height: "min(640px, 88dvh)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--line)",
              }}
            >
              {/* Header */}
              <header
                className="flex items-center justify-between border-b px-6 py-5"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full font-mono-label text-xs"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg-primary)",
                    }}
                    aria-hidden="true"
                  >
                    TG
                  </div>

                  <div>
                    <h2
                      id="ai-twin-title"
                      className="text-sm font-semibold"
                    >
                      Tanisha&apos;s AI Twin
                    </h2>

                    <p
                      className="mt-0.5 flex items-center gap-1.5 font-mono-label text-[10px] tracking-[0.12em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "#4ADE80" }}
                        aria-hidden="true"
                      />
                      GROUNDED · NO INVENTED FACTS
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={close}
                  disabled={loading}
                  aria-label="Close AI Twin"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ color: "var(--text-muted)" }}
                >
                  ×
                </button>
              </header>

              {/* Conversation */}
              <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
                aria-live="polite"
                aria-busy={loading}
              >
                {messages.length === 0 && (
                  <div>
                    <p
                      className="mb-5 text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Ask me about {profile.firstName}&apos;s work,
                      projects, research, skills, or engineering journey.
                    </p>

                    <div className="flex flex-col gap-2">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => void sendMessage(prompt)}
                          disabled={loading}
                          className="rounded-xl border px-4 py-2.5 text-left text-[13px] transition-colors hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
                          style={{
                            borderColor: "var(--line)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed"
                      style={{
                        background:
                          message.role === "user"
                            ? "var(--accent)"
                            : "var(--surface)",
                        color:
                          message.role === "user"
                            ? "var(--bg-primary)"
                            : "var(--text-primary)",
                        border:
                          message.role === "assistant"
                            ? "1px solid var(--line)"
                            : undefined,
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div
                    className="flex justify-start"
                    aria-label="AI Twin is thinking"
                  >
                    <div
                      className="flex gap-1.5 rounded-2xl px-4 py-3"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1.1,
                            repeat: Infinity,
                            delay: dot * 0.15,
                          }}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: "var(--accent)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <p
                    className="px-1 text-[13px] leading-relaxed"
                    style={{ color: "var(--accent-soft)" }}
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t p-4"
                style={{ borderColor: "var(--line)" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))
                  }
                  maxLength={MAX_INPUT_LENGTH}
                  disabled={loading}
                  placeholder="Ask something..."
                  aria-label="Ask Tanisha's AI Twin a question"
                  className="min-w-0 flex-1 rounded-xl border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)] disabled:opacity-50"
                  style={{
                    borderColor: "var(--line)",
                    color: "var(--text-primary)",
                  }}
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="shrink-0 rounded-xl px-4 py-2.5 font-mono-label text-[11px] tracking-[0.15em] transition-opacity disabled:cursor-not-allowed"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                    opacity:
                      loading || !input.trim() ? 0.45 : 1,
                  }}
                >
                  {loading ? "..." : "SEND"}
                </button>
              </form>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}