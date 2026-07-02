import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Profile({ pins = [] }) {
  const user = usePage().props.auth.user;
  const [activeTab, setActiveTab] = useState("pins");

  return (
    <AuthenticatedLayout>
      <Toaster
        toastOptions={{
          classNames: {
            success: "[&_svg]:text-green-500",
            error: "[&_svg]:text-red-500",
          },
        }}
      />
      <div className="max-w-6xl px-6 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center justify-center w-24 h-24 text-2xl font-semibold uppercase bg-red-100 rounded-full text-slate-800">
              {user.name ? user.name.charAt(0) : ""}
            </div>
            <div className="text-2xl font-semibold capitalize">{user.name}</div>
          </div>
          <Link href={route("pins.create")}>
            <PrimaryButton>Create</PrimaryButton>
          </Link>
        </div>

        <nav>
          <div className="flex items-center justify-center mb-2 space-x-8">
            <button
              onClick={() => setActiveTab("pins")}
              className={`${activeTab === "pins" ? "underline" : ""} text-lg font-medium text-gray-700 hover:underline underline-offset-4 decoration-2`}
            >
              Pins
            </button>
            <button
              onClick={() => setActiveTab("boards")}
              className={`${activeTab === "boards" ? "underline" : ""} text-lg font-medium text-gray-700 hover:underline underline-offset-4 decoration-2`}
            >
              Boards
            </button>
          </div>
        </nav>

        <div className="mt-8 text-center">
          {activeTab === "pins" && (
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
          )}
          {activeTab === "boards" && <div>You don't have boards yet.</div>}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
