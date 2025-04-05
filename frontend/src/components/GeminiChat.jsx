import { useState, useRef, useEffect } from "react";
import { askGemini } from "../api/gemini";
import { SendHorizonal } from "lucide-react";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = { type: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await askGemini(prompt);
      const botMsg = { type: "bot", text: response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = { type: "bot", text: "Error: Unable to respond." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-1 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${msg.type === "user" ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble text-sm leading-relaxed ${
                msg.type === "user"
                  ? "text-base-content"
                  : "text-base-content"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-base-200 text-base-content
 animate-pulse">
              {/* Gemini is typing... */}
              Ruko jara..sabar karo
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Fixed Input at Bottom */}
      <form
        onSubmit={handleSubmit}
        className="pt-3 mt-2 border-t border-gray-300 dark:border-gray-700 flex gap-2"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          className="input input-bordered w-full h-12 text-base rounded-lg"
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary h-12 px-5 rounded-lg"
          disabled={loading}
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default GeminiChat;
