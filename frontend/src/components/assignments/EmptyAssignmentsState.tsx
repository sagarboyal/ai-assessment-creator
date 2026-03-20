import { PlusIcon, ScribbleIcon, SparkleOutlineIcon } from "../icons";

export function EmptyAssignmentsState() {
  return (
    <div className="assignment-canvas relative flex-1 min-h-0 overflow-hidden bg-[#e6e6e6] px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
      <div className="relative flex h-full min-h-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#e6e6e6] px-6 py-18">
        <div className="pointer-events-none absolute top-[30.5%] left-[38.7%] h-8 w-8 rotate-[-8deg] text-[#0f1f33] opacity-90">
          <ScribbleIcon />
        </div>
        <div className="pointer-events-none absolute top-[52%] left-[43.3%] h-4.5 w-4.5 text-[#5a7eaa] opacity-85">
          <SparkleOutlineIcon />
        </div>
        <div className="pointer-events-none absolute top-[45.5%] right-[37%] h-2.5 w-2.5 rounded-full bg-[#5579a7] opacity-90" />

        <div className="relative z-10 flex max-w-[355px] flex-col items-center text-center">
          <EmptyStateGraphic />
          <h1 className="mt-4 text-[1.05rem] font-extrabold tracking-[-0.045em] text-[#302c29]">
            No assignments yet
          </h1>
          <p className="mt-2 max-w-[332px] text-[13px] leading-[1.4] text-[#8b837b]">
            Create your first assignment to start collecting and grading student
            submissions. You can set up rubrics, define marking criteria, and
            let AI assist with grading.
          </p>
          <button className="mt-6 inline-flex h-[34px] items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-5 text-[12.5px] font-semibold text-white shadow-[0_10px_22px_rgba(20,23,31,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5">
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
    <div className="relative h-[208px] w-[208px]">
      <div className="absolute inset-[18px] rounded-full bg-[#ece9e4]" />
      <div className="absolute top-[34px] left-[62px] h-[112px] w-[78px] rounded-[18px] bg-white shadow-[0_18px_40px_rgba(58,46,32,0.1)]" />
      <div className="absolute top-[22px] right-[25px] flex h-[30px] w-[54px] items-center gap-1.5 rounded-[8px] bg-white px-2 shadow-[0_12px_24px_rgba(68,55,36,0.08)]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d9dce2]" />
        <span className="h-2.5 w-5.5 rounded-full bg-[#d1d5dc]" />
      </div>
      <div className="absolute top-[48px] left-[79px] h-[7px] w-[36px] rounded-full bg-[#15283a]" />
      <div className="absolute top-[72px] left-[79px] h-[6px] w-[18px] rounded-full bg-[#d6d3ce]" />
      <div className="absolute top-[88px] left-[79px] h-[6px] w-[34px] rounded-full bg-[#d6d3ce]" />
      <div className="absolute top-[104px] left-[79px] h-[6px] w-[26px] rounded-full bg-[#d6d3ce]" />
      <div className="absolute top-[120px] left-[79px] h-[6px] w-[38px] rounded-full bg-[#d6d3ce]" />
      <div className="absolute top-[66px] left-[100px] h-[90px] w-[90px] rounded-full border-[6px] border-[#c9bed9] bg-[rgba(255,255,255,0.56)] shadow-[0_12px_30px_rgba(112,89,140,0.12)]" />
      <div className="absolute top-[135px] left-[162px] h-[16px] w-[42px] rotate-[47deg] rounded-full bg-[#d8cfe2]" />
      <div className="absolute top-[89px] left-[123px] grid h-[44px] w-[44px] place-items-center rounded-full bg-white/72">
        <span className="relative block h-6 w-6">
          <span className="absolute left-1/2 top-1/2 h-[7px] w-[36px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#ea5547]" />
          <span className="absolute left-1/2 top-1/2 h-[7px] w-[36px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#ea5547]" />
        </span>
      </div>
    </div>
  );
}
