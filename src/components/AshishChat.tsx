"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import FormattedMessage from "./FormattedMessage";

type Msg = { role: "user" | "bot"; text: string };

const STORAGE_KEY = "ashishgpt_email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUGGESTIONS = [
  "Which areas give the best rental yield?",
  "Off-plan or ready: what should I pick?",
  "I'm an NRI. How do I buy in Dubai?",
];

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getEmailSnapshot() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && EMAIL_RE.test(saved) ? saved : "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return "";
}

/** GPT-style chat. Visitors must share their email before asking anything. Replies are a placeholder for now. */
export default function AshishChat() {
  const savedEmail = useSyncExternalStore(subscribe, getEmailSnapshot, getServerSnapshot);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const email = submittedEmail || savedEmail || null;

  const [draftEmail, setDraftEmail] = useState("");
  const [gateError, setGateError] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, email]);

  async function submitEmail(e: FormEvent) {
    e.preventDefault();
    const value = draftEmail.trim();
    if (!EMAIL_RE.test(value)) {
      setGateError("Please enter a valid email address.");
      return;
    }
    setGateError("");
    setBusy(true);
    try {
      await fetch("/api/inquire", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value, source: "ashishgpt", message: "Unlocked AshishGPT chat." }),
      });
    } catch {}
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setBusy(false);
    setSubmittedEmail(value);
  }

  async function ask(question: string) {
    const q = question.trim();
    if (!q || !email || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: q,
          email,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const data = await res.json();
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: data.answer || "Thank you for asking. Ashish's advisory team will follow up on your portfolio inquiry.",
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: "I am temporarily experiencing higher than usual inquiry volume. You can reach Ashish directly on WhatsApp at +971 54 582 1600.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  const unlocked = !!email;

  return (
    <div className="gpt" role="region" aria-label="AshishGPT chat">
      <div className="gpt__head">
        <span className="gpt__avatar" aria-hidden="true">AL</span>
        <div>
          <b>AshishGPT</b>
          <span className="gpt__status"><i /> Beta · Dubai real estate assistant</span>
        </div>
      </div>

      <div className="gpt__body" ref={listRef}>
        {!unlocked ? (
          <form className="gpt__gate" onSubmit={submitEmail} noValidate>
            <span className="gpt__gate-icon" aria-hidden="true">✦</span>
            <h3>Before we start</h3>
            <p>Share your email to chat with AshishGPT. Ashish&apos;s team will follow up on anything we can&apos;t answer here.</p>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={draftEmail}
              onChange={(e) => setDraftEmail(e.target.value)}
              aria-label="Your email address"
              aria-invalid={!!gateError}
            />
            {gateError && <span className="gpt__error" role="alert">{gateError}</span>}
            <button type="submit" className="btn btn--gold" disabled={busy}>
              <span>{busy ? "Unlocking…" : "Start chatting"}</span>
            </button>
            <small>No spam. Your email is used only to respond to you.</small>
          </form>
        ) : (
          <>
            <div className="gpt__msg gpt__msg--bot">
              <span className="gpt__bubble">Hi, I&apos;m AshishGPT. Ask me anything about buying, selling or investing in Dubai property.</span>
            </div>
            {msgs.length === 0 && (
              <div className="gpt__chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`gpt__msg gpt__msg--${m.role}`}>
                <div className="gpt__bubble">
                  {m.role === "bot" ? (
                    <FormattedMessage content={m.text} />
                  ) : (
                    <span>{m.text}</span>
                  )}
                  {m.role === "bot" && (
                    <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <a
                        href="https://wa.me/971545821600"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--sm btn--gold"
                        style={{ fontSize: "0.75rem", padding: "6px 14px", textDecoration: "none" }}
                      >
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="gpt__msg gpt__msg--bot">
                <span className="gpt__bubble gpt__typing" aria-label="AshishGPT is typing"><i /><i /><i /></span>
              </div>
            )}
          </>
        )}
      </div>

      <form
        className="gpt__composer"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!unlocked}
          placeholder={unlocked ? "Ask AshishGPT anything…" : "Enter your email above to start chatting"}
          aria-label="Your question"
        />
        <button type="submit" disabled={!unlocked || !input.trim() || typing} aria-label="Send">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M3 20.5v-6.8l8.4-1.7L3 10.3V3.5L22 12 3 20.5z" /></svg>
        </button>
      </form>
    </div>
  );
}
