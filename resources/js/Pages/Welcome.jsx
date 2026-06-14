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
                    <div className="absolute -top-12 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#e60023]/15 blur-3xl sm:-top-16 sm:h-[360px] sm:w-[360px] md:-top-24 md:h-[520px] md:w-[520px]" />
                    <div className="absolute -bottom-12 left-[-60px] h-[200px] w-[200px] rounded-full bg-[#ffb18f]/35 blur-3xl sm:-bottom-16 sm:h-[300px] sm:w-[300px] md:-bottom-24 md:left-[-120px] md:h-[420px] md:w-[420px]" />
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

                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link
                                    href={route("home")}
                                    className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c4001f] sm:px-5 sm:py-3 sm:text-base"
                                >
                                    Create
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => openAuthModal("login")}
                                    className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c4001f] sm:px-5 sm:py-3 sm:text-base"
                                >
                                    Log in
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center px-4 pb-8 pt-2 sm:px-8 sm:pb-10 lg:px-10">
                    {/* Hero */}
                    <section className="w-full pt-6 mt-6 text-center sm:pt-8 sm:mt-12">
                        <div className="flex flex-col items-center gap-3 mx-auto sm:gap-5">
                            <h1 className="text-4xl font-semibold text-[#ffb18f] sm:text-6xl md:text-7xl lg:text-8xl">
                                Faketerest
                            </h1>
                            <p className="text-lg font-semibold text-zinc-700 sm:text-2xl md:text-3xl lg:text-4xl">
                                A Pinterest Clone
                            </p>
                        </div>
                    </section>
                </main>
            </div>
            <AuthModal
                show={authModalOpen}
                mode={authModalMode}
                onClose={() => setAuthModalOpen(false)}
            />
        </>
    );
}
