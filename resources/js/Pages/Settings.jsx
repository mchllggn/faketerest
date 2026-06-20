import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Toaster } from "sonner";
import { User, Lock } from "lucide-react";
import AccountTab from "@/Components/AccountTab";

const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("account");

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
                    {activeTab === "account" && <AccountTab />}

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
        </AuthenticatedLayout>
    );
}
