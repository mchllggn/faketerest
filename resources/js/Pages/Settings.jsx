import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@headlessui/react";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { toast } from "sonner";
import { Toaster } from "sonner";

export default function Settings() {
    const user = usePage().props.auth.user;
    const [activeTab, setActiveTab] = useState("account");
    const [isEdit, setIsEdit] = useState(false);
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        delete: destroy,
        setData,
        patch,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        confirm_password: "",
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => {
                reset();
                toast("Profile updated successfully");
            },
            onError: () => {
                toast("Failed to update profile");
            },
        });
    };

    const handleDelete = () => {
        if (passwordInput.current.value === "") {
            passwordInput.current.focus();
            return;
        }

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
                passwordInput.current.focus();
                setData("password", "");
            },
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout title="Settings">
            <Head title="Settings" />

            <div className="flex">
                {/* Sidebar Navigation */}
                <aside className="w-64 p-4 border-r border-gray-200 bg-gray-50">
                    <h2 className="mb-4 text-lg font-semibold">Settings</h2>
                    <nav className="space-y-2">
                        <Button
                            onClick={() => setActiveTab("account")}
                            className={`block px-3 py-2 rounded-md ${
                                activeTab === "account"
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >
                            Account
                        </Button>
                    </nav>
                </aside>

                <main className="flex-1 p-6">
                    <Toaster position="top-right" />
                    {activeTab === "account" && (
                        <form onSubmit={handleProfileSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="block w-full mt-1"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="block w-full mt-1"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                {/* passsword */}
                                <div className="space-y-2">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="block w-full mt-1"
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                {/* comfirm password */}
                                <div className="space-y-2">
                                    <InputLabel
                                        htmlFor="confirm-password"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        type="password"
                                        id="confirm-password"
                                        name="confirm-password"
                                        value={data.confirm_password}
                                        onChange={(e) =>
                                            setData(
                                                "confirm_password",
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full mt-1"
                                    />
                                    <InputError
                                        message={errors.confirm_password}
                                        className="mt-2"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </Button>
                            </div>
                            <div className="mt-16">
                                <h2 className="text-2xl font-semibold text-red-500">
                                    <strong>Danger</strong>
                                </h2>
                                <Button
                                    onClick={() =>
                                        setConfirmingUserDeletion(true)
                                    }
                                    type="button"
                                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </form>
                    )}
                </main>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={handleDelete} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-3/4 mt-1"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
