import Arrow from './Arrow'

const AccountCard = ({ member, children, recommended }) => (
  <article
    className={`relative flex h-56 w-full lg:max-w-80 cursor-pointer flex-col justify-between rounded-lg border p-5 shadow-lg transition hover:-translate-y-1 ${
      member
        ? 'border-[#b9c7e7] bg-white text-[#23335d]'
        : 'border-[#23335d] bg-primary-color text-white'
    }`}
  >
    {recommended && (
      <span className="absolute right-2 top-2 rounded-full bg-white px-2 py-0.5 text-smallest-text-b font-semibold text-[#23335d]">
        Recommended
      </span>
    )}
    <div className="mb-2 flex items-start justify-between">
      <span className="text-3xl font-light" aria-hidden="true">
        <svg
          width={52}
          height={52}
          viewBox={member ? '0 0 66 76' : '0 0 52 52'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={member ? 28 : 26}
            cy={member ? 22 : 20}
            r={member ? 17 : 14}
            stroke={member ? '#0D2244' : 'white'}
            strokeWidth="4"
          />
          <path
            d={member ? 'M5 62c8-16 38-16 48 0' : 'M4 48c8-14 36-14 44 0'}
            stroke={member ? '#0D2244' : 'white'}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
    <div>
      <h2 className="mb-2 text-heading-4 font-bold">{children}</h2>
      <p className={`max-w-40 text-small-text-b font-light leading-4 ${member ? 'text-slate-600' : 'text-blue-100'}`}>
        {member ? 'Set up or access Digital Banking' : 'Become a member and open an account'}
      </p>
    </div>
    <div className="mt-2 ml-auto flex max-w-max justify-end rounded-full border border-subtle-border bg-subtle-accent/20 p-2">
      <Arrow />
    </div>
  </article>
)

export default AccountCard
