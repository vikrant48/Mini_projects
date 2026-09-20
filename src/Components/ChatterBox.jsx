import React, { useState } from 'react';
import axios from "axios";

// 🔐 TEMPORARY HARDCODED API KEY — DO NOT USE IN PRODUCTION
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ""; // ⚠️ Replace with your key

const ChatterBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    const fetchBotResponse = async (newMessages) => {
        if (!API_KEY) {
            throw new Error("API key not set.");
        }

        try {
            const response = await axios.post(
                OPENAI_URL,
                {
                    model: "gpt-3.5-turbo",
                    messages: newMessages.map((msg) => ({
                        role: msg.user === "You" ? "user" : "assistant",
                        content: msg.text,
                    })),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );
            return response.data.choices[0].message.content.trim();
        } catch (error) {
            console.error("OpenAI API Error:", error.response?.data || error.message);
            throw new Error("API request failed.");
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const newMessages = [...messages, { user: "You", text: input }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const botReply = await fetchBotResponse(newMessages);
            setMessages([...newMessages, { user: "Bot", text: botReply }]);
        } catch (error) {
            setMessages([
                ...newMessages,
                { user: "Bot", text: "❌ Error: Could not connect to AI service." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-80 bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">AI Buddy Chatbot</h1>
                <div className="h-96 overflow-y-auto border p-4 rounded-lg mb-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${msg.user === "You" ? "text-right" : "text-left"}`}
                        >
                            <p
                                className={`inline-block p-2 rounded-lg ${msg.user === "You"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-black"
                                    }`}
                            >
                                <strong>{msg.user}:</strong> {msg.text}
                            </p>
                        </div>
                    ))}
                    {isLoading && <p className="text-center text-gray-500">Bot is typing...</p>}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatterBox;
