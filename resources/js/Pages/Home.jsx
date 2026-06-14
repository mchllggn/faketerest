import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Toaster } from "sonner";

export default function Home({ pins = [] }) {
    return (
        <AuthenticatedLayout title={"Home"}>
            <Toaster />
            <div className="px-4 py-4 sm:px-6 sm:py-6">
                <div className="mx-auto max-w-7xl">
                    {pins.length === 0 ? (
                        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                            <div className="p-6 text-center text-gray-900 sm:p-8">
                                <p className="text-base sm:text-lg">
                                    You haven't created any pins yet.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="gap-4 columns-2 sm:columns-3 md:columns-4">
                            {pins.map((pin) => (
                                <Link
                                    key={pin.id}
                                    href={route("pins.show", pin.id)}
                                    className="block mb-4 break-inside-avoid"
                                >
                                    <div className="overflow-hidden rounded-lg shadow-sm cursor-pointer group">
                                        <img
                                            src={
                                                pin.image_path.startsWith(
                                                    "http",
                                                )
                                                    ? pin.image_path
                                                    : `/storage/${pin.image_path}`
                                            }
                                            alt={pin.title}
                                            className="object-cover w-full transition-all duration-200 group-hover:brightness-75"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
