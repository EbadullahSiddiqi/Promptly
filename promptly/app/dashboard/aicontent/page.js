"use client";

import React, { useState } from "react";
import {
  Send,
  FileText,
  Youtube,
  Linkedin,
  Instagram,
  Copy,
  Check,
} from "lucide-react";

export default function NewContent() {
  const [contentType, setContentType] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { id: "youtube", name: "YouTube Script", icon: Youtube },
    { id: "blog", name: "Article/Blog", icon: FileText },
    { id: "linkedin", name: "LinkedIn Post", icon: Linkedin },
    { id: "instagram", name: "Instagram Post", icon: Instagram },
  ];

  const getPromptPrefix = (type) => {
    const prefixes = {
      youtube:
        "Create a YouTube script for the following topic. Include a hook, introduction, main points with timestamps, and call to action: ",
      blog: "Write a blog post about the following topic. Make it SEO-friendly with proper headings, examples, and actionable tips: ",
      linkedin:
        "Create a professional LinkedIn post about the following topic. Include relevant hashtags and make it engaging: ",
      instagram:
        "Create an Instagram caption about the following topic. Include relevant hashtags and a call to action: ",
    };
    return prefixes[type] || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      role: "user",
      content: inputMessage,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage], // Send all messages
          contentType: contentType, // Add contentType
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content, // Changed from data.result to data.content
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, there was an error generating the content. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Content Types */}
      <div className="w-64 bg-white border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Content Type</h2>
        <div className="space-y-2">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setContentType(type.id)}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                contentType === type.id
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <type.icon className="h-5 w-5" />
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">
            {contentType
              ? `Create ${contentTypes.find((t) => t.id === contentType)?.name}`
              : "Select Content Type"}
          </h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                contentType
                  ? "Type your message..."
                  : "Select a content type to start..."
              }
              disabled={!contentType}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!contentType || !inputMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
