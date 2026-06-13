import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Toaster } from "sonner";

export default function Home({ pins = [] }) {
    return (
        <AuthenticatedLayout title={"Home"}>
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {pins.length === 0 ? (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="text-center text-gray-900">
                                <p>You haven't created any pins yet.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-4">
                            {pins.map((pin) => (
                                <Link
                                    key={pin.id}
                                    href={route("pins.show", pin.id)}
                                >
                                    <div className="overflow-hidden rounded-lg shadow-sm cursor-pointer group">
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
