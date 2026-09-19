const Checkmark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-7"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

import { useEffect, useState } from "react";

const confettiPieces = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  left: `${(index * 29) % 100}%`,
  delay: `${(index % 8) * 0.08}s`,
  duration: `${2.4 + (index % 5) * 0.2}s`,
  color: ["#23335d", "#ef6820", "#c8d8f0", "#fce1d2"][index % 4],
  rotation: `${(index * 37) % 180}deg`,
}));

const ApplicationComplete = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const confettiShown = sessionStorage.getItem("ufcu-confetti-shown");

    if (!confettiShown) {
      sessionStorage.setItem("ufcu-confetti-shown", "true");
      const startId = window.setTimeout(() => setShowConfetti(true), 0);
      const timeoutId = window.setTimeout(() => setShowConfetti(false), 4200);

      return () => {
        window.clearTimeout(startId);
        window.clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, []);

  let selectedCard = { name: "UFCU Classic", image: "/ufcu_default.png" };
  const storedCard = sessionStorage.getItem("ufcu-selected-card");

  if (storedCard) {
    try {
      const parsedCard = JSON.parse(storedCard);
      if (parsedCard?.name && parsedCard?.image) {
        selectedCard = parsedCard;
      }
    } catch {
      // Use the default card when stored application data is invalid.
    }
  }

  return (
  <div className="min-h-screen bg-[#f8fafc] text-primary-color">
    {showConfetti && (
      <div className="completion-confetti" aria-hidden="true">
        {confettiPieces.map((piece) => (
          <span
            key={piece.id}
            className="completion-confetti__piece"
            style={{
              left: piece.left,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              transform: `rotate(${piece.rotation})`,
            }}
          />
        ))}
      </div>
    )}
    <header className="sticky top-0 z-20 border-b border-subtle-border bg-white">
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-5 sm:px-8">
        <a href="/" aria-label="UFCU home">
          <img src="/ufculogo.svg" alt="UFCU" className="h-9 w-auto" />
        </a>
        <a
          href="/"
          className="rounded-full border border-primary-color px-4 py-2 text-small-text-b font-semibold text-primary-color transition hover:bg-primary-color hover:text-white"
        >
          Go to UFCU home
        </a>
      </div>
    </header>

    <main className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute -left-24 -top-28 size-80 rounded-full bg-[#c8d8f0]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 size-96 rounded-full bg-[#fce1d2]/60 blur-3xl" />

      <section className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary-color text-white shadow-lg shadow-primary-color/20">
          <Checkmark />
        </div>
        <p className="mt-6 text-smallest-text-b font-bold uppercase tracking-[0.18em] text-lighter-primary">
          Application submitted
        </p>
        <h1 className="mx-auto mt-2 max-w-2xl font-heading leading-10 text-heading-1 font-bold text-darkest-primary">
          You&apos;re on your way to something better.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-paragraph-r leading-6 text-slate-600">
          Thanks for choosing UFCU. We&apos;ve received your application and
          will send an email with your next steps.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#c8d8e8] bg-white p-4 text-left ">
          <p className="text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
            Your UFCU card
          </p>
          <img
            src={selectedCard.image}
            alt={`${selectedCard.name} debit card`}
            className="mt-3 mb-4 aspect-[1.6] w-full rounded-xl object-cover"
          />
        </div>
        <h1 className="mt-4 text-heading-4 font-bold text-darkest-primary">
          {selectedCard.name}
        </h1>
        <p className="my-4 text-small-text-r leading-5 text-slate-600">
          Welcome to UFCU! Your accounts are ready, and you're now a member.
          Lookout for a welcome email from us.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          <CompleteCard
            number="1"
            title="Check your inbox"
            text="We'll send a confirmation email with a summary of your application."
          />
          <CompleteCard
            number="2"
            title="Watch for updates"
            text="We'll let you know when your application has been reviewed."
          />
          <CompleteCard
            number="3"
            title="Have questions?"
            text="Our team is here to help whenever you need us."
          />
          <CompleteCard
            number="4"
            title="Keep your information handy"
            text="You may need your application details when you contact us."
          />
        </div>

        <div className="mt-8 rounded-2xl border border-[#c8d8e8] bg-white p-5 text-left shadow-sm sm:p-6">
          <h2 className="text-paragraph-b font-bold text-darkest-primary">
            What happens next?
          </h2>
          <p className="mt-2 text-small-text-r leading-5 text-slate-600">
            A UFCU member service representative will review your application.
            If we need anything else, we&apos;ll contact you using the
            information you provided.
          </p>
          <a
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-small-text-b font-bold text-secondary-color underline"
          >
            Learn more about UFCU
            <ArrowIcon />
          </a>
        </div>
      </section>
    </main>
  </div>
  );
};

const CompleteCard = ({ number, title, text }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <span className="flex size-8 items-center justify-center rounded-full bg-[#eaf2fc] text-small-text-b font-bold text-primary-color">
      {number}
    </span>
    <h2 className="mt-4 text-small-text-b font-bold text-darkest-primary">
      {title}
    </h2>
    <p className="mt-1 text-small-text-r leading-5 text-slate-600">{text}</p>
  </article>
);

export default ApplicationComplete;
