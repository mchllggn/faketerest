import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Profile({ posts = [] }) {
    const user = usePage().props.auth.user;
    const [activeTab, setActiveTab] = useState("pins");
    const [sortTab, setSortTab] = useState("created");

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl px-6 py-12 mx-auto">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="flex items-center mb-4 space-x-4">
                        <div className="flex items-center justify-center w-24 h-24 text-2xl font-semibold uppercase bg-red-100 rounded-full text-slate-800">
                            {user.name ? user.name.charAt(0) : ""}
                        </div>
                        <div className="text-2xl font-semibold capitalize">
                            {user.name}
                        </div>
                    </div>
                    <Link
                        href={route("posts.create")}
                        className="px-6 py-3 text-white bg-red-600 rounded-full"
                    >
                        Create
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
                    <div className="flex items-center space-x-4 ">
                        <button
                            onClick={() => setSortTab("saved")}
                            className={`${sortTab === "saved" ? " bg-gray-800 text-white" : "bg-gray-300 text-gray-800"} px-4 py-2 rounded-full font-semibold`}
                        >
                            Your Saved
                        </button>
                        <button
                            onClick={() => setSortTab("created")}
                            className={`${sortTab === "created" ? " bg-gray-800 text-white" : "bg-gray-300 text-gray-800"} px-4 py-2 rounded-full font-semibold`}
                        >
                            Created by You
                        </button>
                    </div>
                </nav>

                <div className="mt-8 text-center">
                    {activeTab === "pins" ? (
                        posts.length === 0 ? (
                            <div className="mt-20">
                                <p className="text-gray-500">
                                    You haven't created any posts yet.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route("posts.create")}
                                        className="px-6 py-3 text-white bg-red-600 rounded-full"
                                    >
                                        Create a board
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route("posts.show", post.id)}
                                    >
                                        <div className="overflow-hidden rounded-lg shadow-sm cursor-pointer group">
                                            {post.image_path ? (
                                                <img
                                                    src={`/storage/${post.image_path}`}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover aspect-[9/16] group-hover:brightness-75 transition-all duration-200"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-48 bg-gray-100">
                                                    {post.title}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                    ) : activeTab === "boards" ? (
                        <div>Boards</div>
                    ) : null}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
