import { useEffect, useRef, useState } from "react";

const Wizard = ({
  currentStep,
  steps,
  onStepChange,
  cardImage,
  cardName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const wizardRef = useRef(null);
  const currentLabel = steps[currentStep];

  useEffect(() => {
    if (!isExpanded) return undefined;

    const handleOutsideClick = (event) => {
      if (!wizardRef.current?.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isExpanded]);

  return (
    <div ref={wizardRef} className="relative z-40 mb-6 lg:hidden">
      <button
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-left shadow-sm sm:px-4"
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          {cardImage && (
            <img
              src={cardImage}
              alt={`${cardName} debit card`}
              className="h-10 w-16 shrink-0 rounded object-cover sm:h-12 sm:w-20"
            />
          )}
          <span className="min-w-0">
            <span className="block text-smallest-text-r font-bold uppercase tracking-wider text-lighter-primary">
              {currentStep + 1} of {steps.length}
            </span>
            <span className="block truncate text-small-text-b font-bold text-primary-color">
              {currentLabel}
            </span>
          </span>
        </span>
        <span
          className={`text-primary-color transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
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

      {isExpanded && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-subtle-border bg-[#E8EDF1] p-3 shadow-xl sm:p-4">
          <div className="rounded-md bg-white p-2 shadow-sm">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <StepRow
                key={step}
                step={step}
                index={index}
                currentStep={currentStep}
                onClick={() => {
                  if (index < currentStep) {
                    onStepChange(index);
                    setIsExpanded(false);
                  }
                }}
              />
            ))}
          </div>

          {steps.slice(currentStep + 1).map((step, index) => {
            const stepIndex = currentStep + index + 1;
            return (
              <StepRow
                key={step}
                step={step}
                index={stepIndex}
                currentStep={currentStep}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const StepRow = ({ step, index, currentStep, onClick }) => (
  <button
    type="button"
    disabled={index > currentStep}
    onClick={onClick}
    className={`flex w-full items-center gap-3 border-b border-subtle-border px-2 py-3 text-left last:border-0 ${
      index > currentStep ? "cursor-default" : ""
    }`}
  >
    <span
      className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${
        index <= currentStep
          ? index < currentStep
            ? "bg-darkest-primary text-white"
            : "bg-secondary-color text-white"
          : "bg-slate-200 text-slate-500"
      }`}
    >
      {index < currentStep ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="size-3"
          aria-label="Completed"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5 12 4 4L19 6"
          />
        </svg>
      ) : (
        index + 1
      )}
    </span>
    <span
      className={
        index === currentStep
          ? "text-small-text-b font-bold text-primary-color"
          : index < currentStep
          ? "text-small-text-r text-slate-500"
            : "text-small-text-r text-slate-500"
      }
    >
      {step}
    </span>
    {index < currentStep && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="ml-auto size-4 text-primary-color"
        aria-label={`Go to ${step}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9 5 7 7-7 7"
        />
      </svg>
    )}
  </button>
);

export default Wizard;
