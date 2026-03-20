import { navigationItems } from "../../data/navigation";
import { GearIcon, SparkIcon } from "../icons";

export function Sidebar() {
  return (
    <aside className="hidden w-60 flex-col self-stretch rounded-[20px] bg-white p-4 md:flex">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-[linear-gradient(135deg,#e4b15d_0%,#8a3b1f_100%)] text-base font-black text-white shadow-[0_8px_16px_rgba(130,54,30,0.2)]">
          V
        </div>
        <div className="text-[1.08rem] font-extrabold tracking-[-0.05em] text-[#37322e]">
          VedaAI
        </div>
      </div>

      <button className="mt-9 inline-flex h-9 items-center justify-center gap-2 rounded-full border-2 border-[#de8f6b] bg-[linear-gradient(180deg,#35373b_0%,#1b1d20_100%)] px-4 text-[13px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_20px_rgba(17,18,21,0.2)] transition hover:-translate-y-0.5">
        <SparkIcon className="h-3.5 w-3.5" />
        Create Assignment
      </button>

      <nav className="mt-10 space-y-1.5">
        {navigationItems.map(({ label, active, icon: Icon }) => (
          <button
            key={label}
            className={`flex h-7.5 w-full items-center gap-2.5 rounded-lg px-3 text-left text-[13px] transition ${
              active
                ? "bg-[#ecebea] font-semibold text-[var(--text-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]"
                : "text-[#8d8780] hover:bg-white/70 hover:text-[var(--text-strong)]"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4 pt-8">
        <button className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#8d8780] transition hover:text-[var(--text-strong)]">
          <GearIcon className="h-3.5 w-3.5" />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-2.5 rounded-2xl bg-[#f3f3f3] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#f8d39b_0%,#dca16e_100%)] text-xs font-bold text-[#4a2f1f]">
            JD
          </div>
          <div className="min-w-0">
            <div className="truncate text-[12px] font-semibold text-[var(--text-strong)]">
              Delhi Public School
            </div>
            <div className="truncate text-[11px] text-[var(--text-soft)]">
              Bokaro Steel City
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
