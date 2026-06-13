import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { ArrowLeft, Trash2, Calendar, User } from "lucide-react";

export default function Show({ pin, activity }) {
    const handleDelete = () => {
        if (confirm(`Delete pin "${pin.title}"? This cannot be undone.`)) {
            router.delete(route("admin.pins.destroy", pin.id));
        }
    };

    return (
        <AdminLayout title={`Pin: ${pin.title}`}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.pins.index")}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {pin.title}
                        </h1>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Pin
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Pin Image */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {pin.image_path ? (
                                <img
                                    src={pin.image_path}
                                    alt={pin.title}
                                    className="w-full rounded-xl"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-96 bg-gray-100">
                                    <span className="text-gray-400">
                                        No image
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pin Details */}
                    <div className="space-y-6">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Details
                            </h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">
                                        Title
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        {pin.title}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">
                                        Description
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        {pin.description || "No description"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">
                                        Author
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <Link
                                            href={route(
                                                "admin.users.show",
                                                pin.user?.id,
                                            )}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            {pin.user?.name ?? "Unknown"}
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">
                                        Created
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <p className="text-sm text-gray-900">
                                            {new Date(
                                                pin.created_at,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">
                                        Updated
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        {new Date(
                                            pin.updated_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Activity
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {activity.length === 0 ? (
                                    <p className="p-4 text-sm text-gray-500">
                                        No activity recorded.
                                    </p>
                                ) : (
                                    activity.map((log) => (
                                        <div key={log.id} className="p-4">
                                            <p className="text-sm text-gray-900">
                                                {log.action}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                by {log.user?.name ?? "System"}{" "}
                                                ·{" "}
                                                {new Date(
                                                    log.created_at,
                                                ).toLocaleString()}
                                            </p>
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
