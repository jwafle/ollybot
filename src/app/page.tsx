"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  role: string;
  content: string;
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // This will trigger scrolling whenever the messages array changes.

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col w-1/3 py-24">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap my-2 p-2 rounded-md ${
              m.role === "user"
                ? "bg-purple-200 self-end text-right"
                : "bg-orange-200 self-start"
            }`} // Add the inline-block class here
          >
            {m.content}
          </div>
        ))}
        <div ref={endOfMessagesRef} className="mb-2" />
      </div>
      <div className="fixed bottom-0 w-1/3 bg-white">
        <form onSubmit={handleSubmit}>
          <Input
            className="mb-8 shadow-xl"
            value={input}
            placeholder="Say something..."
            // onChange={handleInputChange}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </main>
  );
}
