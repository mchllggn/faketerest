import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    Trash2,
    AlertTriangle,
    Shield,
    Image,
    User,
    Clock,
    CheckCircle,
    ArrowLeft,
} from "lucide-react";

export default function DataDeletion({ auth }) {
    const [confirmed, setConfirmed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (!confirmed) return;
        destroy(route("data.deletion.execute"), {
            onSuccess: () => setShowSuccess(true),
        });
    };

    if (showSuccess) {
        return (
            <>
                <Head title="Account Deleted" />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            Account Deleted
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Your account and all associated data have been
                            scheduled for deletion. You will be logged out
                            shortly.
                        </p>
                        <Link
                            href={route("landing-page")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return Home
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Data Deletion" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Link
                            href={route("settings.index")}
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Settings
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
                        <div className="flex items-center gap-3 mb-2">
                            <Trash2 className="w-8 h-8 text-red-500" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                Data Deletion
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500 mb-8">
                            Permanently delete your account and all associated
                            data.
                        </p>

                        {/* Warning Banner */}
                        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-red-800 mb-1">
                                        This action is irreversible
                                    </h3>
                                    <p className="text-sm text-red-700">
                                        Once you delete your account, there is
                                        no way to recover your data. Please make
                                        sure this is what you want.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* What will be deleted */}
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            What will be deleted
                        </h2>
                        <div className="space-y-3 mb-8">
                            {[
                                {
                                    icon: User,
                                    label: "Your profile",
                                    desc: "Name, email, and account information",
                                },
                                {
                                    icon: Image,
                                    label: "Your pins",
                                    desc: "All pins and uploaded images",
                                },
                                {
                                    icon: Shield,
                                    label: "Activity logs",
                                    desc: "All recorded activity and history",
                                },
                                {
                                    icon: Clock,
                                    label: "Session data",
                                    desc: "Active sessions and authentication tokens",
                                },
                            ].map(({ icon: Icon, label, desc }) => (
                                <div
                                    key={label}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                                >
                                    <Icon className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm">
                                            {label}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Confirmation */}
                        <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors mb-6">
                            <input
                                type="checkbox"
                                checked={confirmed}
                                onChange={(e) => setConfirmed(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">
                                I understand that this action is permanent and
                                irreversible. I want to delete my account and
                                all associated data.
                            </span>
                        </label>

                        {/* Delete Button */}
                        <button
                            onClick={handleDelete}
                            disabled={!confirmed || processing}
                            className={`w-full py-3.5 rounded-full font-semibold text-white transition-all ${
                                confirmed && !processing
                                    ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                        >
                            {processing ? (
                                <span className="inline-flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Deleting...
                                </span>
                            ) : (
                                "Delete My Account"
                            )}
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}
