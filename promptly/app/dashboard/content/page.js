// app/dashboard/content/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  Youtube,
  FileText,
  Linkedin,
  Instagram,
  Trash,
  Home,
} from "lucide-react";
import { createSupabaseClient } from "../../lib/supabase.js"; // Import your Supabase client
import Link from "next/link.js";

export default function ContentLibrary() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    const fetchContent = async () => {
      if (!isSignedIn) return;

      try {
        const response = await fetch("/api/content");
        if (!response.ok) throw new Error("Failed to fetch content");

        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isSignedIn]);

  const deleteContent = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase
        .from("content_pieces")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;

      // Update the UI
      setContent(content.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "youtube":
        return <Youtube className="h-5 w-5" />;
      case "blog":
        return <FileText className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getContentTypeName = (type) => {
    switch (type) {
      case "youtube":
        return "YouTube Script";
      case "blog":
        return "Article/Blog";
      case "linkedin":
        return "LinkedIn Post";
      case "instagram":
        return "Instagram Post";
      default:
        return type;
    }
  };

  if (!isSignedIn) {
    return (
      <div className="p-8 text-center">
        <p>Please sign in to view your content library.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Loading your content...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Your Content Library</h1>
        <Link href="/dashboard">
          <Home />
        </Link>
      </div>

      {content.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't saved any content yet.</p>
          <button
            onClick={() => (window.location.href = "/dashboard/aicontent")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create New Content
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getIcon(item.content_type)}
                  <span className="text-sm font-medium">
                    {getContentTypeName(item.content_type)}
                  </span>
                </div>
                <button
                  onClick={() => deleteContent(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.content}
                </p>
              </div>
              <div className="p-4 border-t bg-gray-50">
                <p className="text-xs text-gray-500">
                  Created: {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
