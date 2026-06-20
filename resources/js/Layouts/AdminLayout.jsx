import { Link, usePage, Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    Image,
    Activity,
    LogOut,
    Settings,
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

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title={title ? `${title} - Admin` : "Admin"} />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-56 overflow-y-auto bg-white border-r border-gray-200 transition-all duration-300 ease-in-out lg:sticky lg:z-30 lg:translate-x-0 ${sidebarOpen
                    ? "w-[65%] translate-x-0"
                    : "w-[72px] -translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex items-center h-16 border-b border-gray-200 px-4 lg:px-6">
                    <Link
                        href={route("admin.dashboard")}
                        className="flex items-center gap-2 overflow-hidden"
                    >
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-600 rounded-lg">
                            <span className="text-sm font-bold text-white">
                                A
                            </span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900 whitespace-nowrap lg:hidden">
                            Admin Panel
                        </span>
                        <span className="hidden text-lg font-semibold text-gray-900 whitespace-nowrap lg:inline">
                            Admin Panel
                        </span>
                    </Link>
                </div>

                <nav className="p-2 space-y-1 lg:p-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            route().current(item.route) ||
                            route().current(`${item.route}*`);
                        return (
                            <Link
                                key={item.route}
                                href={route(item.route)}
                                title={item.label}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-red-50 text-red-700"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                            >
                                <Icon className="flex-shrink-0 w-5 h-5" />
                                <span className="lg:hidden whitespace-nowrap">
                                    {item.label}
                                </span>
                                <span className="hidden lg:inline whitespace-nowrap">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200 lg:p-4">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full">
                            <span className="text-xs font-semibold text-gray-600">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0 lg:hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                                {user.role}
                            </p>
                        </div>
                        <div className="hidden flex-1 min-w-0 lg:block">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                                {user.role}
                            </p>
                        </div>
                    </div>
                    <div className="mt-2 space-y-1">
                        <Link
                            href={route("home")}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                            <Settings className="flex-shrink-0 w-4 h-4" />
                            <span className="lg:hidden">Back to App</span>
                            <span className="hidden lg:inline">
                                Back to App
                            </span>
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center w-full gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
                        >
                            <LogOut className="flex-shrink-0 w-4 h-4" />
                            <span className="lg:hidden">Log Out</span>
                            <span className="hidden lg:inline">Log Out</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 lg:ml-0">
                {/* Top bar with toggle */}
                <div className="sticky top-0 z-20 flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 lg:px-8">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:hidden"
                        aria-label="Toggle sidebar"
                    >
                        {sidebarOpen ? (
                            <PanelLeftClose className="w-5 h-5" />
                        ) : (
                            <PanelLeftOpen className="w-5 h-5" />
                        )}
                    </button>
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="flex items-center justify-center w-7 h-7 bg-red-600 rounded-md">
                            <span className="text-xs font-bold text-white">
                                A
                            </span>
                        </div>
                        <span className="text-base font-semibold text-gray-900">
                            Admin
                        </span>
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
