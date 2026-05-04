import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Home({ posts = [] }) {
    return (
        <AuthenticatedLayout title={"Home"}>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {posts.length === 0 ? (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center text-gray-900">
                                <p className="mb-4">You haven't created any posts yet.</p>
                                <Link
                                    href={route('posts.create')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Create your first post
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-6">
                            {posts.map((post) => (
                                <Link key={post.id} href={route('posts.show', post.id)}>
                                    <div className="overflow-hidden rounded-lg shadow-sm cursor-pointer group">
                                        {post.image_path && (
                                            <img
                                                src={`/storage/${post.image_path}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover aspect-[9/16] group-hover:brightness-75 transition-all duration-200"
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
