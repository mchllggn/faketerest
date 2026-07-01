import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Toaster } from "sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "@/Hooks/useDebounce";
import TextInput from "@/Components/TextInput";
import AuthModal from "@/Components/AuthModal";

function SkeletonCard() {
  const heights = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[2/3]",
    "aspect-square",
    "aspect-[3/5]",
  ];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div className="mb-4 break-inside-avoid">
      <div
        className={`overflow-hidden border rounded-lg shadow-sm bg-gray-200 animate-pulse ${randomHeight}`}
      />
    </div>
  );
}

export default function Home({ pins }) {
  const [items, setItems] = useState(pins?.data ?? []);
  const [nextPage, setNextPage] = useState(pins?.next_page_url ?? null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const sentinelRef = useRef(null);
  const debouncedSearch = useDebounce(search, 300);

  const openAuthModal = (nextMode) => {
    setAuthModalMode(nextMode);
    setAuthModalOpen(true);
  };

  // Handle Search
  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();

    setIsSearching(true);
    router.get(route("home"), trimmedSearch ? { search: trimmedSearch } : {}, {
      preserveState: true,
      preserveScroll: true,
      only: ["pins"],
      onSuccess: (page) => {
        setItems(page.props.pins?.data ?? []);
        setNextPage(page.props.pins?.next_page_url ?? null);
      },
      onFinish: () => setIsSearching(false),
    });
  }, [debouncedSearch]);

  const loadMore = useCallback(() => {
    if (!nextPage || loading) return;

    setLoading(true);
    router.get(
      nextPage,
      { search: debouncedSearch },
      {
        preserveState: true,
        preserveScroll: true,
        only: ["pins"],
        onSuccess: (page) => {
          const newPins = page.props.pins;
          setItems((prev) => [...prev, ...(newPins?.data ?? [])]);
          setNextPage(newPins?.next_page_url ?? null);
        },
        onFinish: () => setLoading(false),
      },
    );
  }, [nextPage, loading, debouncedSearch]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <AuthenticatedLayout
      title={"Home"}
      handleSearchInput={handleSearchInput}
      value={search}
      openAuthModal={openAuthModal}
    >
      <Toaster />
      <div className="px-4 py-4 mx-auto sm:px-6 sm:py-6 max-w-7xl">
        {/* Skeleton Loader */}
        {isSearching && (
          <div className="gap-4 columns-2 sm:columns-3 md:columns-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Pins Grid */}
        {!isSearching && (
          <>
            <div className="gap-4 columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
              {items.map((pin) => (
                <Link
                  key={pin.id}
                  href={route("pins.show", pin.id)}
                  className="block mb-4 break-inside-avoid"
                >
                  <div className="overflow-hidden border rounded-lg shadow-sm cursor-pointer group">
                    <img
                      src={
                        pin.image_path.startsWith("http")
                          ? pin.image_path
                          : `/storage/${pin.image_path}`
                      }
                      alt={pin.title}
                      className="object-cover w-full transition-all duration-200 group-hover:brightness-90"
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Sentinel element for intersection observer */}
            <div ref={sentinelRef} className="h-4" />

            {loading && (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-gray-300 rounded-full border-t-gray-900 animate-spin" />
              </div>
            )}
          </>
        )}
      </div>
      <AuthModal
        show={authModalOpen}
        mode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </AuthenticatedLayout>
  );
}
