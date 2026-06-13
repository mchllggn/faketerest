import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ logs, actions, filters }) {
    const [action, setAction] = useState(filters.action || "");
    const [modelType, setModelType] = useState(filters.model_type || "");

    const handleFilter = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (action) params.set("action", action);
        if (modelType) params.set("model_type", modelType);
        window.location =
            route("admin.activity.index") +
            (params.toString() ? `?${params}` : "");
    };

    return (
        <AdminLayout title="Activity Logs">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Activity Logs
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor all system activity
                    </p>
                </div>

                {/* Filters */}
                <form
                    onSubmit={handleFilter}
                    className="flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                >
                    <input
                        type="text"
                        placeholder="Filter by action..."
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="flex-1 min-w-[200px] px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="text"
                        placeholder="Filter by model type..."
                        value={modelType}
                        onChange={(e) => setModelType(e.target.value)}
                        className="flex-1 min-w-[200px] px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Filter
                    </button>
                </form>

                {/* Logs Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Action
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Model
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    IP Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {logs.data.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-900">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {log.model_type ? (
                                                <>
                                                    <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                                                        {log.model_type
                                                            .split("\\")
                                                            .pop()}
                                                    </span>
                                                    <span className="ml-2 text-gray-400">
                                                        #{log.model_id}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
                                                <span className="text-[10px] font-semibold text-gray-600">
                                                    {log.user?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() ?? "?"}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {log.user?.name ?? "System"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                        {log.ip_address ?? "—"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(
                                            log.created_at,
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {logs.data.length === 0 && (
                        <p className="p-8 text-center text-sm text-gray-500">
                            No activity logs found.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {logs.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {logs.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={`px-3 py-2 text-sm rounded-lg ${
                                    link.active
                                        ? "bg-red-600 text-white"
                                        : link.url
                                          ? "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
