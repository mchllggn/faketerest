import AuthModal from '@/Components/AuthModal';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const navItems = ['Explore', 'About'];

export default function Welcome({ auth }) {
    const isAuthenticated = Boolean(auth?.user);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState('login');

    const openAuthModal = (nextMode) => {
        setAuthModalMode(nextMode);
        setAuthModalOpen(true);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen overflow-hidden bg-[#faf6f0] text-zinc-950">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,172,0.4),transparent_32%),radial-gradient(circle_at_80%_8%,rgba(195,180,255,0.35),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(252,220,191,0.5),transparent_32%)]" />

                <header className="relative z-10 px-5 pt-4 sm:px-8 lg:px-10">
                    <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-full px-1 py-2">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-1.5 text-[#e60023]">
                                <span className="text-[1.6rem] font-extrabold tracking-[-0.06em] text-[#e60023]">
                                    Faketerest
                                </span>
                            </Link>

                            <nav className="hidden items-center gap-8 text-[1.02rem] font-medium text-zinc-950 md:flex">
                                {navItems.map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="transition hover:text-[#e60023]"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                            {isAuthenticated ? (
                                <Link
                                    href={route('home')}
                                    className="rounded-full bg-[#e60023] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#c4001f]"
                                >
                                    Create
                                </Link>
                            ) : (
                                    <button
                                        type="button"
                                        onClick={() => openAuthModal('login')}
                                        className="rounded-full bg-[#e60023] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#c4001f]"
                                    >
                                        Log in
                                    </button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center px-5 pb-10 pt-2 sm:px-8 lg:px-10">
                    <section className="mt-12 flex w-full flex-1 flex-col items-center text-center">
                        <div className="mt-2 max-w-[43rem] lg:mt-8">
                            <h1 className="text-[clamp(4rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.08em] text-zinc-950 sm:leading-[0.86]">
                                <span className="block">Welcome to</span>
                                <span className="relative mt-1 block h-[1.05em] overflow-hidden text-[#ffb18f]">
                                    <span className="absolute inset-0 block">Faketerest</span>
                                </span>
                            </h1>
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