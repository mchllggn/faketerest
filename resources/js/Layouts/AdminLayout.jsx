import { Link, usePage, Head } from "@inertiajs/react";
import {
  LayoutDashboard,
  Users,
  Image,
  Activity,
  LogOut,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { route: "admin.dashboard", label: "Dashboard", icon: LayoutDashboard },
  { route: "admin.users.index", label: "Users", icon: Users },
  { route: "admin.pins.index", label: "Pins", icon: Image },
  { route: "admin.activity.index", label: "Activity Logs", icon: Activity },
];

export default function AdminLayout({ title, children }) {
  const user = usePage().props.auth.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head title={title ? `${title} - Admin` : "Admin"} />

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          sidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-60 max-w-[80%] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:sticky lg:z-30 lg:translate-x-0 lg:max-w-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:px-6">
            <Link
              href={route("admin.dashboard")}
              onClick={closeSidebar}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-600 rounded-lg">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                Admin Panel
              </span>
            </Link>
            <button
              type="button"
              onClick={closeSidebar}
              className="inline-flex items-center justify-center -mr-2 text-gray-500 transition rounded-md w-9 h-9 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto lg:p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                route().current(item.route) ||
                route().current(`${item.route}*`);
              return (
                <Link
                  key={item.route}
                  href={route(item.route)}
                  onClick={closeSidebar}
                  title={item.label}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="flex-shrink-0 w-5 h-5" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User + actions footer */}
          <div className="p-2 border-t border-gray-200 lg:p-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full">
                <span className="text-xs font-semibold text-gray-600">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <Link
                href={route("home")}
                onClick={closeSidebar}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="flex-shrink-0 w-4 h-4" />
                <span>Back to App</span>
              </Link>
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="flex items-center w-full gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut className="flex-shrink-0 w-4 h-4" />
                <span>Log Out</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile top bar with toggle */}
        <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="inline-flex items-center justify-center -ml-1 text-gray-600 transition rounded-md w-9 h-9 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeftOpen className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-red-600 rounded-md w-7 h-7">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="text-base font-semibold text-gray-900">Admin</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
