import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AuthModal({
    show = false,
    mode = "login",
    onClose = () => {},
}) {
    const [currentMode, setCurrentMode] = useState(mode);

    const loginForm = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const registerForm = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (show) {
            setCurrentMode(mode);
        }
    }, [mode, show]);

    const close = () => {
        onClose();
        loginForm.clearErrors();
        registerForm.clearErrors();
    };

    const toggleMode = () => {
        setCurrentMode((previousMode) =>
            previousMode === "login" ? "register" : "login",
        );
    };

    const submitLogin = (event) => {
        event.preventDefault();

        loginForm.post(route("login"), {
            preserveScroll: true,
            onSuccess: () => close(),
            onFinish: () => loginForm.reset("password"),
        });
    };

    const submitRegister = (event) => {
        event.preventDefault();

        registerForm.post(route("register"), {
            preserveScroll: true,
            onSuccess: () => close(),
            onFinish: () =>
                registerForm.reset("password", "password_confirmation"),
        });
    };

    return (
        <Modal show={show} onClose={close} maxWidth="lg">
            <div className="overflow-hidden bg-white">
                <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-zinc-950">
                            {currentMode === "login" ? "Log in" : "Sign up"}
                        </h3>
                    </div>

                    {currentMode === "login" ? (
                        <form onSubmit={submitLogin} className="mt-8 space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="login_email"
                                    value="Email"
                                />
                                <TextInput
                                    id="login_email"
                                    type="email"
                                    name="email"
                                    value={loginForm.data.email}
                                    className="block w-full mt-1"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(event) =>
                                        loginForm.setData(
                                            "email",
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={loginForm.errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="login_password"
                                    value="Password"
                                />
                                <TextInput
                                    id="login_password"
                                    type="password"
                                    name="password"
                                    value={loginForm.data.password}
                                    className="block w-full mt-1"
                                    autoComplete="current-password"
                                    onChange={(event) =>
                                        loginForm.setData(
                                            "password",
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={loginForm.errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={loginForm.data.remember}
                                    onChange={(event) =>
                                        loginForm.setData(
                                            "remember",
                                            event.target.checked,
                                        )
                                    }
                                />
                                <span className="text-sm text-gray-600 ms-2">
                                    Remember me
                                </span>
                            </label>
                            <PrimaryButton
                                disabled={loginForm.processing}
                                className="w-full py-3"
                            >
                                Log in
                            </PrimaryButton>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 w-full border-t border-gray-300" />
                                <span className="text-sm text-center text-gray-500">
                                    or
                                </span>
                                <div className="flex-1 w-full border-t border-gray-300" />
                            </div>
                            <div className="flex items-center justify-center">
                                <a
                                    href={route("auth.redirect")}
                                    className="px-4 py-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
                                >
                                    Continue with Facebook
                                </a>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="text-sm font-semibold text-zinc-700 underline-offset-4 transition hover:text-[#e60023] hover:underline"
                                >
                                    Need an account? Sign up
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form
                            onSubmit={submitRegister}
                            className="mt-8 space-y-4"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="register_name"
                                    value="Name"
                                />
                                <TextInput
                                    id="register_name"
                                    name="name"
                                    value={registerForm.data.name}
                                    className="block w-full mt-1"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(event) =>
                                        registerForm.setData(
                                            "name",
                                            event.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={registerForm.errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="register_email"
                                    value="Email"
                                />
                                <TextInput
                                    id="register_email"
                                    type="email"
                                    name="email"
                                    value={registerForm.data.email}
                                    className="block w-full mt-1"
                                    autoComplete="username"
                                    onChange={(event) =>
                                        registerForm.setData(
                                            "email",
                                            event.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={registerForm.errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="register_password"
                                    value="Password"
                                />
                                <TextInput
                                    id="register_password"
                                    type="password"
                                    name="password"
                                    value={registerForm.data.password}
                                    className="block w-full mt-1"
                                    autoComplete="new-password"
                                    onChange={(event) =>
                                        registerForm.setData(
                                            "password",
                                            event.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={registerForm.errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="register_password_confirmation"
                                    value="Confirm Password"
                                />
                                <TextInput
                                    id="register_password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={
                                        registerForm.data.password_confirmation
                                    }
                                    className="block w-full mt-1"
                                    autoComplete="new-password"
                                    onChange={(event) =>
                                        registerForm.setData(
                                            "password_confirmation",
                                            event.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={
                                        registerForm.errors
                                            .password_confirmation
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="text-sm font-semibold text-zinc-700 underline-offset-4 transition hover:text-[#e60023] hover:underline"
                                >
                                    Already have an account? Log in
                                </button>

                                <PrimaryButton
                                    disabled={registerForm.processing}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Modal>
    );
}
