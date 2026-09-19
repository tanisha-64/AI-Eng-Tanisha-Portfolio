"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [delivered, setDelivered] = useState(false);

  const isSending = status === "sending";

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSending) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      message: form.message.trim(),
    };

    if (payload.name.length < 2) {
      setErrorMsg("Please provide your name.");
      setStatus("error");
      return;
    }

    if (payload.name.length > MAX_NAME_LENGTH) {
      setErrorMsg(`Name must be under ${MAX_NAME_LENGTH} characters.`);
      setStatus("error");
      return;
    }

    if (!payload.email) {
      setErrorMsg("Please provide your email.");
      setStatus("error");
      return;
    }

    if (payload.message.length < 5) {
      setErrorMsg("Please add a short message.");
      setStatus("error");
      return;
    }

    if (payload.message.length > MAX_MESSAGE_LENGTH) {
      setErrorMsg(
        `Message must be under ${MAX_MESSAGE_LENGTH} characters.`
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          data &&
          typeof data === "object" &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Something went wrong. Please try again.";

        throw new Error(message);
      }

      const wasDelivered =
        data &&
        typeof data === "object" &&
        (data as { delivered?: unknown }).delivered === true;

      setDelivered(wasDelivered === true);
      setForm(INITIAL_FORM);
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setErrorMsg(
        error instanceof Error
          ? error.message
          : "Network error. Please try again."
      );

      setStatus("error");
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrorMsg("");
    setDelivered(false);
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border p-8 text-center"
        style={{
          borderColor: "var(--accent)",
          background: "var(--surface)",
        }}
      >
        <p className="display mb-2 text-xl font-semibold">
          {delivered
            ? "Message sent."
            : "Message received — email delivery is not configured yet."}
        </p>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {delivered
            ? "Thanks for reaching out — Tanisha will get back to you soon."
            : `The form is working, but email delivery is not configured on this environment. You can email Tanisha directly at ${profile.email}.`}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {!delivered && (
            <a
              href={`mailto:${profile.email}`}
              data-cursor="link"
              className="rounded-full px-5 py-2.5 font-mono-label text-[11px] tracking-[0.15em]"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              EMAIL TANISHA DIRECTLY →
            </a>
          )}

          <button
            type="button"
            onClick={resetForm}
            data-cursor="link"
            className="link-underline font-mono-label text-[11px] tracking-[0.15em]"
            style={{ color: "var(--accent)" }}
          >
            SEND ANOTHER MESSAGE
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="font-mono-label mb-2 block text-[11px] tracking-[0.15em]"
          style={{ color: "var(--text-muted)" }}
        >
          NAME
        </label>

        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={MAX_NAME_LENGTH}
          value={form.name}
          onChange={(event) =>
            updateField("name", event.target.value)
          }
          placeholder="Your name"
          disabled={isSending}
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            borderColor: "var(--line)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="font-mono-label mb-2 block text-[11px] tracking-[0.15em]"
          style={{ color: "var(--text-muted)" }}
        >
          EMAIL
        </label>

        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={MAX_EMAIL_LENGTH}
          value={form.email}
          onChange={(event) =>
            updateField("email", event.target.value)
          }
          placeholder="you@example.com"
          disabled={isSending}
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            borderColor: "var(--line)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="font-mono-label mb-2 block text-[11px] tracking-[0.15em]"
          style={{ color: "var(--text-muted)" }}
        >
          MESSAGE
        </label>

        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={MAX_MESSAGE_LENGTH}
          value={form.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          placeholder="What would you like to talk about?"
          disabled={isSending}
          className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            borderColor: "var(--line)",
            color: "var(--text-primary)",
          }}
        />

        <div className="mt-2 flex justify-end">
          <span
            className="font-mono-label text-[10px]"
            style={{ color: "var(--text-muted)" }}
          >
            {form.message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="text-sm leading-relaxed"
          style={{ color: "var(--accent-soft)" }}
        >
          {errorMsg}
        </motion.p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={
          isSending ||
          !form.name.trim() ||
          !form.email.trim() ||
          !form.message.trim()
        }
        data-cursor="link"
        className="w-full rounded-full px-8 py-4 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:opacity-80 disabled:cursor-not-allowed md:w-auto"
        style={{
          background: "var(--accent)",
          color: "var(--bg-primary)",
          opacity: isSending ? 0.55 : 1,
        }}
      >
        {isSending ? "SENDING..." : "SEND MESSAGE →"}
      </button>
    </form>
  );
}