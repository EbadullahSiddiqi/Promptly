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
  X,
} from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check window size on mount and when resized
  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkWindowSize();

    // Add event listener
    window.addEventListener("resize", checkWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data
  const recentContent = [
    { id: 1, title: "Top 10 SEO Strategies", status: "Draft", progress: 70 },
    {
      id: 2,
      title: "Email Marketing Guide",
      status: "Published",
      progress: 100,
    },
    { id: 3, title: "Social Media Tips", status: "In Review", progress: 85 },
  ];

  const analytics = {
    totalContent: 25,
    publishedContent: 18,
    avgEngagement: "72%",
    monthlyGrowth: "+15%",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Menu toggle button for mobile */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 md:hidden"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-gray-800"
            >
              Promptly
            </Link>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border rounded-lg w-40 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 md:block">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            <UserButton />
          </div>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-4 md:hidden">
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

      <div className="flex relative">
        {/* Sidebar - fixed position for mobile */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } transform transition-transform duration-300 fixed md:static z-20 bg-white w-64 h-[calc(100vh-64px)] shadow-sm md:block overflow-y-auto`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg"
                >
                  <BarChart className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <FileText className="h-5 w-5" />
                  <span>Content</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>AI Assistant</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Users className="h-5 w-5" />
                  <span>Team</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Schedule</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content - with proper padding based on sidebar state */}
        <main
          className={`flex-1 p-4 md:p-6 ${
            sidebarOpen && !isMobile ? "md:ml-64" : ""
          } transition-all duration-300`}
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Content</p>
                  <p className="text-xl md:text-2xl font-bold">
                    {analytics.totalContent}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-xl md:text-2xl font-bold">
                    {analytics.publishedContent}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Engagement</p>
                  <p className="text-xl md:text-2xl font-bold">
                    {analytics.avgEngagement}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Growth</p>
                  <p className="text-xl md:text-2xl font-bold">
                    {analytics.monthlyGrowth}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Content */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 md:p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Recent Content</h2>
                <Link
                  href="/dashboard/aicontent"
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>New Content</span>
                </Link>
              </div>
            </div>
            <div className="p-4 md:p-6">
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
                      <p className="text-xs text-right mt-1 text-gray-500">
                        {content.progress}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
