import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { Toaster } from "sonner";
import { ArrowLeft } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Show({ profileUser, pins }) {
  return (
    <AuthenticatedLayout>
      <Head title={profileUser.name} />
      <Toaster />
      <div className="max-w-6xl px-6 py-12 mx-auto">
        <button
          type="button"
          onClick={() => router.visit(route("home"))}
          className="inline-flex items-center p-2 mb-4 text-gray-600 rounded-md hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center justify-center w-24 h-24 text-2xl font-semibold uppercase bg-red-100 rounded-full text-slate-800">
              {profileUser.name ? profileUser.name.charAt(0) : ""}
            </div>
            <div className="text-2xl font-semibold capitalize">
              {profileUser.name}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium text-gray-700">Pins</h3>
          {pins.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-4">
              {pins.map((pin) => (
                <Link key={pin.id} href={route("pins.show", pin.id)}>
                  <div className="overflow-hidden rounded-lg shadow-sm cursor-pointer group">
                    {pin.image_path ? (
                      <img
                        src={
                          pin.image_path.startsWith("http")
                            ? pin.image_path
                            : `/storage/${pin.image_path}`
                        }
                        alt={pin.title}
                        className="object-cover w-full h-full transition-all duration-200 group-hover:brightness-75"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-48 bg-gray-100">
                        {pin.title}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-500">
              This user hasn't created any pins yet.
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
