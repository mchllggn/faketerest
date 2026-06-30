import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import TextInput from "@/Components/TextInput";
import { Link, usePage, Head } from "@inertiajs/react";
import { House, Crown, Plus } from "lucide-react";
export default function AuthenticatedLayout({
  title,
  header,
  children,
  handleSearchInput = () => {},
  search = "",
}) {
  const user = usePage().props.auth.user;

  return (
    <div className="min-h-screen">
      <Head title={title} />
      <nav className="sticky top-0 z-10 bg-white border">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center shrink-0">
              <Link href="/">
                <ApplicationLogo />
              </Link>
            </div>
            <div
              className={`${route().current("home") ? "block" : "hidden"} flex-grow mx-3`}
            >
              <TextInput
                type="text"
                search={search}
                onChange={handleSearchInput}
                className="rounded-3xl"
              />
            </div>
            <div className="relative">
              <div className="flex items-center">
                <div className="flex space-x-2 sm:mx-6 sm:space-x-8">
                  <NavLink
                    href={route("home")}
                    active={route().current("home")}
                  >
                    <House className="w-6 h-6" />
                  </NavLink>
                  <NavLink
                    href={route("pins.create")}
                    active={route().current("pins.create")}
                  >
                    <Plus className="w-6 h-6" />
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
                          <span title="Admin">
                            <Crown className="absolute right-0 w-4 h-4 -top-3 text-jihyo" />
                          </span>
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
                    <Dropdown.Link href={route("admin.dashboard")}>
                      Admin
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
          </div>
        </div>
      </nav>

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
