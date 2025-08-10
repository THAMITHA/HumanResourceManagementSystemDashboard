import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 w-64 p-4 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          HRMS Dashboard
        </h2>
        <nav className="space-y-2">
          <Link className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" to="/dashboard/employees">
            Employee Directory
          </Link>
          <Link className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" to="/dashboard/leaves">
            Leave Requests
          </Link>
          <Link className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" to="/dashboard/profile">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 bg-gray-200 dark:bg-gray-700 rounded"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Welcome, {user?.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded text-sm"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
