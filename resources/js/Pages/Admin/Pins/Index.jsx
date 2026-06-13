import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Search, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Index({ pins, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    const handleFilter = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        window.location =
            route("admin.pins.index") + (params.toString() ? `?${params}` : "");
    };

    const handleDelete = (pin) => {
        if (confirm(`Delete pin "${pin.title}"? This cannot be undone.`)) {
            router.delete(route("admin.pins.destroy", pin.id));
        }
    };

    return (
        <AdminLayout title="Pins">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pins</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage all pins in the application
                    </p>
                </div>

                {/* Search */}
                <form
                    onSubmit={handleFilter}
                    className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search pins by title or description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Search
                    </button>
                </form>

                {/* Pins Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {pins.data.map((pin) => (
                        <div
                            key={pin.id}
                            className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            {pin.image_path ? (
                                <img
                                    src={pin.image_path}
                                    alt={pin.title}
                                    className="object-cover w-full aspect-square"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full bg-gray-100 aspect-square">
                                    <span className="text-xs text-gray-400">
                                        No image
                                    </span>
                                </div>
                            )}
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {pin.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    by {pin.user?.name ?? "Unknown"}
                                </p>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={route("admin.pins.show", pin.id)}
                                    className="p-1.5 bg-white rounded-lg shadow hover:bg-gray-50"
                                >
                                    <Eye className="w-4 h-4 text-gray-600" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(pin)}
                                    className="p-1.5 bg-white rounded-lg shadow hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {pins.data.length === 0 && (
                    <p className="p-8 text-center text-sm text-gray-500 bg-white rounded-xl">
                        No pins found.
                    </p>
                )}

                {/* Pagination */}
                {pins.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {pins.links.map((link, i) => (
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
