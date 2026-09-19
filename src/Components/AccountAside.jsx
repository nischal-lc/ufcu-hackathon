import CardPreview from "./CardPreview";

const AccountAside = ({ card, currentStep, isSubmitted, totalSteps }) => (
  <aside className="account-aside hidden w-72 shrink-0 self-start overflow-y-auto overscroll-contain p-3 lg:sticky lg:top-16 lg:flex lg:min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] lg:flex-col">
    <div
      className={`transition-all duration-500 ease-out ${
        currentStep === 2
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none absolute -translate-y-2 opacity-0"
      }`}
      aria-hidden={currentStep !== 2}
    >
      <YourInfoContent />
    </div>

    <div
      className={`transition-all duration-500 ease-out ${
        currentStep === 3
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none absolute -translate-y-2 opacity-0"
      }`}
      aria-hidden={currentStep !== 3}
    >
      <FundingContent />
    </div>

    <div
      className={`transition-all duration-500 ease-out ${
        currentStep === 4
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none absolute -translate-y-2 opacity-0"
      }`}
      aria-hidden={currentStep !== 4}
    >
      <DisclosureContent />
    </div>

    <div
      className={`transition-all duration-500 ease-out ${
        currentStep === 5
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none absolute -translate-y-2 opacity-0"
      }`}
      aria-hidden={currentStep !== 5}
    >
      <ReviewContent />
    </div>

    <div
      className={`transition-all duration-500 ease-out ${
        currentStep === 2 ||
        currentStep === 3 ||
        currentStep === 4 ||
        currentStep === 5
          ? "pointer-events-none absolute -translate-y-2 opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
      aria-hidden={
        currentStep === 2 ||
        currentStep === 3 ||
        currentStep === 4 ||
        currentStep === 5
      }
    >
      <p className="text-smallest-text-b font-bold uppercase tracking-wider text-lighter-primary">
        Become a member
      </p>
      <h1 className="my-2 font-sans! text-darkest-primary text-heading-4 font-bold">
        Let&apos;s get started
      </h1>
      <p className="text-small-text-r leading-4 text-slate-600">
        Choose what you&apos;d like to get started with today. This helps us
        show you the right options and a simpler application experience.
      </p>
      <div className="mt-7 space-y-5 rounded-xl border border-white/80 bg-white/80 p-3">
        <InfoItem
          icon={<PeopleIcon />}
          title="More than a bank"
          text="As a member, you get access to better rates, fewer fees, and community-focused services."
        />
        <InfoItem
          icon={<SecurityIcon />}
          title="Your information is secure"
          text="We use industry-standard encryption to protect your personal information."
        />
        <InfoItem
          icon={<HelpIcon />}
          title="Need help?"
          text="Call us at (512) 467-8080 or (800) 252-8311."
        />
      </div>
    </div>

    <CardPreview
      card={card}
      currentStep={currentStep}
      isSubmitted={isSubmitted}
      totalSteps={totalSteps}
    />
  </aside>
);

const YourInfoContent = () => (
  <div className="account-aside__your-info font-sans">
    <p className="text-smallest-text-r font-bold uppercase tracking-wider text-lighter-primary">
      Open an account
    </p>
    <h1 className="my-1 text-heading-4 font-bold leading-6 text-darkest-primary">
      You&apos;re one step closer.
    </h1>
    <p className="text-small-text-r leading-4 text-slate-600">
      A few more details and you&apos;ll be on your way.
    </p>
    <div className="mt-3 rounded-xl border border-[#c8d8e8] bg-white/55 p-3">
      <h2 className="text-small-text-b font-bold text-darkest-primary">
        What you&apos;ll need
      </h2>
      <ul className="mt-2 space-y-2 text-smallest-text-r leading-4 text-primary-color">
        <Requirement text="You must be 18 years of age or older" />
        <Requirement text="A valid driver's license or state-issued ID" />
        <Requirement text="Your Social Security number (SSN) or ITIN" />
      </ul>
    </div>
    <div className="mt-2 rounded-xl border border-[#f0c9a9] bg-[#fff4ec] p-3">
      <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-2">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary-color text-[10px] font-bold text-white">
            !
          </span>
          <h2 className="text-small-text-b font-bold text-darkest-primary">
            Not 18 yet?
          </h2>
        </div>
        <div>
          <p className="mt-1 text-smallest-text-r leading-4 text-primary-color">
            If you do not meet these requirements, you&apos;ll need to schedule
            an appointment at a UFCU branch.
          </p>
          <a
            href="#appointment"
            className="mt-2 inline-block text-smallest-text-r font-bold text-secondary-color underline"
          >
            Schedule an appointment →
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Requirement = ({ text }) => (
  <li className="flex items-start gap-2">
    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary-color text-[9px] text-white">
      ✓
    </span>
    <span>{text}</span>
  </li>
);

const FundingContent = () => (
  <div className="account-aside__your-info font-sans">
    <p className="text-smallest-text-r font-bold uppercase tracking-wider text-lighter-primary">
      Open an account
    </p>
    <h1 className="my-1 text-heading-4 font-bold leading-6 text-darkest-primary">
      You&apos;re one step closer.
    </h1>
    <p className="text-small-text-r leading-4 text-slate-600">
      A few more details and you&apos;ll be on your way.
    </p>
    <div className="mt-3 rounded-xl border border-[#c8d8e8] bg-white/80 p-4">
      <div className="flex items-center gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-primary-color">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c.8-3.4 3.2-5 7-5s6.2 1.6 7 5" />
          </svg>
        </span>
        <h2 className="text-small-text-r font-bold  text-darkest-primary">
          Why fund now?
        </h2>
      </div>
      <ul className="mt-5 space-y-2 text-small-text-r leading-5 text-slate-600">
        <FundingBenefit text="Start using your account sooner" />
        <FundingBenefit text="Set up direct deposit later" />
        <FundingBenefit text="It only takes a few minutes" />
      </ul>
    </div>
  </div>
);

const FundingBenefit = ({ text }) => (
  <li className="flex items-start text-smallest-text-r font-normal gap-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-0.5 size-5 shrink-0 text-primary-color"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
    <span>{text}</span>
  </li>
);

const DisclosureContent = () => (
  <div className="account-aside__your-info font-sans">
    <p className="text-smallest-text-r font-bold uppercase tracking-wider text-lighter-primary">
      Almost there
    </p>
    <h1 className="my-1 text-heading-4 font-bold leading-6 text-darkest-primary">
      Last step before you're all set!
    </h1>
    <p className="text-small-text-r leading-4 text-slate-600">
      Review and agree to a few disclosures to complete your application.{" "}
    </p>
    <div className="mt-3 space-y-2 rounded-xl border border-[#c8d8e8] bg-white/80 p-3">
      <DisclosureTip
        icon={<DocumentIcon />}
        title="Your agreements"
        text="Review the account terms and fee information that apply to you."
      />
      <DisclosureTip
        icon={<ShieldIcon />}
        title="Your information is protected"
        text="Your personal information is handled securely throughout the application."
      />
      <DisclosureTip
        icon={<CheckIcon />}
        title="One last step"
        text="Accept the disclosures to continue to your final application review."
      />
    </div>
  </div>
);

const DisclosureTip = ({ icon, title, text }) => (
  <div className="flex gap-2 rounded-lg bg-white/70 p-2">
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-primary-color">
      {icon}
    </span>
    <div>
      <h2 className="text-small-text-b font-bold leading-4 text-darkest-primary">
        {title}
      </h2>
      <p className="mt-1 text-smallest-text-r leading-4 text-primary-color">
        {text}
      </p>
    </div>
  </div>
);

const ReviewContent = () => (
  <div className="account-aside__your-info font-sans">
    <p className="text-smallest-text-r font-bold uppercase tracking-wider text-lighter-primary">
      Almost there
    </p>
    <h1 className="my-1 text-heading-4 font-bold leading-6 text-darkest-primary">
      Your application is ready.
    </h1>
    <p className="text-small-text-r leading-4 text-slate-600">
      Review your details one last time, then submit your application.
    </p>
    <div className="mt-3 rounded-xl border border-[#c8d8e8] bg-white/80 p-3">
      <div className="flex items-center gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-primary-color">
          <CheckIcon />
        </span>
        <div>
          <h2 className="text-small-text-b font-bold leading-4 text-darkest-primary">
            Ready to submit
          </h2>
          <p className="mt-1 text-smallest-text-r leading-4 text-primary-color">
            All required steps are complete.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2 border-t border-[#c8d8e8] pt-3">
        <ReviewProgressItem label="Account details" />
        <ReviewProgressItem label="Personal information" />
        <ReviewProgressItem label="Funding preferences" />
        <ReviewProgressItem label="Disclosures accepted" />
      </div>
    </div>
    <div className="mt-3 rounded-xl border border-[#f0c9a9] bg-[#fff4ec] p-3">
      <p className="text-smallest-text-r leading-4 text-primary-color">
        Need to make a change? Use the Edit link in any section to update your
        application before submitting.
      </p>
    </div>
  </div>
);

const ReviewProgressItem = ({ label }) => (
  <div className="flex items-center gap-2 text-smallest-text-r text-primary-color">
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary-color text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="size-2.5"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    </span>
    {label}
  </div>
);

const DocumentIcon = () => (
  <AsideIcon>
    <path d="M6 3.75h8l4 4V20.25H6z" />
    <path d="M14 3.75v4h4M8.5 12h7M8.5 15h7" />
  </AsideIcon>
);

const ShieldIcon = () => (
  <AsideIcon>
    <path d="M12 3.5 19 6v5.25c0 4.35-2.75 7.55-7 9.25-4.25-1.7-7-4.9-7-9.25V6z" />
    <path d="m9 12 2 2 4-4" />
  </AsideIcon>
);

const CheckIcon = () => (
  <AsideIcon>
    <path d="m5 12 4 4L19 6" />
  </AsideIcon>
);

const InfoItem = ({ icon, title, text }) => (
  <div className="flex gap-2">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C8D8E8] text-primary-color">
      {icon}
    </span>
    <div className="flex flex-col gap-1">
      <h2 className="text-small-text-b font-bold leading-4">{title}</h2>
      <p className="mt-1 text-smallest-text-r leading-4 text-primary-color">
        {text}
      </p>
    </div>
  </div>
);

const AsideIcon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const PeopleIcon = () => (
  <AsideIcon>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </AsideIcon>
);

const SecurityIcon = () => (
  <AsideIcon>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 12.75 2.25 2.25L15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  </AsideIcon>
);

const HelpIcon = () => (
  <AsideIcon>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
    />
  </AsideIcon>
);

export default AccountAside;
