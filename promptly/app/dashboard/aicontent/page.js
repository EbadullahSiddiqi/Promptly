"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  FileText,
  Youtube,
  Linkedin,
  Instagram,
  Copy,
  Check,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

export default function NewContent() {
  const [contentType, setContentType] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile-sized on mount and resize
  useEffect(() => {
    const checkWindowSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkWindowSize();

    // Set listener for window resize
    window.addEventListener("resize", checkWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

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

    // Close sidebar on mobile when sending a message
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }

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

  const handleTypeSelect = (typeId) => {
    setContentType(typeId);
    // On mobile, close the sidebar after selecting a type
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar Toggle for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed z-20 top-4 ${
          sidebarOpen ? "left-52" : "left-4"
        } p-2 bg-white rounded-full shadow-md`}
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Left Sidebar - Content Types */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 fixed md:relative z-10 w-64 h-full bg-white border-r p-4 overflow-y-auto`}
      >
        <h2 className="text-lg font-semibold mb-4">Content Type</h2>
        <div className="space-y-2">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
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
      <div
        className={`flex-1 flex flex-col ${
          sidebarOpen && !isMobile ? "md:ml-64" : ""
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold ml-8 md:ml-0">
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
                className={`max-w-full md:max-w-3xl p-3 md:p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <div className="flex justify-between items-start gap-2 md:gap-4">
                  <p className="whitespace-pre-wrap text-sm md:text-base">
                    {message.content}
                  </p>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="text-gray-500 hover:text-gray-700 flex-shrink-0"
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
              <div className="bg-white border rounded-lg p-3 md:p-4">
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
        <div className="border-t bg-white p-3 md:p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2 md:space-x-4">
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
              className="flex-1 p-2 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!contentType || !inputMessage.trim()}
              className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
