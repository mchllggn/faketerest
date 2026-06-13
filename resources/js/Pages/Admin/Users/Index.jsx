import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState } from "react";

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [role, setRole] = useState(filters.role || "all");

    const handleFilter = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (role && role !== "all") params.set("role", role);
        window.location =
            route("admin.users.index") +
            (params.toString() ? `?${params}` : "");
    };

    return (
        <AdminLayout title="Users">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage application users
                    </p>
                </div>

                {/* Filters */}
                <form
                    onSubmit={handleFilter}
                    className="flex flex-wrap gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-xl"
                >
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="user">User</option>
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Filter
                    </button>
                </form>

                {/* Users Table */}
                <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                                    User
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                                    Pins
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-left text-gray-500 uppercase">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-right text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
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
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                                user.role === "admin"
                                                    ? "bg-red-100 text-red-700"
                                                    : user.role === "moderator"
                                                      ? "bg-blue-100 text-blue-700"
                                                      : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.pins_count}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={route(
                                                "admin.users.show",
                                                user.id,
                                            )}
                                            className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.data.length === 0 && (
                        <p className="p-8 text-sm text-center text-gray-500">
                            No users found.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {users.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                disabled={!link.url}
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
