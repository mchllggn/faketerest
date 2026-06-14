import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Toaster } from "sonner";

export default function Home({ pins = [] }) {
    return (
        <AuthenticatedLayout title={"Home"}>
            <Toaster />
            <div className="px-3 py-6 sm:px-4 sm:py-8 md:py-12">
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
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:gap-6">
                            {pins.map((pin) => (
                                <Link
                                    key={pin.id}
                                    href={route("pins.show", pin.id)}
                                >
                                    <div className="overflow-hidden rounded-lg shadow-sm cursor-pointer group aspect-square">
                                        {pin.image_path && (
                                            <img
                                                src={
                                                    pin.image_path.startsWith(
                                                        "http",
                                                    )
                                                        ? pin.image_path
                                                        : `/storage/${pin.image_path}`
                                                }
                                                alt={pin.title}
                                                className="object-cover w-full h-full transition-all duration-200 group-hover:brightness-75"
                                            />
                                        )}
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
