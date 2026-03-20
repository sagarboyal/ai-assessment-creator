import { PlusIcon, ScribbleIcon, SparkleOutlineIcon } from "../icons";

type EmptyAssignmentsStateProps = {
  onCreateAssignment?: () => void;
};

export function EmptyAssignmentsState({
  onCreateAssignment,
}: EmptyAssignmentsStateProps) {
  return (
    <div className="assignment-canvas relative flex-1 min-h-0 overflow-hidden bg-[var(--shell-bg)] px-2.5 pb-24 pt-2 sm:px-3 sm:pb-3">
      <div className="relative flex h-full min-h-0 items-center justify-center overflow-hidden rounded-[20px] bg-[var(--shell-bg)] px-4 py-8 sm:px-6 sm:py-18">
        {/* Scribble — pinned to top-left corner, won't drift inward */}
        <div className="pointer-events-none absolute left-[10%] top-[18%] h-8 w-8 rotate-[-8deg] text-[#0f1f33] opacity-90">
          <ScribbleIcon />
        </div>

        {/* Sparkle — pinned to left side below midpoint */}
        <div className="pointer-events-none absolute left-[12%] top-[62%] h-4.5 w-4.5 text-[#5a7eaa] opacity-85">
          <SparkleOutlineIcon />
        </div>

        {/* Dot — pinned to right side */}
        <div className="pointer-events-none absolute right-[10%] top-[48%] h-2.5 w-2.5 rounded-full bg-[#5579a7] opacity-90" />

        <div className="relative z-10 flex max-w-[355px] flex-col items-center text-center">
          <EmptyStateGraphic />
          <h1 className="mt-3 text-[1.15rem] font-extrabold tracking-[-0.05em] text-[#302c29] sm:mt-4 sm:text-[1.05rem]">
            No assignments yet
          </h1>
          <p className="mt-3 max-w-[312px] text-[13px] leading-[1.5] text-[#8b837b] sm:mt-2 sm:max-w-[332px]">
            Create your first assignment to start collecting and grading student
            submissions. You can set up rubrics, define marking criteria, and
            let AI assist with grading.
          </p>
          <button
            onClick={onCreateAssignment}
            className="mt-7 inline-flex h-[42px] items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-5 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(20,23,31,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 sm:mt-6 sm:h-[34px] sm:text-[12.5px]"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            Create Your First Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
function EmptyStateGraphic() {
  return (
    <div className="relative h-[176px] w-[176px] sm:h-[208px] sm:w-[208px]">
      <div className="absolute inset-[15px] rounded-full bg-[#ece9e4] sm:inset-[18px]" />
      <div className="absolute left-[53px] top-[28px] h-[95px] w-[66px] rounded-[18px] bg-white shadow-[0_18px_40px_rgba(58,46,32,0.1)] sm:left-[62px] sm:top-[34px] sm:h-[112px] sm:w-[78px]" />
      <div className="absolute right-[18px] top-[18px] flex h-[26px] w-[46px] items-center gap-1.5 rounded-[8px] bg-white px-2 shadow-[0_12px_24px_rgba(68,55,36,0.08)] sm:right-[25px] sm:top-[22px] sm:h-[30px] sm:w-[54px]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d9dce2]" />
        <span className="h-2.5 w-5.5 rounded-full bg-[#d1d5dc]" />
      </div>
      <div className="absolute left-[68px] top-[40px] h-[6px] w-[30px] rounded-full bg-[#15283a] sm:left-[79px] sm:top-[48px] sm:h-[7px] sm:w-[36px]" />
      <div className="absolute left-[68px] top-[60px] h-[5px] w-[16px] rounded-full bg-[#d6d3ce] sm:left-[79px] sm:top-[72px] sm:h-[6px] sm:w-[18px]" />
      <div className="absolute left-[68px] top-[74px] h-[5px] w-[28px] rounded-full bg-[#d6d3ce] sm:left-[79px] sm:top-[88px] sm:h-[6px] sm:w-[34px]" />
      <div className="absolute left-[68px] top-[88px] h-[5px] w-[22px] rounded-full bg-[#d6d3ce] sm:left-[79px] sm:top-[104px] sm:h-[6px] sm:w-[26px]" />
      <div className="absolute left-[68px] top-[102px] h-[5px] w-[32px] rounded-full bg-[#d6d3ce] sm:left-[79px] sm:top-[120px] sm:h-[6px] sm:w-[38px]" />

      {/* Magnifying glass circle */}
      <div className="absolute left-[92px] top-[61px] h-[76px] w-[76px] rounded-full border-[6px] border-[#c9bed9] bg-[rgba(255,255,255,0.56)] sm:left-[108px] sm:top-[72px] sm:h-[90px] sm:w-[90px]" />

      {/* Handle */}
      <div className="absolute left-[117px] top-[118px] h-[14px] w-[36px] rotate-[47deg] rounded-full bg-[#d8cfe2] sm:left-[170px] sm:top-[140px] sm:h-[16px] sm:w-[42px]" />

      {/* X icon — centered in circle with proportional arms */}
      <div className="absolute left-[112px] top-[80px] grid h-[40px] w-[40px] place-items-center rounded-full bg-white/72 sm:left-[131px] sm:top-[95px] sm:h-[44px] sm:w-[44px]">
        <span className="relative block h-5 w-5">
          <span className="absolute left-1/2 top-1/2 h-[5px] w-[22px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#ea5547]" />
          <span className="absolute left-1/2 top-1/2 h-[5px] w-[22px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#ea5547]" />
        </span>
      </div>
    </div>
  );
}
