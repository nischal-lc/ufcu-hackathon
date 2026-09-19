import AccountCard from './AccountCard'

const HeroSection = () => (
  <section className="relative isolate overflow-hidden bg-[#092c48] pb-12">
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center opacity-80"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(0, 0, 0, .75) 0%, rgba(4, 31, 53, .52) 45%, rgba(15, 34, 43, .25) 100%), url("/hero_background.jpg")',
      }}
    />
    <div className="mx-auto flex min-h-72 max-w-360 flex-col items-center justify-center gap-5 px-5 py-12 text-center text-white">
      <p className="mb-2 text-heading-3 font-semibold">Welcome to UFCU</p>
      <h1 className="text-heading-1! font-bold font-heading lg:tracking-tight leading-9 sm:text-4xl">
        How can we help <span className="text-darker-secondary">U</span> today?
      </h1>
      <p className="text-paragraph-r text-slate-100">Choose an option to get started.</p>
    </div>
    <div className="relative mx-auto flex w-full max-w-360 flex-col items-center justify-center gap-3 px-5 lg:flex-row">
      <AccountCard recommended>I'm new to UFCU</AccountCard>
      <AccountCard member>I'm already a member</AccountCard>
    </div>
  </section>
)

export default HeroSection
