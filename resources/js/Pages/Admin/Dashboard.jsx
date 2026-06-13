import AdminLayout from "@/Layouts/AdminLayout";
import { Users, Image, TrendingUp, Calendar } from "lucide-react";

const statCards = (stats) => [
    {
        label: "Total Users",
        value: stats.totalUsers,
        icon: Users,
        color: "bg-blue-500",
    },
    {
        label: "Total Pins",
        value: stats.totalPins,
        icon: Image,
        color: "bg-purple-500",
    },
    {
        label: "New Users Today",
        value: stats.usersToday,
        icon: TrendingUp,
        color: "bg-green-500",
    },
    {
        label: "New Pins Today",
        value: stats.pinsToday,
        icon: Calendar,
        color: "bg-orange-500",
    },
];

export default function Dashboard({
    stats,
    recentActivity,
    recentUsers,
    recentPins,
}) {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Overview of your application
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards(stats).map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`p-3 rounded-lg ${stat.color}`}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {stat.value.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Users */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Recent Users
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentUsers.length === 0 ? (
                                <p className="p-6 text-sm text-gray-500">
                                    No users yet.
                                </p>
                            ) : (
                                recentUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                                                <span className="text-xs font-semibold text-gray-600">
                                                    {user.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                user.role === "admin"
                                                    ? "bg-red-100 text-red-700"
                                                    : user.role === "moderator"
                                                      ? "bg-blue-100 text-blue-700"
                                                      : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Pins */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Recent Pins
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentPins.length === 0 ? (
                                <p className="p-6 text-sm text-gray-500">
                                    No pins yet.
                                </p>
                            ) : (
                                recentPins.map((pin) => (
                                    <div
                                        key={pin.id}
                                        className="flex items-center gap-4 p-4 hover:bg-gray-50"
                                    >
                                        {pin.image_path && (
                                            <img
                                                src={pin.image_path}
                                                alt={pin.title}
                                                className="object-cover w-12 h-12 rounded-lg"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {pin.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                by {pin.user?.name ?? "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Activity
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentActivity.length === 0 ? (
                            <p className="p-6 text-sm text-gray-500">
                                No activity yet.
                            </p>
                        ) : (
                            recentActivity.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                            <span className="text-xs font-semibold text-gray-600">
                                                {log.user?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ?? "?"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">
                                                    {log.user?.name ?? "System"}
                                                </span>{" "}
                                                {log.action}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {log.model_type &&
                                                    `${log.model_type.split("\\").pop()} #${log.model_id}`}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(
                                            log.created_at,
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
