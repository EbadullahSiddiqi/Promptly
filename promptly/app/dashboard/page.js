"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  FileText,
  Users,
  Calendar,
  Sparkles,
  Settings,
  Bell,
  Search,
  PlusCircle,
  TrendingUp,
  Menu,
  Library,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recentContent, setRecentContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useUser();

  // Sample analytics data (unchanged)
  const analytics = {
    totalContent: 25,
    publishedContent: 18,
    avgEngagement: "72%",
    monthlyGrowth: "+15%",
  };

  // Fetch content from the database
  useEffect(() => {
    const fetchContent = async () => {
      if (!isSignedIn) return;

      try {
        const response = await fetch("/api/content");
        if (!response.ok) throw new Error("Failed to fetch content");

        const data = await response.json();
        setRecentContent(data); // Update state with fetched content
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchContent();
  }, [isSignedIn]); // Re-run effect when isSignedIn changes

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (unchanged) */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={toggleSidebar} className="md:hidden p-2">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <Link href="/" className="font-bold text-lg lg:text-xl text-black">
              <h1 className="font-bold text-xl lg:text-3xl text-black">
                <span className="text-[#764ca3]">C</span>ontent{" "}
                <span className="text-[#35aad7]">C</span>o-
                <span className="text-[#606cb5]">P</span>ilot
              </h1>
            </Link>
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border rounded-lg w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <UserButton />
          </div>
        </div>
        <div className="sm:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar (unchanged) */}
        <aside
          className={`
          md:w-64 md:static md:block
          ${sidebarOpen ? "block fixed inset-0 z-50" : "hidden"}
        `}
        >
          <div className="md:block h-full">
            <div
              className="md:hidden absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleSidebar}
            ></div>
            <div className="relative md:static h-full">
              <nav className="bg-white w-64 min-h-screen shadow-sm p-4">
                <div className="flex justify-between items-center md:hidden mb-4">
                  <h2 className="font-bold text-lg">Menu</h2>
                  <button onClick={toggleSidebar} className="p-2">
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg"
                    >
                      <BarChart className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/content"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Library className="h-5 w-5" />
                      <span>Content Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/aicontent"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>AI Assistant</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/soon"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Users className="h-5 w-5" />
                      <span>Team</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/soon"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Schedule</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* Quick Stats (unchanged) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Content</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {recentContent.length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-xl sm:text-2xl font-bold">0</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Engagement</p>
                  <p className="text-xl sm:text-2xl font-bold">0%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Growth</p>
                  <p className="text-xl sm:text-2xl font-bold">0%</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Content */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Recent Content</h2>
                <Link
                  href="/dashboard/aicontent"
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>New Content</span>
                </Link>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : recentContent.length === 0 ? (
                <p className="text-center text-gray-600">No content found.</p>
              ) : (
                <div className="space-y-4">
                  {recentContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3"
                    >
                      <div>
                        <h3 className="font-medium">{content.title}</h3>
                        <p className="text-sm text-gray-600">
                          Status: {content.status}
                        </p>
                      </div>
                      <div className="w-full sm:w-32">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${content.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
