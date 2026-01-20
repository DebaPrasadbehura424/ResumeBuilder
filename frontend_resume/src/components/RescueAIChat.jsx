import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

export default function RescueAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    await axios
      .post("http://localhost:7878/api/gemini/generate", { prompt: input })
      .then((res) => {
        const reply = res.data.reply;
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: reply,
          },
        ]);
      })
      .catch((err) => {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: "❌ Error: Could not get response from AI.",
          },
        ]);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(70vh-4rem)] max-w-screen-md w-full mx-auto bg-gray-100 shadow-md rounded-lg">
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-lg shadow break-words
              ${
                msg.type === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-white text-gray-800 border"
              }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 sm:p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 min-w-0 border rounded px-4 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
