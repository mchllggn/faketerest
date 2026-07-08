import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import TextInput from "@/Components/TextInput";
import { usePage, Head } from "@inertiajs/react";
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
                className="inline-flex items-center justify-center w-10 h-10 -ml-2 text-gray-600 transition rounded-md sm:hidden hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={sidebarOpen}
                aria-controls="mobile-sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:block">
                <ApplicationLogo />
              </div>
            </div>
            <div
              className={`${route().current("home") ? "block" : "hidden"} flex-grow mx-3 max-w-7xl`}
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
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 sm:hidden ${
          sidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      {/* Sidebar Panel */}
      <div
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 left-0 z-50 w-[60%] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out sm:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-left"
              aria-label="Close navigation menu"
            >
              <ApplicationLogo />
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex items-center justify-center -mr-2 text-gray-500 transition rounded-md w-9 h-9 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-start px-4 py-6 space-y-4 overflow-y-auto">
            <NavLink
              href={route("home")}
              active={route().current("home")}
              onClick={() => setSidebarOpen(false)}
            >
              <House className="w-6 h-6 mr-2" />
              Home
            </NavLink>
            <NavLink
              href={route("pins.create")}
              active={route().current("pins.create")}
              onClick={() => setSidebarOpen(false)}
            >
              <Plus className="w-6 h-6 mr-2" />
              Create
            </NavLink>

            {/* User Menu (only when logged in) */}
            {user && (
              <>
                <div className="w-full my-2 border-t border-gray-200" />
                <div className="flex items-center px-1 pb-2">
                  <span className="relative inline-flex items-center text-sm font-medium text-gray-700">
                    {user.name}
                    {isAdmin && (
                      <span title="Admin" className="ml-1">
                        <Crown className="w-4 h-4 text-jihyo" />
                      </span>
                    )}
                  </span>
                </div>
                <NavLink
                  href={route("profile.edit")}
                  active={route().current("profile.edit")}
                  onClick={() => setSidebarOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  href={route("settings.index")}
                  active={route().current("settings.index")}
                  onClick={() => setSidebarOpen(false)}
                >
                  Settings
                </NavLink>
                {isAdmin && (
                  <NavLink
                    href={route("admin.dashboard")}
                    active={route().current("admin.dashboard")}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Admin
                  </NavLink>
                )}
                <NavLink
                  href={route("logout")}
                  method="post"
                  as="button"
                  onClick={() => setSidebarOpen(false)}
                >
                  Log Out
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

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
