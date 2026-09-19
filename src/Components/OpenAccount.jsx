import { useCallback, useEffect, useRef, useState } from "react";
import Wizard from "./Wizard";
import AccountAside from "./AccountAside";

const options = [
  {
    title: "Everyday Checking",
    description: "For spending, bills, and your debit card.",
    icon: "checking",
  },
  {
    title: "Savings",
    description: "Start building toward your next goal.",
    icon: "savings",
  },
  {
    title: "Checking + Savings",
    description: "A little of both. More ways to manage your money.",
    icon: "combined",
  },
  {
    title: "Loans",
    description: "Explore options for school, personal, or auto loans.",
    icon: "loans",
  },
];

const steps = [
  "Account",
  "Personalize",
  "Your info",
  "Funding",
  "Disclosures",
  "Review",
];

const APPLICATION_STORAGE_KEY = "ufcu-application";

const defaultFormData = {
  accountType: 0,
  organization: "",
  cardDesign: "",
  joinCouncil: false,
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  ssn: "",
  identityConfirmed: false,
  address: "",
  apartment: "",
  state: "",
  city: "",
  zipCode: "",
  mailingAddressSame: true,
  fundingNow: "",
  fundingMethod: "",
  checkingAmount: "",
  savingsAmount: "",
  courtesyPay: false,
  disclosuresAccepted: false,
};

const fundingMethods = [
  {
    value: "bank",
    title: "Log in with your bank",
    description: "Securely connect to another institution.",
    icon: "bank",
    maxAmount: 54550,
  },
  {
    value: "account",
    title: "Use account number",
    description: "Manually enter account information.",
    icon: "account",
    maxAmount: 54500,
  },
  {
    value: "card",
    title: "Use a credit or debit card",
    description: "Enter your card information.",
    icon: "card",
    maxAmount: 2500,
  },
];

const cardDesigns = [
  {
    name: "UFCU Classic",
    description: "A bold look for what's ahead.",
    image: "/ufcu_default.png",
  },
  {
    name: "Austin Community College",
    description: "Show your school spirit.",
    image: "/ACC_card.png",
  },
  {
    name: "Texas Longhorns",
    description: "A timeless favorite.",
    image: "/UTA_card.png",
  },
  {
    name: "Texas State",
    description: "Represent your journey.",
    image: "/TXST_card.png",
  },
];

const OptionIcon = ({ type }) => {
  const paths = {
    checking: (
      <svg
        className="size-6"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 8H5C3.89543 8 3 8.89543 3 10V21C3 22.1046 3.89543 23 5 23H23C24.1046 23 25 22.1046 25 21V10C25 8.89543 24.1046 8 23 8Z"
          stroke="#EF6820"
          stroke-width="2"
        />
        <path d="M3 13H25" stroke="#EF6820" stroke-width="2" />
        <path
          opacity="0.5"
          d="M11 16H7C6.44772 16 6 16.4477 6 17V18C6 18.5523 6.44772 19 7 19H11C11.5523 19 12 18.5523 12 18V17C12 16.4477 11.5523 16 11 16Z"
          fill="#EF6820"
        />
        <path d="M16 17.5H22" stroke="#EF6820" stroke-width="1.5" />
      </svg>
    ),
    savings: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-piggy-bank preview-icon"
      >
        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
        <path d="M16 10h.01" />
        <path d="M2 8v1a2 2 0 0 0 2 2h1" />
      </svg>
    ),
    combined: (
      <svg
        className="size-6"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 5H5C3.89543 5 3 5.89543 3 7V13C3 14.1046 3.89543 15 5 15H15C16.1046 15 17 14.1046 17 13V7C17 5.89543 16.1046 5 15 5Z"
          stroke="#4F5E71"
          stroke-width="2"
        />
        <path
          d="M23 13H13C11.8954 13 11 13.8954 11 15V21C11 22.1046 11.8954 23 13 23H23C24.1046 23 25 22.1046 25 21V15C25 13.8954 24.1046 13 23 13Z"
          fill="white"
          fill-opacity="0.5"
          stroke="#4F5E71"
          stroke-width="2"
        />
        <path d="M3 9H17" stroke="#4F5E71" stroke-width="1.5" />
      </svg>
    ),
    loans: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-hand-coins preview-icon"
      >
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="9" r="2.9" />
        <circle cx="6" cy="5" r="3" />
      </svg>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
};

const OpenAccount = () => {
  const [savedApplication] = useState(() => {
    const saved = localStorage.getItem(APPLICATION_STORAGE_KEY);
    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Unable to load saved application.", error);
      return null;
    }
  });
  const [currentStep, setCurrentStep] = useState(
    () => savedApplication?.currentStep ?? 0,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSsn, setShowSsn] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState(
    () => ({ ...defaultFormData, ...savedApplication?.formData }),
  );

  const saveApplication = useCallback(
    (step = currentStep) => {
    localStorage.setItem(
      APPLICATION_STORAGE_KEY,
        JSON.stringify({ currentStep: step, formData }),
    );
    },
    [currentStep, formData],
  );

  useEffect(() => {
    const handleSave = () => saveApplication();
    window.addEventListener("ufcu-save-application", handleSave);

    return () =>
      window.removeEventListener("ufcu-save-application", handleSave);
  }, [saveApplication]);

  useEffect(() => {
    saveApplication();
  }, [saveApplication]);

  const updateField = (field, value) => {
    setFormData((data) => ({ ...data, [field]: value }));
  };

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    saveApplication(nextStep);

    if (currentStep === steps.length - 1) {
      setIsSubmitted(true);
      if (selectedCard) {
        sessionStorage.setItem(
          "ufcu-selected-card",
          JSON.stringify({
            name: selectedCard.name,
            image: selectedCard.image,
          }),
        );
      }
      window.location.assign("/application-complete");
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    goToNextStep();
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const selectedCard = cardDesigns[Number(formData.cardDesign) - 1];
  const showLegacyAside = currentStep < 0;

  return (
    <main className="min-h-[calc(100vh-4rem)] font-sans! bg-white text-primary-color">
      <div className="flex min-h-[calc(100vh-4rem)] max-w-360 items-stretch">
        <AccountAside
          card={selectedCard}
          currentStep={currentStep}
          isSubmitted={isSubmitted}
          totalSteps={steps.length}
        />
        {showLegacyAside ? (
          <aside className="hidden" aria-hidden="true">
            <YourInfoAside
              card={selectedCard}
              currentStep={currentStep}
              isSubmitted={isSubmitted}
            />
            <p className="text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
              Become a member
            </p>
            <h1 className="my-2 font-sans!  text-darkest-primary text-heading-4 font-bold">
              Let's get started
            </h1>
            <p className="text-small-text-r leading-4  text-slate-600">
              Choose what you&apos;d like to get started with today. This helps
              us show you the right options and a simpler application
              experience.
            </p>

            <div className="mt-7 space-y-5">
              <InfoItem
                icon={
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
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                }
                title="More than a bank"
                text="As a member, you get access to better rates, fewer fees, and community-focused services."
              />
              <InfoItem
                icon={
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
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                }
                title="Your information is secure"
                text="We use industry-standard encryption to protect your personal information."
              />
              <InfoItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-headphones preview-icon"
                  >
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                }
                title="Need help?"
                text="Call us at (512) 467-8080 or (800) 252-8311."
              />
            </div>
            <CardPreview
              card={selectedCard}
              currentStep={currentStep}
              isSubmitted={isSubmitted}
            />
          </aside>
        ) : null}

        <section className="min-w-0 flex-1 px-5 py-7 sm:px-10 lg:px-12">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl"
          >
            <Wizard
              currentStep={currentStep}
              steps={steps}
              onStepChange={setCurrentStep}
              cardImage={currentStep >= 2 ? selectedCard?.image : undefined}
              cardName={currentStep >= 2 ? selectedCard?.name : undefined}
            />
            <div className="mb-9 hidden w-full items-start justify-start lg:flex">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="relative flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
                >
                  {index < steps.length - 1 && (
                    <span
                      className={`absolute left-4 right-0 top-2 h-px ${index < currentStep ? "bg-secondary-color" : "bg-slate-300"}`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex size-4 items-center justify-center rounded-full text-[9px] font-bold ${index <= currentStep ? "bg-secondary-color text-white" : "bg-slate-200 text-slate-500"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-smallest-text-r ${index === currentStep ? "font-bold text-primary-color" : "text-slate-500"}`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <StepContent
              currentStep={currentStep}
              formData={formData}
              updateField={updateField}
              showSsn={showSsn}
              setShowSsn={setShowSsn}
              onStepChange={setCurrentStep}
            />

            <div className="mt-8 flex justify-between">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="rounded-full flex items-center  gap-1 cursor-pointer border border-primary-color px-3 hover:bg-primary-color hover:text-white transition-colors duration-100 ease-in-out py-2.5 text-small-text-b font-semibold text-primary-color"
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
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="rounded-full flex items-center cursor-pointer bg-primary-color px-5 py-2.5 text-small-text-b font-semibold text-white transition hover:bg-darker-primary"
              >
                {currentStep === steps.length - 1
                  ? "Submit application"
                  : "Continue"}{" "}
                <span className="ml-2 ">
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
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

const StepContent = ({
  currentStep,
  formData,
  updateField,
  showSsn,
  setShowSsn,
  onStepChange,
}) => {
  const selectedCard = cardDesigns[Number(formData.cardDesign) - 1];

  if (currentStep === 0) {
    return (
      <>
        <p className="text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
          New account
        </p>
        <h2 className="my-2 font-heading text-heading-1 font-bold">
          What brings you here?
        </h2>
        <p className="text-paragraph-r text-slate-600">
          Choose what you&apos;d like to get started with today.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {options.map((option, index) => (
            <button
              key={option.title}
              type="button"
              onClick={() => updateField("accountType", index)}
              aria-pressed={formData.accountType === index}
              className={`flex min-h-28 cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition ${formData.accountType === index ? "border-secondary-color border-2 bg-subtle-secondary/30 shadow-sm" : "border-slate-200 bg-white hover:border-lighter-primary"}`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg ${formData.accountType === index ? "bg-subtle-secondary text-secondary-color" : "bg-slate-100 text-slate-500"}`}
              >
                <OptionIcon type={option.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-small-text-b font-bold">
                  {option.title}
                </span>
                <span className="mt-1 block text-smallest-text-r leading-4 text-slate-500">
                  {option.description}
                </span>
              </span>
              <span className="ml-auto text-slate-400" aria-hidden="true">
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
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </>
    );
  }

  if (currentStep === 1) {
    return (
      <>
        <StepHeading
          eyebrow="Personalize"
          title="Tell us about yourself"
          description="Let's personalize your experience."
        />
        <div className="mt-7 space-y-6">
          <div className="rounded-xl ">
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-primary-color">
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-graduation-cap preview-icon"
                  >
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                    <path d="M22 10v6" />
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                  </svg>
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-paragraph-r font-bold font-sans">
                  1. Select your school or organization
                </h3>
                <p className="mt-1 font-sans text-small-text-b text-slate-500">
                  Choose the school, company or organization you&apos;re
                  affiliated with.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    updateField("organization", "Austin Community College")
                  }
                  className="mt-5 flex w-full items-center gap-3 rounded-xl border-2 border-slate-200 px-4 py-4 text-left text-small-text-b transition hover:border-lighter-primary"
                >
                  <span className="text-primary-color" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-graduation-cap preview-icon"
                    >
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                      <path d="M22 10v6" />
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                    </svg>
                  </span>
                  <span className="flex-1 ">
                    {formData.organization ||
                      "Select your school or organization"}
                  </span>
                  <span className="text-slate-400" aria-hidden="true">
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
                <div className="my-5 flex items-center gap-3 text-small-text-r text-slate-500">
                  <span className="h-px flex-1 bg-slate-200" /> OR{" "}
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <label className="flex items-center text-small-text-r gap-3 lg:text-paragraph-r text-slate-600">
                  <input
                    type="checkbox"
                    checked={formData.joinCouncil}
                    onChange={(event) =>
                      updateField("joinCouncil", event.target.checked)
                    }
                    className="size-5 "
                  />
                  I&apos;d like to join UFCU through the
                  <span className="cursor-pointer text-[#1A5BCE] underline">
                    American Consumer Council
                  </span>
                  for free.
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5">
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-primary-color">
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-credit-card preview-icon"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                    <path d="M6 14h2" />
                  </svg>
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-paragraph-b font-bold">
                  2. Pick your card design
                </h3>
                <p className="mt-1 text-small-text-b text-slate-500">
                  Choose a card that feels like you. You&apos;ll receive a Visa®
                  debit card with your new account.
                </p>
                <div className="mt-5 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {cardDesigns.map(({ name, description, image }, index) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => updateField("cardDesign", index + 1)}
                      className={`flex h-full flex-col text-left rounded-lg border-2 p-2  ${
                        formData.cardDesign === index + 1
                          ? "border-dashed border-darkest-primary"
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex aspect-[1.6] w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={image}
                          alt={`${name} debit card`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="mt-2 block  leading-5 text-small-text-b font-bold">
                        {name}
                      </span>
                      <span className="mt-1 block text-smallest-text-r leading-4 text-lighter-primary">
                        {description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (currentStep === 2) {
    return (
      <>
        <StepHeading
          eyebrow="New account"
          title="Let's get to know you"
          description="Please provide your information so we can set up your account."
        />
        <div className="mt-7 space-y-7">
          <section>
            <h3 className="text-paragraph-b font-bold">Legal name</h3>
            <p className="mt-1 text-small-text-r text-primary-color">
              Use your full legal name as it appears on your government-issued
              ID.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <FormField
                label="First name"
                value={formData.firstName}
                placeholder="e.g. Jordan"
                onChange={(value) => updateField("firstName", value)}
              />
              <FormField
                label="Middle name"
                optional
                value={formData.middleName}
                placeholder="e.g. Taylor"
                onChange={(value) => updateField("middleName", value)}
              />
              <FormField
                label="Last name"
                value={formData.lastName}
                placeholder="e.g. Smith"
                onChange={(value) => updateField("lastName", value)}
              />
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              label="Date of birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(value) => updateField("dateOfBirth", value)}
            />
            <FormField
              label="Email address"
              type="email"
              value={formData.email}
              placeholder="you@example.com"
              onChange={(value) => updateField("email", value)}
            />
            <FormField
              label="Phone number"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              minLength={10}
              value={formData.phone}
              placeholder="Enter at least 10 digits"
              onChange={(value) => updateField("phone", value)}
            />
          </div>

          <section>
            <div className="flex items-end gap-5">
              <div>
                <h3 className="text-paragraph-b font-bold">
                  Social Security number (SSN) or ITIN
                </h3>
              </div>
              <a
                href="#what-is-an-itin"
                className="shrink-0 text-smallest-text-b font-bold text-[#1a5bce] underline"
              >
                What is an ITIN?
              </a>
            </div>
            <p className="mt-1 flex items-center  gap-2 text-small-text-r text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-lock preview-icon"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Your information is encrypted and secure.
            </p>
            <div className="mt-4 max-w-sm">
              <SecureFormField
                label="SSN or ITIN"
                value={formData.ssn}
                placeholder="Enter at least 10 digits"
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={10}
                showValue={showSsn}
                onToggle={() => setShowSsn((visible) => !visible)}
                onChange={(value) => updateField("ssn", value)}
              />
            </div>
            <label className="mt-4 flex items-start gap-2 text-smallest-text-r leading-4 text-slate-600">
              <input
                type="checkbox"
                checked={formData.identityConfirmed}
                onChange={(event) =>
                  updateField("identityConfirmed", event.target.checked)
                }
                required
                className="mt-0.5 size-4"
              />
              <span>
                Under penalty of perjury, I certify that I am a U.S. citizen or
                resident alien and that the number shown above is my correct
                taxpayer identification number.
              </span>
            </label>
          </section>

          <section>
            <h3 className="text-paragraph-b font-bold">Residential address</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField
                label="Residential address"
                value={formData.address}
                placeholder="Street address"
                onChange={(value) => updateField("address", value)}
              />
              <FormField
                label="Apt/Unit"
                optional
                value={formData.apartment}
                placeholder="Apt/Unit"
                onChange={(value) => updateField("apartment", value)}
              />
              <FormField
                label="State"
                value={formData.state}
                placeholder="State"
                onChange={(value) => updateField("state", value)}
              />
              <FormField
                label="City"
                value={formData.city}
                placeholder="City"
                onChange={(value) => updateField("city", value)}
              />
              <FormField
                label="Zip code"
                value={formData.zipCode}
                placeholder="Zip code"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(value) => updateField("zipCode", value)}
              />
            </div>
            <label className="mt-4 flex items-center gap-2 text-small-text-r text-slate-600">
              <input
                type="checkbox"
                checked={formData.mailingAddressSame}
                onChange={(event) =>
                  updateField("mailingAddressSame", event.target.checked)
                }
                className="size-4"
              />
              Mailing address is the same as my residential address
            </label>
          </section>
        </div>
      </>
    );
  }

  if (currentStep === 3) {
    return (
      <>
        <StepHeading
          eyebrow="Funding"
          title="Fund your account"
          description="Choose how you'd like to add money to your new account."
        />
        <div className="mt-6 space-y-7">
          <section>
            <h3 className="text-small-text-b font-bold">
              Do you want to fund your account now?
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "now",
                  title: "Yes, I'd like to fund now",
                  description: "Get started right away.",
                },
                {
                  value: "later",
                  title: "No, I'll fund later",
                  description:
                    "You can always add money after your account is opened.",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("fundingNow", option.value)}
                  className={`rounded-xl border p-4 text-left transition ${
                    formData.fundingNow === option.value
                      ? "border-secondary-color border-2"
                      : "border-slate-200 hover:border-lighter-primary"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${
                        formData.fundingNow === option.value
                          ? "border-secondary-color"
                          : "border-slate-300"
                      }`}
                    >
                      {formData.fundingNow === option.value && (
                        <span className="size-2 rounded-full bg-secondary-color" />
                      )}
                    </span>
                    <span>
                      <span className="block text-small-text-b font-bold">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-smallest-text-r text-slate-500">
                        {option.description}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {formData.fundingNow === "now" && (
            <>
              <section>
                <h3 className="text-small-text-b font-bold">
                  Choose a funding method
                </h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {fundingMethods.map(
                    ({ value, title, description, icon, maxAmount }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateField("fundingMethod", value)}
                        className={`flex min-h-40 w-full flex-col rounded-xl border p-4 text-left transition ${
                          formData.fundingMethod === value
                            ? "border-secondary-color border-2 bg-subtle-secondary/30"
                            : "border-slate-200 hover:border-lighter-primary"
                        }`}
                      >
                        <span className="flex flex-col gap-1">
                          <span className="flex items-center gap-3">
                            <FundingIcon type={icon} />
                            <span className="flex leading-5 justify-between gap-2 text-small-text-b font-bold">
                              {title}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 shrink-0"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                              </svg>
                            </span>
                          </span>
                          <span className="mt-2 block max-w-max  px-2 rounded-full text-smallest-text-r font-bold bg-lighter-primary/30 border border-subtle-border text-primary-color">
                            ${maxAmount.toLocaleString()} max
                          </span>
                          <span className="mt-1 block text-smallest-text-r leading-4 text-slate-500">
                            {description}
                          </span>
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-small-text-b font-bold">
                  Enter your funding amounts
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <FormField
                    label="Free Checking"
                    type="number"
                    optional
                    min="0"
                    step="0.01"
                    max={
                      fundingMethods.find(
                        (method) => method.value === formData.fundingMethod,
                      )?.maxAmount
                    }
                    value={formData.checkingAmount}
                    placeholder="$0.00"
                    onChange={(value) => updateField("checkingAmount", value)}
                  />
                  <FormField
                    label="Savings"
                    optional
                    type="number"
                    min="0"
                    step="0.01"
                    max={
                      fundingMethods.find(
                        (method) => method.value === formData.fundingMethod,
                      )?.maxAmount
                    }
                    value={formData.savingsAmount}
                    placeholder="$0.00"
                    onChange={(value) => updateField("savingsAmount", value)}
                  />
                </div>
              </section>

              <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
                <span>
                  <span className="block text-small-text-b font-bold">
                    Courtesy Pay
                  </span>
                  <span className="mt-1 block text-smallest-text-r leading-4 text-slate-500">
                    If you opt in, we may approve a transaction that overdraws
                    your account and allow your balance to be negative. A $35
                    fee applies per transaction, and you must repay the amount
                    and fee within 45 days.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={formData.courtesyPay}
                  onChange={(event) =>
                    updateField("courtesyPay", event.target.checked)
                  }
                  className="size-5 shrink-0"
                />
              </label>
            </>
          )}
        </div>
      </>
    );
  }

  if (currentStep === 4) {
    return (
      <>
        <StepHeading
          eyebrow="Disclosures"
          title="Review the disclosures"
          description="Please click and read through the following disclosures."
        />
        <div className="mt-6">
          <div className="rounded-xl space-y-3 border border-subtle-border bg-[#F0F5FC] p-4 text-small-text-r text-primary-color leading-5">
            <div className="flex gap-2 leading-5 font-normal tracking-tight">
              <span className="size-9 flex items-center justify-center p-2 rounded-full  bg-white border-subtle-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-square-text preview-icon"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 8h8" />
                  <path d="M7 12h10" />
                  <path d="M7 16h6" />
                </svg>
              </span>
              Please review and consent to the information included in the UFCU
              ESign Member Consent to use Electronic Signature and Documents.
            </div>
            <a
              href="#"
              className="text-[#1A5BCE] hover:underline font-medium flex gap-2 items-center"
            >
              UFCU ESign Member Consent to use Electronic Signature and
              Documents
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
        <label className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-paragraph-r text-slate-600">
          <input
            type="checkbox"
            checked={formData.disclosuresAccepted}
            onChange={(event) =>
              updateField("disclosuresAccepted", event.target.checked)
            }
            required
            className="mt-1 size-4 shrink-0"
          />
          <span className="text-small-text-r leading-5 font-normal">
            By clicking this checkbox, you agree to have reviewed and consent to
            the UFCU ESign Member Consent to use Electronic Signature and
            Documents; consent to receive share account disclosures, account
            statements, credit card disclosures, and account statements
            electronically; have access to an account with an Internet Service
            Provider and are able to send and receive email; and have the
            ability to view and print PDF files on your internet accessible
            device.
          </span>
        </label>
      </>
    );
  }

  return (
    <>
      <StepHeading
        eyebrow="Review"
        title="Review and submit"
        description="Looks good? Let's make it official."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ReviewSection
          title="Account type"
          onEdit={() => onStepChange(0)}
          rows={[
            ["Account", options[formData.accountType]?.title],
            ["Organization", formData.organization || "Not provided"],
          ]}
        />
        <ReviewSection
          title="Card design"
          onEdit={() => onStepChange(1)}
          rows={[
            ["Card", selectedCard?.name || "Not selected"],
            ["Description", selectedCard?.description || "Not provided"],
          ]}
        >
          {selectedCard && (
            <img
              src={selectedCard.image}
              alt={`${selectedCard.name} debit card`}
              className="mt-3 aspect-[1.6] w-full rounded-lg object-cover shadow-sm"
            />
          )}
        </ReviewSection>
        <ReviewSection
          title="Your information"
          onEdit={() => onStepChange(2)}
          rows={[
            [
              "Name",
              [formData.firstName, formData.middleName, formData.lastName]
                .filter(Boolean)
                .join(" "),
            ],
            ["Email", formData.email],
            ["Phone", formData.phone],
            ["SSN / ITIN", formData.ssn ? `••••${formData.ssn.slice(-4)}` : "Not provided"],
          ]}
        />
        <ReviewSection
          title="Funding"
          onEdit={() => onStepChange(3)}
          rows={[
            [
              "Preference",
              formData.fundingNow === "now" ? "Fund now" : "Fund later",
            ],
            [
              "Method",
              fundingMethods.find(
                (method) => method.value === formData.fundingMethod,
              )?.title || "Not selected",
            ],
            [
              "Initial deposit",
              [
                formData.checkingAmount &&
                  `Checking: $${Number(formData.checkingAmount).toFixed(2)}`,
                formData.savingsAmount &&
                  `Savings: $${Number(formData.savingsAmount).toFixed(2)}`,
              ]
                .filter(Boolean)
                .join(" · ") || "None",
            ],
            ["Courtesy Pay", formData.courtesyPay ? "Included" : "Not included"],
          ]}
        />
      </div>

      <div className="flex items-center mt-3 gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-small-text-r text-green-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="size-5 shrink-0"
          aria-hidden="true"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
        Your disclosures have been accepted. You&apos;re ready to submit.
      </div>
    </>
  );
};

const ReviewSection = ({ title, rows, onEdit, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-paragraph-b font-bold text-primary-color">{title}</h3>
      <button
        type="button"
        onClick={onEdit}
        className="text-small-text-b font-bold text-secondary-color underline"
      >
        Edit
      </button>
    </div>
    <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-left text-small-text-r">
        <tbody>
          {rows.map(([label, value], index) => (
            <tr
              key={label}
              className={index % 2 === 0 ? "bg-slate-50/70" : "bg-white"}
            >
              <th
                scope="row"
                className="w-2/5 border-b border-slate-200 px-3 py-2.5 font-normal text-slate-500"
              >
                {label}
              </th>
              <td className="border-b border-slate-200 px-3 py-2.5 font-semibold text-primary-color">
                {value || "Not provided"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {children}
  </section>
);

const YourInfoAside = ({ card, currentStep, isSubmitted }) => (
  <div className="account-aside__your-info font-sans">
    <p className="text-[10px] font-bold uppercase tracking-wider text-lighter-primary">
      Open an account
    </p>
    <h1 className="my-2 font-sans! text-heading-4 font-bold leading-6 text-darkest-primary ">
      You&apos;re one step closer.
    </h1>
    <p className="text-small-text-r! leading-4 text-slate-600">
      A few more details and you&apos;ll be on your way.
    </p>

    <div className="mt-7 rounded-xl border border-[#c8d8e8] bg-white/55 p-3">
      <h2 className="text-small-text-b font-bold text-darkest-primary">
        What you&apos;ll need
      </h2>
      <ul className="mt-3 space-y-3 text-[11px] leading-4 text-primary-color">
        <AsideRequirement text="You must be 18 years of age or older" />
        <AsideRequirement text="A valid driver's license or state-issued ID" />
        <AsideRequirement text="Your Social Security number (SSN) or ITIN" />
      </ul>
    </div>

    <div className="mt-3 rounded-xl border border-[#f0c9a9] bg-[#fff4ec] p-3">
      <div className="flex gap-2">
        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary-color text-[10px] font-bold text-white">
          !
        </span>
        <div>
          <h2 className="text-small-text-b font-bold text-darkest-primary">
            Not 18 yet?
          </h2>
          <p className="mt-1 text-[11px] leading-4 text-primary-color">
            If you do not meet these requirements, you&apos;ll need to schedule
            an appointment at a UFCU branch.
          </p>
          <a
            href="#appointment"
            className="mt-2 inline-block text-[11px] font-bold text-secondary-color underline"
          >
            Schedule an appointment →
          </a>
        </div>
      </div>
    </div>

    <CardPreview
      card={card}
      currentStep={currentStep}
      isSubmitted={isSubmitted}
    />
  </div>
);

const AsideRequirement = ({ text }) => (
  <li className="flex items-start gap-2">
    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary-color text-[9px] text-white">
      ✓
    </span>
    <span>{text}</span>
  </li>
);

const CardPreview = ({ card, currentStep, isSubmitted }) => {
  const progress = Math.min((currentStep + 1) / steps.length, 1);

  return (
    <div className="mt-12 rounded-2xl p-3">
      {card ? (
        <div className="rounded-xl bg-white/60 p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
                Your card
              </p>
            </div>
          </div>
          <div
            key={card.name}
            className="relative mb-2 aspect-[1.6] overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={card.image}
              alt={`${card.name} debit card preview`}
              className="h-full w-full object-cover"
            />
            {!isSubmitted && (
              <span
                className="card-preview-reveal__gradient absolute inset-y-0 left-0"
                style={{ "--card-progress-width": `${progress * 100}%` }}
                aria-hidden="true"
              />
            )}
          </div>
          <p className="text-primary-color font-bold tracking-tight ">
            Your card is in progress.
          </p>
          <span className="text-lighter-primary block leading-4 text-small-text-b">
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
            className="text-darkest-primary"
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

const StepHeading = ({ eyebrow, title, description }) => (
  <>
    <p className="text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
      {eyebrow}
    </p>
    <h2 className="my-2 font-heading text-heading-1 font-bold">{title}</h2>
    <p className="text-paragraph-r text-slate-600">{description}</p>
  </>
);

const FundingIcon = ({ type }) => {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    bank: (
      <>
        <path d="M3 21h18M5 18v-7M9 18v-7M15 18v-7M19 18v-7" />
        <path d="m12 3 9 4H3l9-4Z" />
      </>
    ),
    account: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-square-text preview-icon"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 8h8" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
      </svg>
    ),
    card: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 10h19M6 15h3" />
      </>
    ),
  };

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-primary-color">
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
        {paths[type]}
      </svg>
    </span>
  );
};

const FormField = ({
  label,
  type = "text",
  value,
  placeholder,
  optional = false,
  inputMode,
  pattern,
  minLength,
  min,
  step,
  max,
  onChange,
}) => (
  <label className="text-small-text-b font-semibold">
    {label}{" "}
    {optional && <span className="font-normal text-slate-400">(optional)</span>}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      required={!optional}
      inputMode={inputMode}
      pattern={pattern}
      minLength={minLength}
      min={min}
      step={step}
      max={max}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-paragraph-r font-normal outline-none placeholder:text-slate-400 focus:border-secondary-color"
    />
  </label>
);

const SecureFormField = ({
  label,
  value,
  placeholder,
  inputMode,
  pattern,
  minLength,
  showValue,
  onToggle,
  onChange,
}) => (
  <label className="text-small-text-b font-semibold">
    {label}
    <span className="relative mt-2 block">
      <input
        type={showValue ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        required
        inputMode={inputMode}
        pattern={pattern}
        minLength={minLength}
        onChange={(event) => onChange(event.target.value)}
        className="block w-full rounded-lg border border-slate-300 px-4 py-3 pr-16 text-paragraph-r font-normal outline-none placeholder:text-slate-400 focus:border-secondary-color"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-3 text-smallest-text-b font-bold text-primary-color underline"
        aria-label={showValue ? "Hide SSN or ITIN" : "Show SSN or ITIN"}
      >
        {showValue ? "Hide" : "Show"}
      </button>
    </span>
  </label>
);

const InfoItem = ({ icon, title, text }) => (
  <div className="flex gap-2">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C8D8E8]  text-primary-color">
      {icon}
    </span>
    <div className="flex flex-col gap-1">
      <h2 className="text-small-text-b font-bold leading-4">{title}</h2>
      <p className="mt-1  text-smallest-text-r leading-4 text-primary-color">
        {text}
      </p>
    </div>
  </div>
);

export default OpenAccount;
