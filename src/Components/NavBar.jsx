import { useEffect, useState } from "react";

const primaryLinks = [
  "Personal",
  "Business",
  "Locations",
  "About",
  "Resources",
];
const secondaryLinks = [
  "Checking",
  "Savings",
  "Credit Cards",
  "Loans",
  "Insurance",
  "Investments",
];

const NavBar = () => {
  const [activePrimaryIndex, setActivePrimaryIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleOutsideClick = (event) => {
      if (!event.target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMobileMenuOpen]);

  return (
    <header className="relative border-b border-subtle-border bg-white font-inter text-slate-900">
      <div className="relative mx-auto flex h-14 max-w-[1440px] items-center gap-8 px-2 lg:px-7 max-lg:hidden">
        <a href="/" aria-label="UFCU home" className="shrink-0">
          <img src="/ufculogo.svg" alt="UFCU" className="h-8 w-auto" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="flex-1 items-center gap-2 text-paragraph-r font-medium max-lg:hidden h-full lg:flex"
        >
          {primaryLinks.map((link, index) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActivePrimaryIndex(index)}
              aria-current={activePrimaryIndex === index ? "page" : undefined}
              className={`flex h-full w-28 shrink-0 items-center justify-center gap-1 whitespace-nowrap px-3 transition-all duration-200 ease-in-out hover:text-[#23335d] ${
                activePrimaryIndex === index
                  ? "bg-[#f7f8fa] font-bold text-[#23335d]"
                  : "text-primary-color"
              }`}
            >
              {activePrimaryIndex === index && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef6820]" />
              )}
              {link}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 text-[11px]">
          <button
            className="hidden items-center gap-1 text-primary-color p-2 cursor-pointer  text-paragraph-r font-medium sm:flex"
            type="button"
          >
            <span aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </span>{" "}
            Español
          </button>
          <span className="hidden text-slate-300 sm:inline">|</span>
          <button
            className="text-lg leading-none text-primary-color"
            type="button"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-full flex items-center gap-2 cursor-pointer  bg-[#23335d] px-4 py-2 text-paragraph-r font-semibold text-white transition hover:bg-[#020442]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Log in
          </button>
        </div>
      </div>

      <div className="relative flex h-16 items-center justify-between px-4 lg:hidden">
        <button
          type="button"
          className="flex size-10 items-center justify-center text-primary-color"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-7"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <a
          href="/"
          aria-label="UFCU home"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <img src="/ufculogo.svg" alt="UFCU" className="h-9 w-auto" />
        </a>

        <button
          type="button"
          className="flex size-10 items-center justify-center text-primary-color"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute font-medium left-0 right-0 top-full z-50 border-t border-subtle-border bg-white px-5 py-4 shadow-lg lg:hidden"
        >
          <div className="flex flex-col text-paragraph-r text-primary-color">
            <a
              href="/open-account"
              className="border-b flex gap-2 items-center border-subtle-border py-4 font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Become a member
            </a>
            <button
              type="button"
              className="flex items-center gap-2 border-b border-subtle-border py-4 text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="text-sm">Español</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-between border-b border-subtle-border py-4 text-left font-semibold"
              aria-expanded={isPersonalOpen}
              onClick={() => setIsPersonalOpen((open) => !open)}
            >
              Personal{" "}
              <span
                className={`transition-transform ${isPersonalOpen ? "rotate-180" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
            {isPersonalOpen && (
              <div className="border-b border-subtle-border bg-[#f7f8fa] px-4">
                {secondaryLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="block border-b border-subtle-border py-3 text-sm last:border-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            )}
            {primaryLinks.slice(1).map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="border-b border-subtle-border py-4"
                onClick={() => {
                  setActivePrimaryIndex(index + 1);
                  setIsMobileMenuOpen(false);
                }}
              >
                {link}
              </a>
            ))}
            <div className="py-4 text-sm">Routing #:314977405</div>
          </div>
        </nav>
      )}

      <nav
        aria-label="Product navigation"
        className="border-t border-subtle-border bg-[#f7f8fa] max-lg:hidden"
      >
        <div className="mx-auto flex max-w-360 items-center font-medium gap-7 overflow-x-auto px-5 py-4 text-paragraph-r text-[#1A2654] lg:pl-37.5 lg:pr-10">
          {secondaryLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="flex shrink-0 items-center gap-1 hover:text-[#23335d]"
            >
              {link}{" "}
              <span className="text-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
