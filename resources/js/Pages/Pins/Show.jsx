import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function Show({ pin }) {
    const { flash } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {
        data,
        setData,
        post: handlePost,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        title: pin.title ?? "",
        description: pin.description ?? "",
        image: null,
    });

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] ?? null;

        setData("image", file);

        if (!file) {
            setPreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        destroy(route("pins.delete", pin.id), {
            onSuccess: (page) => {
                toast.success(page.props.flash.success);
            },
        });
    };

    const submit = (event) => {
        event.preventDefault();

        handlePost(route("pins.update", pin.id), {
            _method: "patch",
            forceFormData: true,
            onSuccess: (page) => {
                setIsEditing(false);
                setPreview(null);
                reset("image");
                toast.success(page.props.flash.success);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={pin.title} />

            <div className="py-12">
                <Toaster />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="absolute top-0 left-0">
                            <button
                                type="button"
                                onClick={() => router.visit(route("home"))}
                                className="inline-flex items-center p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
                            >
                                <ArrowLeft size={24} />
                            </button>
                        </div>
                        <div className="grid gap-8 p-6 md:grid-cols-2">
                            <div className="flex items-center justify-center">
                                {(preview || pin.image_path) && (
                                    <img
                                        src={
                                            preview ||
                                            `/storage/${pin.image_path}`
                                        }
                                        alt={pin.title}
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                )}
                            </div>

                            <div className="relative">
                                <div className="absolute top-0 right-0 flex gap-2">
                                    {!isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                                className="inline-flex items-center text-indigo-600"
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDelete}
                                                className="inline-flex items-center text-red-600"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </>
                                    ) : (
                                        <SecondaryButton
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setPreview(null);
                                                reset(
                                                    "title",
                                                    "description",
                                                    "image",
                                                );
                                            }}
                                        >
                                            Cancel
                                        </SecondaryButton>
                                    )}
                                </div>

                                {!isEditing ? (
                                    <div className="pt-12">
                                        <h1 className="mb-4 text-4xl font-black text-gray-900">
                                            {pin.title.charAt(0).toUpperCase() +
                                                pin.title.slice(1)}
                                        </h1>

                                        {pin.description && (
                                            <div className="mb-6">
                                                <p className="text-gray-600 whitespace-pre-line">
                                                    {pin.description}
                                                </p>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <p className="text-sm text-gray-500">
                                                Created on{" "}
                                                {new Date(
                                                    pin.created_at,
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
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
                                                onChange={(event) =>
                                                    setData(
                                                        "title",
                                                        event.target.value,
                                                    )
                                                }
                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                rows={6}
                                                value={data.description}
                                                onChange={(event) =>
                                                    setData(
                                                        "description",
                                                        event.target.value,
                                                    )
                                                }
                                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
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
                                            <InputError
                                                message={errors.image}
                                                className="mt-2"
                                            />
                                        </div>

                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing}
                                            className="mt-6"
                                        >
                                            Save Changes
                                        </PrimaryButton>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <div className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Delete Pin
                    </h2>
                    <p className="mb-6 text-gray-600">
                        Are you sure you want to delete this pin? This action
                        cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
