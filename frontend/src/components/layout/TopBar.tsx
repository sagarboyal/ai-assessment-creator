import { ArrowLeftIcon, BellIcon, ChevronDownIcon, MenuIcon } from "../icons";

type TopBarProps = {
  onBack?: () => void;
  title?: string;
};

export function TopBar({ onBack, title = "Assignment" }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#e6e6e6] px-2.5 pt-2.5 xl:px-5 xl:pt-4 2xl:px-8 2xl:pt-5">
      <div className="flex items-center rounded-[18px] bg-white px-3 py-3 shadow-[0_10px_24px_rgba(28,21,14,0.08)] md:hidden">
        {onBack ? (
          <>
            <button
              onClick={onBack}
              className="grid h-8 w-8 place-items-center rounded-full text-[var(--text-strong)]"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <div className="ml-2 min-w-0 text-[0.98rem] font-extrabold tracking-[-0.05em] text-[#37322e]">
              {title}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-[8px] bg-[linear-gradient(135deg,#4f4f4f_0%,#242424_100%)] text-sm font-black text-white">
              V
            </div>
            <div className="text-[1.02rem] font-extrabold tracking-[-0.05em] text-[#37322e]">
              VedaAI
            </div>
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <button className="relative grid h-8 w-8 place-items-center rounded-full text-[var(--text-soft)]">
            <BellIcon className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#f07b52]" />
          </button>
          <button className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#f2cc95_0%,#d98f66_100%)] text-[10px] font-bold text-[#593824]">
            JD
          </button>
          <button className="grid h-8 w-8 place-items-center rounded-full text-[var(--text-soft)]">
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hidden mx-auto w-full max-w-[1120px] items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-[0_10px_24px_rgba(28,21,14,0.08)] md:flex xl:max-w-[1240px] xl:px-6 xl:py-3.5">
        <button
          onClick={onBack}
          className="grid h-7 w-7 place-items-center rounded-full text-[var(--text-strong)] transition hover:-translate-y-0.5"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>

        <div className="h-3.5 w-3.5 text-[var(--text-faint)]">
          <AssignmentGlyph />
        </div>

        <div className="min-w-0 text-[13px] font-medium text-[#97918a]">{title}</div>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative grid h-8 w-8 place-items-center rounded-full text-[var(--text-soft)] transition hover:text-[var(--text-strong)]">
            <BellIcon className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#f07b52]" />
          </button>

          <button className="flex items-center gap-2 rounded-full bg-[#fbfaf8] py-1 pl-1 pr-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] transition hover:-translate-y-0.5">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-[linear-gradient(135deg,#f2cc95_0%,#d98f66_100%)] text-[10px] font-bold text-[#593824]">
              JD
            </div>
            <div className="hidden sm:block">
              <div className="text-[12px] font-semibold text-[var(--text-strong)]">
                John Doe
              </div>
            </div>
            <ChevronDownIcon className="h-3.5 w-3.5 text-[var(--text-faint)]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function AssignmentGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-full w-full"
    >
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}
