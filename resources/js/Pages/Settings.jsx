import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { toast } from "sonner";
import { Toaster } from "sonner";
import {
    User,
    Mail,
    Lock,
    ShieldAlert,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";

const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
];

export default function Settings() {
    const user = usePage().props.auth.user;
    const [activeTab, setActiveTab] = useState("account");
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
        password_confirmation: "",
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => {
                reset("password", "password_confirmation");
                toast.success("Profile updated successfully");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update profile");
            },
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
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

            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar Navigation - visible on sm+ */}
                <aside className="hidden w-64 p-4 overflow-y-auto bg-white border-r border-gray-200 sm:block shrink-0">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        Settings
                    </h2>
                    <nav className="space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isActive
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 ${
                                            isActive
                                                ? "text-red-800"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content - always visible */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Horizontal Top Bar - visible below sm */}
                    <div className="px-3 py-2 mb-6 bg-white border border-gray-200 sm:hidden rounded-xl">
                        <nav className="flex gap-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                            isActive
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 ${
                                                isActive
                                                    ? "text-red-800"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                    <Toaster position="top-right" richColors />

                    {/* Content based on active tab */}
                    {activeTab === "account" && (
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-800/10">
                                            <User className="w-5 h-5 text-red-800" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Profile Information
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Update your personal details
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <form
                                    onSubmit={handleProfileSubmit}
                                    className="p-6 space-y-6"
                                >
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <InputLabel
                                                htmlFor="name"
                                                value="Full Name"
                                            />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <TextInput
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="block w-full pl-10"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email Address"
                                            />
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <TextInput
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="block w-full pl-10"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Section */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lock className="w-4 h-4 text-gray-400" />
                                            <h3 className="text-sm font-medium text-gray-700">
                                                Change Password
                                            </h3>
                                        </div>
                                        <p className="mb-4 text-xs text-gray-400">
                                            Leave these fields empty if you
                                            don&apos;t want to change your
                                            password.
                                        </p>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-1.5">
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="New Password"
                                                />
                                                <TextInput
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="block w-full"
                                                    placeholder="••••••••"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <InputLabel
                                                    htmlFor="confirm-password"
                                                    value="Confirm Password"
                                                />
                                                <TextInput
                                                    type="password"
                                                    id="confirm-password"
                                                    name="confirm-password"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "password_confirmation",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="block w-full"
                                                    placeholder="••••••••"
                                                />
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Changes are saved securely
                                        </p>
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                        >
                                            {processing
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>

                            {/* Danger Zone */}
                            <div className="overflow-hidden bg-white border border-red-200 shadow-sm rounded-2xl">
                                <div className="px-6 py-5 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                                            <ShieldAlert className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-red-900">
                                                Danger Zone
                                            </h2>
                                            <p className="text-sm text-red-600/70">
                                                Irreversible actions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">
                                                Delete Account
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Once deleted, your account and
                                                all data cannot be recovered.
                                            </p>
                                        </div>
                                        <DangerButton
                                            onClick={() =>
                                                setConfirmingUserDeletion(true)
                                            }
                                            type="button"
                                            className="shrink-0"
                                        >
                                            Delete Account
                                        </DangerButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-800/10">
                                            <Lock className="w-5 h-5 text-red-800" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Security Settings
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Manage your security preferences
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-center py-12 text-center">
                                        <div className="space-y-2">
                                            <Lock className="w-12 h-12 mx-auto text-gray-300" />
                                            <p className="text-sm font-medium text-gray-500">
                                                Security settings coming soon
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Two-factor authentication and
                                                more
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Delete Account Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={handleDelete} className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full shrink-0">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Delete Account
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete your account?
                                All of your data will be permanently removed.
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="delete-password"
                            value="Confirm Password"
                            className="sr-only"
                        />
                        <TextInput
                            id="delete-password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-full"
                            isFocused
                            placeholder="Enter your password to confirm"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton type="submit" disabled={processing}>
                            {processing ? "Deleting..." : "Delete Account"}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
