import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import TextInput from "@/Components/TextInput";
import { Link, usePage, Head } from "@inertiajs/react";
import { House, Crown, Plus, Menu, X } from "lucide-react";
export default function AuthenticatedLayout({
  title,
  header,
  children,
  handleSearchInput = () => {},
  search = "",
  openAuthModal,
}) {
  const user = usePage().props.auth.user;
  const isAdmin = user?.role === "admin";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Head title={title} />
      <nav className="sticky top-0 z-10 bg-white border">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center shrink-0">
              <button
                type="button"
                className="sm:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={sidebarOpen}
              >
                <ApplicationLogo />
              </button>
              <div className="hidden sm:block">
                <ApplicationLogo />
              </div>
            </div>
            <div
              className={`${route().current("home") ? "block" : "hidden"} flex-grow mx-3`}
            >
              <TextInput
                type="text"
                search={search}
                onChange={handleSearchInput}
                className="rounded-[1.5rem]"
                placeholder="Search..."
              />
            </div>
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="rounded-full bg-[#e60023] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c4001f] sm:px-5 sm:py-3 sm:text-base"
              >
                Log in
              </button>
            ) : (
              <div className="relative hidden sm:block">
                <div className="flex items-center">
                  <div className="flex space-x-2 sm:mx-6 sm:space-x-8">
                    <NavLink
                      href={route("home")}
                      active={route().current("home")}
                    >
                      <House className="w-6 h-6 mr-1" />
                      Home
                    </NavLink>
                    <NavLink
                      href={route("pins.create")}
                      active={route().current("pins.create")}
                    >
                      <Plus className="w-6 h-6 mr-1" />
                      Create
                    </NavLink>
                  </div>
                  <Dropdown>
                    <Dropdown.Trigger>
                      <span className="inline-flex rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 text-xs font-medium leading-4 text-gray-500 transition duration-150 ease-in-out border border-transparent rounded-md sm:text-sm hover:text-gray-700 focus:outline-none"
                        >
                          <span className="relative">
                            {user.name}
                            {isAdmin && (
                              <span title="Admin">
                                <Crown className="absolute right-0 w-4 h-4 -top-3 text-jihyo" />
                              </span>
                            )}
                          </span>
                          <svg
                            className="-me-0.5 ms-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                      <Dropdown.Link href={route("profile.edit")}>
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link href={route("settings.index")}>
                        Settings
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                      >
                        Log Out
                      </Dropdown.Link>
                      <br />
                      <hr />
                      {isAdmin && (
                        <Dropdown.Link href={route("admin.dashboard")}>
                          Admin
                        </Dropdown.Link>
                      )}
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 transition-opacity bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          {/* Sidebar Panel - 70% width */}
          <div className="fixed inset-y-0 left-0 w-[70%] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center h-16 px-4 border-b">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="w-full text-left"
                >
                  <ApplicationLogo />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
                <NavLink
                  href={route("home")}
                  active={route().current("home")}
                  className="flex items-center gap-3 px-3 py-3 text-base font-medium transition-colors rounded-lg"
                >
                  <House className="w-6 h-6" />
                  Home
                </NavLink>
                <NavLink
                  href={route("pins.create")}
                  active={route().current("pins.create")}
                  className="flex items-center gap-3 px-3 py-3 text-base font-medium transition-colors rounded-lg"
                >
                  <Plus className="w-6 h-6" />
                  Create
                </NavLink>

                <div className="pt-4 border-t">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-500 transition-colors rounded-lg hover:text-gray-700"
                      >
                        <span className="relative flex items-center gap-2">
                          {user.name}
                          {isAdmin && (
                            <span title="Admin">
                              <Crown className="w-4 h-4 text-jihyo" />
                            </span>
                          )}
                        </span>
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content side="bottom" align="start">
                      <Dropdown.Link
                        href={route("profile.edit")}
                        onClick={() => setSidebarOpen(false)}
                        className="px-3 py-2 text-base"
                      >
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("settings.index")}
                        onClick={() => setSidebarOpen(false)}
                        className="px-3 py-2 text-base"
                      >
                        Settings
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        onClick={() => setSidebarOpen(false)}
                        className="px-3 py-2 text-base"
                      >
                        Log Out
                      </Dropdown.Link>
                      <hr className="my-2" />
                      {isAdmin && (
                        <Dropdown.Link
                          href={route("admin.dashboard")}
                          onClick={() => setSidebarOpen(false)}
                          className="px-3 py-2 text-base"
                        >
                          Admin
                        </Dropdown.Link>
                      )}
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {header && (
        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
