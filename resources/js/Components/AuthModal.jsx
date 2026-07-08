import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ApplicationLogo from "./ApplicationLogo";

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
      onFinish: () => registerForm.reset("password", "password_confirmation"),
    });
  };

  return (
    <Modal show={show} onClose={close} maxWidth="lg">
      <div className="p-4 overflow-hidden bg-white sm:p-6 lg:p-8">
        <div className="flex items-center justify-center gap-4">
          <ApplicationLogo />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900">
          {currentMode === "login"
            ? "Log in your account"
            : "Sign up for an account"}
        </h1>

        {currentMode === "login" ? (
          <form onSubmit={submitLogin} className="mt-5 space-y-4 sm:mt-8">
            <div>
              <InputLabel htmlFor="login_email" value="Email" />
              <TextInput
                id="login_email"
                type="email"
                name="email"
                value={loginForm.data.email}
                className="block w-full mt-1"
                autoComplete="username"
                isFocused={true}
                onChange={(event) =>
                  loginForm.setData("email", event.target.value)
                }
              />
              <InputError message={loginForm.errors.email} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="login_password" value="Password" />
              <TextInput
                id="login_password"
                type="password"
                name="password"
                value={loginForm.data.password}
                className="block w-full mt-1"
                autoComplete="current-password"
                onChange={(event) =>
                  loginForm.setData("password", event.target.value)
                }
              />
              <InputError
                message={loginForm.errors.password}
                className="mt-2"
              />
            </div>

            <PrimaryButton
              disabled={loginForm.processing}
              className="w-full py-2.5 text-sm sm:py-3 sm:text-base bg-jihyo hover:bg-jihyo/90 focus:ring-jihyo"
            >
              Log in
            </PrimaryButton>
            <div className="flex items-center gap-4">
              <div className="flex-1 w-full border-t border-gray-300" />
              <span className="text-sm text-center text-gray-500">or</span>
              <div className="flex-1 w-full border-t border-gray-300" />
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3 sm:justify-center">
              {/* <a
                                    href={route("auth.redirect", {
                                        provider: "facebook",
                                    })}
                                    className="w-full px-4 py-2.5 text-sm text-center text-white transition bg-blue-600 rounded-full hover:bg-blue-700 sm:w-auto sm:text-base"
                                >
                                    Continue with Facebook
                                </a> */}
              <a
                href={route("auth.redirect", {
                  provider: "google",
                })}
                className="w-full px-4 py-2.5 text-sm text-center transition shadow-dahyun border text-zinc-600 rounded-full sm:w-auto sm:text-base flex items-center"
              >
                <img
                  src="/icons8-google.svg"
                  alt="Google"
                  className="mr-2 size-8"
                />
                Continue with Google
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
            className="mt-5 space-y-3 sm:mt-8 sm:space-y-4"
          >
            <div>
              <InputLabel htmlFor="register_name" value="Name" />
              <TextInput
                id="register_name"
                name="name"
                value={registerForm.data.name}
                className="block w-full mt-1"
                autoComplete="name"
                isFocused={true}
                onChange={(event) =>
                  registerForm.setData("name", event.target.value)
                }
                required
              />
              <InputError message={registerForm.errors.name} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="register_email" value="Email" />
              <TextInput
                id="register_email"
                type="email"
                name="email"
                value={registerForm.data.email}
                className="block w-full mt-1"
                autoComplete="username"
                onChange={(event) =>
                  registerForm.setData("email", event.target.value)
                }
                required
              />
              <InputError
                message={registerForm.errors.email}
                className="mt-2"
              />
            </div>

            <div>
              <InputLabel htmlFor="register_password" value="Password" />
              <TextInput
                id="register_password"
                type="password"
                name="password"
                value={registerForm.data.password}
                className="block w-full mt-1"
                autoComplete="new-password"
                onChange={(event) =>
                  registerForm.setData("password", event.target.value)
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
                value={registerForm.data.password_confirmation}
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
                message={registerForm.errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col-reverse items-stretch gap-3 pt-2 sm:gap-4">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm font-semibold text-zinc-700 underline-offset-4 transition hover:text-[#e60023] hover:underline"
              >
                Already have an account? Log in
              </button>

              <PrimaryButton
                disabled={registerForm.processing}
                className="w-full py-2.5 text-sm sm:w-auto sm:py-2 sm:text-base"
              >
                Sign up
              </PrimaryButton>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
