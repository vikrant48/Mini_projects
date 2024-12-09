import React, { useState } from 'react'
import axios from "axios";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;


function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // console.log("API Key:", API_KEY);

    const OPENAI_URL = "https://api.openai.com/v1/chat/completions";


    const fetchBotResponse = async (newMessages) => {
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
            console.error("Error fetching response from OpenAI:", error.response?.data || error.message);
            throw new Error("Could not fetch response from OpenAI.");
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

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
                { user: "Bot", text: "Sorry, something went wrong. Please try again later!" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
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
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleSendMessage}
                        disabled={isLoading} // Prevent multiple requests while loading
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBox