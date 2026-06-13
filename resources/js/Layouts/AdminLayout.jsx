import { Link, usePage, Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    Image,
    Activity,
    LogOut,
    Settings,
} from "lucide-react";

const navItems = [
    { route: "admin.dashboard", label: "Dashboard", icon: LayoutDashboard },
    { route: "admin.users.index", label: "Users", icon: Users },
    { route: "admin.pins.index", label: "Pins", icon: Image },
    { route: "admin.activity.index", label: "Activity Logs", icon: Activity },
];

export default function AdminLayout({ title, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title={title ? `${title} - Admin` : "Admin"} />

            {/* Sidebar */}
            <aside className="sticky top-0 z-30 flex-shrink-0 w-64 h-screen overflow-y-auto bg-white border-r border-gray-200">
                <div className="flex items-center h-16 px-6 border-b border-gray-200">
                    <Link
                        href={route("admin.dashboard")}
                        className="flex items-center gap-2"
                    >
                        <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-lg">
                            <span className="text-sm font-bold text-white">
                                A
                            </span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                            Admin Panel
                        </span>
                    </Link>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            route().current(item.route) ||
                            route().current(`${item.route}*`);
                        return (
                            <Link
                                key={item.route}
                                href={route(item.route)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-red-50 text-red-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                            <span className="text-xs font-semibold text-gray-600">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
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
                            <Settings className="w-4 h-4" />
                            Back to App
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center w-full gap-3 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
