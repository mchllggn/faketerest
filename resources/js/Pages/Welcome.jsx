import AuthModal from "@/Components/AuthModal";
import { router } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth }) {
    const isAuthenticated = Boolean(auth?.user);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState("login");

    const openAuthModal = (nextMode) => {
        setAuthModalMode(nextMode);
        setAuthModalOpen(true);
    };

    return (
        <>
            <Head title="Welcome" />

            {/* Background */}
            <div className="h-screen relative overflow-hidden bg-[#faf6f0] text-zinc-950">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#e60023]/15 blur-3xl" />
                    <div className="absolute -bottom-24 left-[-120px] h-[420px] w-[420px] rounded-full bg-[#ffb18f]/35 blur-3xl" />
                </div>

                <header className="relative z-10 px-5 pt-4 sm:px-8 lg:px-10">
                    <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-full px-1 py-2">
                        <div className="flex items-center gap-8">
                            <button type="button" disabled="landing-page">
                                <span className="text-[1.6rem] font-extrabold tracking-[-0.06em] text-[#e60023]">
                                    Faketerest
                                </span>
                            </button>
                        </div>

                        <div className="items-center hidden gap-3 md:flex">
                            {isAuthenticated ? (
                                <Link
                                    href={route("home")}
                                    className="rounded-full bg-[#e60023] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#c4001f]"
                                >
                                    Create
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => openAuthModal("login")}
                                    className="rounded-full bg-[#e60023] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#c4001f]"
                                >
                                    Log in
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center px-5 pb-10 pt-2 sm:px-8 lg:px-10">
                    {/* Hero */}
                    <section className="w-full pt-8 mt-12 text-center">
                        <div className="flex flex-col items-center gap-5 mx-auto">
                            <h1 className="text-8xl font-semibold text-[#ffb18f]">
                                Faketerest
                            </h1>
                            <p className="text-4xl font-semibold text-zinc-700">
                                A Pinterest Clone
                            </p>
                        </div>
                    </section>
                </main>
                <AuthModal
                    show={authModalOpen}
                    mode={authModalMode}
                    onClose={() => setAuthModalOpen(false)}
                />
            </div>
        </>
    );
}
