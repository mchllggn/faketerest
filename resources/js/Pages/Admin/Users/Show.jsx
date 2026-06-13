import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, useForm } from "@inertiajs/react";
import { ArrowLeft, Trash2, Shield } from "lucide-react";

export default function Show({ user, activity }) {
    const { post: updateRole, processing: roleProcessing } = useForm({
        role: user.role,
    });

    const handleRoleChange = (newRole) => {
        if (newRole === user.role) return;
        updateRole(route("admin.users.role", user.id), {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (
            confirm(
                `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
            )
        ) {
            router.delete(route("admin.users.destroy", user.id));
        }
    };

    return (
        <AdminLayout title={`User: ${user.name}`}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.users.index")}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {user.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete User
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* User Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
                                    <span className="text-2xl font-bold text-gray-600">
                                        {user.name?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                                <span
                                    className={`mt-2 text-xs font-medium px-3 py-1 rounded-full ${
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

                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Total Pins
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {user.pins_count}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Joined
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Email Verified
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {user.email_verified_at ? "Yes" : "No"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Role Management (admin only) */}
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <Shield className="w-4 h-4" />
                                Change Role
                            </h3>
                            <div className="mt-4 space-y-2">
                                {["admin", "moderator", "user"].map((r) => (
                                    <label
                                        key={r}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                            user.role === r
                                                ? "border-red-200 bg-red-50"
                                                : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={r}
                                            checked={user.role === r}
                                            onChange={() => handleRoleChange(r)}
                                            className="text-red-600 focus:ring-red-500"
                                        />
                                        <span className="text-sm font-medium text-gray-900 capitalize">
                                            {r}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activity & Pins */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* User's Pins */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Pins ({user.pins_count})
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
                                {user.pins?.map((pin) => (
                                    <div
                                        key={pin.id}
                                        className="group relative"
                                    >
                                        {pin.image_path ? (
                                            <img
                                                src={pin.image_path}
                                                alt={pin.title}
                                                className="object-cover w-full rounded-lg aspect-square"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full bg-gray-100 rounded-lg aspect-square">
                                                <span className="text-xs text-gray-400">
                                                    No image
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-xs text-white truncate">
                                                {pin.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {(!user.pins || user.pins.length === 0) && (
                                    <p className="col-span-full text-sm text-gray-500 text-center py-8">
                                        No pins yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Activity Log */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Activity Log
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {activity.length === 0 ? (
                                    <p className="p-6 text-sm text-gray-500">
                                        No activity recorded.
                                    </p>
                                ) : (
                                    activity.map((log) => (
                                        <div
                                            key={log.id}
                                            className="flex items-center justify-between p-4"
                                        >
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    {log.action}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {log.model_type &&
                                                        `${log.model_type.split("\\").pop()} #${log.model_id}`}
                                                </p>
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
                </div>
            </div>
        </AdminLayout>
    );
}
