import { useEffect, useState } from "react";

const FormNav = () => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) return undefined;

    const redirectTimer = window.setTimeout(() => {
      window.location.assign("/");
    }, 800);

    return () => window.clearTimeout(redirectTimer);
  }, [isSaved]);

  return (
    <header className="border-b sticky top-0 z-100 border-subtle-border bg-white! font-inter">
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-5 sm:px-8">
        <a href="/" aria-label="UFCU home" className="shrink-0">
          <img src="/ufculogo.svg" alt="UFCU" className="h-9 w-auto" />
        </a>

        <div className="flex items-center gap-3 text-small-text-b font-semibold">
          <a
            href="/"
            className="rounded-full border border-primary-color px-5 py-2 text-primary-color transition"
          >
            Cancel
          </a>
          {isSaved && (
            <span className="text-green-700" role="status">
              Saved
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new Event("ufcu-save-application"));
              setIsSaved(true);
            }}
            className="rounded-full flex gap-1 items-center border bg-primary-color text-white  px-4 py-2  transition hover:bg-darker-primary cursor-poitner"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-save preview-icon"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
          </svg>
            {isSaved ? "Saved" : "Save and return later"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default FormNav;
