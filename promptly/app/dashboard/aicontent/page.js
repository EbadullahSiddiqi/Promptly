"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  FileText,
  Youtube,
  Linkedin,
  Instagram,
  Copy,
  Save, // Add Save icon
  Check,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs"; // Import useAuth from Clerk
import { createSupabaseClient } from "../../lib/supabase.js"; // Import your Supabase client
import Link from "next/link.js";

export default function NewContent() {
  const [contentType, setContentType] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [title, setTitle] = useState(""); // Add title state for saving content
  const [isSaving, setIsSaving] = useState(false); // Add saving state
  const { userId, isSignedIn } = useAuth(); // Get user ID from Clerk

  useEffect(() => {
    // Check if screen is mobile on component mount and window resize
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const contentTypes = [
    { id: "youtube", name: "YouTube Script", icon: Youtube },
    { id: "blog", name: "Article/Blog", icon: FileText },
    { id: "linkedin", name: "LinkedIn Post", icon: Linkedin },
    { id: "instagram", name: "Instagram Post", icon: Instagram },
  ];

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

    if (isMobile) {
      setSidebarOpen(false);
    }

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          contentType,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContentTypeSelect = (type) => {
    setContentType(type);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Add function to save content to Supabase
  const saveContent = async (content) => {
    if (!isSignedIn || !userId) {
      alert("You must be signed in to save content");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title for your content");
      return;
    }

    setIsSaving(true);

    try {
      const supabase = createSupabaseClient();

      const { data, error } = await supabase
        .from("content_pieces")
        .insert({
          user_id: userId,
          title: title,
          content_type: contentType,
          content: content,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setTitle(""); // Reset title after saving
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Get the latest AI message content
  const getLatestAIContent = () => {
    const aiMessages = messages.filter((msg) => msg.role === "assistant");
    return aiMessages.length > 0
      ? aiMessages[aiMessages.length - 1].content
      : "";
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
        <div className="flex gap-10">
          <h1 className="text-xl font-semibold">
            {contentType
              ? `Create ${contentTypes.find((t) => t.id === contentType)?.name}`
              : "Select Content Type"}
          </h1>
          <Link href="/dashboard" className="mt-1">
            <Home />
          </Link>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Left Sidebar - Content Types */}
      <div
        className={`
        ${
          isMobile
            ? `absolute z-10 top-16 left-0 h-auto shadow-lg transition-all duration-300 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        }
        w-full md:w-64 bg-white border-r p-4`}
      >
        <h2 className="text-lg font-semibold mb-4">Content Type</h2>
        <div className="space-y-2">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleContentTypeSelect(type.id)}
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
        {/* Desktop Header */}
        <div className="hidden md:block bg-white border-b p-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">
              {contentType
                ? `Create ${
                    contentTypes.find((t) => t.id === contentType)?.name
                  }`
                : "Select Content Type"}
            </h1>
            <Link href="/dashboard">
              <Home className="cursor-pointer mt-1" />
            </Link>
          </div>
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
                className={`max-w-full md:max-w-3xl p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.role === "assistant" && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>

                      {isSignedIn && (
                        <button
                          onClick={() =>
                            document.getElementById("saveModal").showModal()
                          }
                          className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                          title="Save content"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                      )}
                    </div>
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

      {/* Save Modal */}
      <dialog
        id="saveModal"
        className="modal p-4 rounded-lg shadow-lg w-full max-w-md mx-auto"
      >
        <div className="modal-content">
          <h3 className="text-lg font-semibold mb-4">Save your content</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your content"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => document.getElementById("saveModal").close()}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                saveContent(getLatestAIContent());
                document.getElementById("saveModal").close();
              }}
              disabled={isSaving || !title.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
