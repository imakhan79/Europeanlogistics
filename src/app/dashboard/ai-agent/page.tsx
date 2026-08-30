"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AGENT_CAPABILITIES,
  SUGGESTED_PROMPTS,
  INITIAL_MESSAGE,
  generateAgentReply,
  nowLabel,
  type ChatMessage,
} from "@/lib/ai-agent/responder";

let messageCounter = 0;
function nextId(): string {
  messageCounter += 1;
  return `m-${messageCounter}`;
}

export default function AiLogisticsAgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content: trimmed,
      timestamp: nowLabel(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const reply: ChatMessage = {
        id: nextId(),
        role: "agent",
        content: generateAgentReply(trimmed),
        timestamp: nowLabel(),
      };
      setMessages((prev) => [...prev, reply]);
      setThinking(false);
    }, 700);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="flex h-[calc(100vh-6.5rem)] flex-col">
      <h1 className="mb-1 flex items-center gap-2 text-xl font-semibold">
        <Bot className="h-5 w-5 text-blue-400" /> AI Logistics Agent
      </h1>
      <p className="mb-6 text-sm text-white/50">
        Ask about fleet, drivers, compliance, fuel, maintenance, finance, shipments or customers.
      </p>

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_280px]">
        <Card className="flex min-h-0 flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    m.role === "agent" ? "bg-blue-500/15 text-blue-400" : "bg-white/10 text-white/70"
                  }`}
                >
                  {m.role === "agent" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] ${m.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block whitespace-pre-line rounded-xl px-4 py-2.5 text-left text-sm ${
                      m.role === "agent" ? "bg-white/[0.04] text-white/85" : "bg-blue-600 text-white"
                    }`}
                  >
                    {m.content}
                  </div>
                  <p className="mt-1 text-[11px] text-white/30">{m.timestamp}</p>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI Logistics Agent..."
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
            />
            <Button type="submit" size="sm" disabled={!input.trim() || thinking}>
              <Send className="h-3.5 w-3.5" /> Send
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Try Asking</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  disabled={thinking}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-left text-xs text-white/60 hover:bg-white/5 disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Capabilities
                </span>
              </CardTitle>
            </CardHeader>
            <ul className="space-y-1.5 text-xs text-white/50">
              {AGENT_CAPABILITIES.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
