const CardPreview = ({ card, currentStep, isSubmitted, totalSteps }) => {
  const progress = Math.max((totalSteps - currentStep) / totalSteps, 0);

  return (
    <div className="rounded-2xl mt-3">
      {card ? (
        <div className="rounded-xl bg-white/60 p-3">
          <p className="mb-3 text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
            Your card
          </p>
          <div className="relative mb-2 aspect-[1.6] overflow-hidden rounded-lg shadow-md">
            <img
              src={card.image}
              alt={`${card.name} debit card preview`}
              className="h-full w-full object-cover"
            />
            <span
              className={`card-preview-reveal__gradient absolute inset-y-0 left-0 ${
                isSubmitted ? "opacity-0" : "opacity-100"
              }`}
              style={{ "--card-progress-width": `${progress * 100}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="font-bold tracking-tight text-primary-color">
            Your card is in progress.
          </p>
          <span className="block leading-4 text-small-text-b text-lighter-primary">
            Complete your application to see it here!
          </span>
        </div>
      ) : (
        <div className="flex min-h-24 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#aebdd2] px-4 py-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-2 text-darkest-primary"
            aria-hidden="true"
          >
            <rect width="18" height="13" x="3" y="5.5" rx="2" />
            <path d="M3 10h18" />
            <path d="M7 15h2" />
            <path d="M13 15h3" />
          </svg>
          <h2 className="mb-2 text-small-text-b font-bold text-darkest-primary">
            New card, new you
          </h2>
          <p className="max-w-52 text-smallest-text-r leading-3.5 text-primary-color">
            Choose a card design to see it come to life!
          </p>
        </div>
      )}
    </div>
  );
};

export default CardPreview;
