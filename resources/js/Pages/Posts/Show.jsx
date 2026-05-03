import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ post }) {
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: post.title ?? '',
        description: post.description ?? '',
        image: null,
    });

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] ?? null;

        setData('image', file);

        if (!file) {
            setPreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const submit = (event) => {
        event.preventDefault();

        patch(route('posts.update', post.id), {
            onSuccess: () => {
                setIsEditing(false);
                setPreview(null);
                reset('image');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={post.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="grid gap-8 p-6 md:grid-cols-2">
                            <div className="flex items-center justify-center">
                                {(preview || post.image_path) && (
                                    <img
                                        src={preview || `/storage/${post.image_path}`}
                                        alt={post.title}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                )}
                            </div>

                            <div className="relative">
                                <div className="absolute top-0 right-0">
                                    {!isEditing ? (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                        >
                                            edit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setPreview(null);
                                                reset('title', 'description', 'image');
                                            }}
                                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>

                                {!isEditing ? (
                                    <div className="pt-12">
                                        <h1 className="mb-4 text-4xl font-black text-gray-900">
                                            {post.title}
                                        </h1>

                                        {post.description && (
                                            <div className="mb-6">
                                                <p className="text-gray-600 whitespace-pre-line">
                                                    {post.description}
                                                </p>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <p className="text-sm text-gray-500">
                                                Created on {new Date(post.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>

                                        <Link
                                            href={route('home')}
                                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                        >
                                            Back to Posts
                                        </Link>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="pt-12">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(event) => setData('title', event.target.value)}
                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                rows={6}
                                                value={data.description}
                                                onChange={(event) => setData('description', event.target.value)}
                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Replace image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="block w-full mt-1 text-sm text-gray-700"
                                            />
                                            <InputError message={errors.image} className="mt-2" />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 mt-6 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            Save Changes
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
