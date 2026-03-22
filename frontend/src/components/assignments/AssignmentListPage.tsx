import { useState } from "react";
import { PlusIcon } from "../icons";

type AssignmentListPageProps = {
  assignments?: AssignmentCard[];
  errorMessage?: string | null;
  isLoading?: boolean;
  onCreateAssignment?: () => void;
  onDeleteAssignment?: (id: string) => void;
};

export type AssignmentCard = {
  assignedOn: string;
  dueOn: string;
  id: string;
  status: string;
  title: string;
};

export function AssignmentListPage({
  assignments = [],
  errorMessage = null,
  isLoading = false,
  onCreateAssignment,
  onDeleteAssignment,
}: AssignmentListPageProps) {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const hasAssignments = assignments.length > 0;

  return (
    <div className="assignment-canvas relative flex h-full min-h-0 flex-1 overflow-hidden bg-[var(--shell-bg)] px-2.5 pb-2 pt-2 sm:px-3 sm:pb-3 xl:px-5 2xl:px-8 2xl:pb-5">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1240px] flex-col">
        <section className="flex h-full min-h-0 flex-1 flex-col rounded-[20px] bg-white px-4 pb-4 pt-4 shadow-[0_10px_24px_rgba(28,21,14,0.08)] sm:px-5 sm:pb-5 md:rounded-[24px] md:px-6 md:pt-5 xl:px-8 xl:pt-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#ece7df] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-[#93d094]" />
                <h1 className="text-[1.1rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.5rem]">
                  Assignments
                </h1>
              </div>
              <p className="mt-1 text-[12px] text-[#8d8882] sm:text-[14px]">
                View and manage assignments for your classes.
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col pt-5 sm:pt-6">
            {hasAssignments ? (
              <>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-[1.05rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.3rem]">
                      Assignment Library
                    </h2>
                    <p className="mt-1 text-[12px] text-[#908a84] sm:text-[14px]">
                      Browse recent assignments or create a new one.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      className="inline-flex h-10 items-center gap-2 self-start rounded-full bg-[#f3f2ef] px-4 text-[12px] font-medium text-[#4b4744] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5"
                    >
                      <FilterIcon />
                      Filter by
                    </button>

                    <label className="flex h-10 w-full items-center gap-2 rounded-full bg-[#f8f7f4] px-4 text-[#4f4a46] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:w-[300px]">
                      <SearchIcon />
                      <input
                        type="text"
                        placeholder="Search Assignment"
                        className="w-full bg-transparent text-[12px] text-[#4c463f] outline-none placeholder:text-[#a39c94]"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
                  {errorMessage ? (
                    <p className="mb-4 rounded-2xl border border-[#e8beb1] bg-[#fff3ef] px-4 py-3 text-[13px] text-[#9a4c39]">
                      {errorMessage}
                    </p>
                  ) : null}

                  {isLoading ? (
                    <div className="grid gap-3 sm:grid-cols-2 xl:gap-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-[118px] animate-pulse rounded-[18px] bg-[#f1efeb]"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 xl:gap-4">
                      {assignments.map((assignment, index) => (
                        <AssignmentCardItem
                          key={assignment.id}
                          assignment={assignment}
                          isMenuOpen={activeMenuIndex === index}
                          onCloseMenu={() => setActiveMenuIndex(null)}
                          onDelete={() => {
                            setActiveMenuIndex(null);
                            onDeleteAssignment?.(assignment.id);
                          }}
                          onOpenMenu={() =>
                            setActiveMenuIndex((current) =>
                              current === index ? null : index,
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-center pt-1">
                  <button
                    onClick={onCreateAssignment}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-5 text-[12px] font-semibold text-white shadow-[0_10px_22px_rgba(20,23,31,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    Create Assignment
                  </button>
                </div>
              </>
            ) : (
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <div className="flex max-w-[360px] flex-col items-center text-center">
                  <div className="grid h-18 w-18 place-items-center rounded-[24px] bg-[#f3f2ef] text-[#706960] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <AssignmentStackIcon />
                  </div>
                  <h2 className="mt-5 text-[1.05rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.3rem]">
                    No assignments yet
                  </h2>
                  <p className="mt-2 text-[12px] leading-[1.6] text-[#908a84] sm:text-[14px]">
                    Create your first assignment to start sharing assessments with
                    your classes.
                  </p>
                  <button
                    onClick={onCreateAssignment}
                    className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-5 text-[12px] font-semibold text-white shadow-[0_10px_22px_rgba(20,23,31,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    Create Assignment
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function AssignmentCardItem({
  assignment,
  isMenuOpen,
  onCloseMenu,
  onDelete,
  onOpenMenu,
}: {
  assignment: AssignmentCard;
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onDelete: () => void;
  onOpenMenu: () => void;
}) {
  return (
    <article className="rounded-[18px] bg-[#f8f7f4] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[14px] font-extrabold tracking-[-0.045em] text-[#2f2b28] md:text-[15px]">
            {assignment.title}
          </h2>
          <StatusBadge status={assignment.status} />
        </div>
        <div className="relative">
          <button
            onClick={onOpenMenu}
            type="button"
            className="grid h-7 w-7 place-items-center rounded-full text-[#8f877d] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <DotsIcon />
          </button>

          {isMenuOpen ? (
            <>
              <button
                aria-label="Close assignment menu"
                className="fixed inset-0 z-10 cursor-default"
                onClick={onCloseMenu}
                type="button"
              />
              <div className="absolute right-0 top-8 z-20 w-[136px] origin-top-right animate-[menu-pop_0.16s_ease-out] rounded-[14px] border border-[#eee7de] bg-white p-1.5 text-[11px] shadow-[0_16px_34px_rgba(55,45,34,0.14)]">
                <button
                  onClick={onCloseMenu}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[#3d3731] transition hover:bg-[#f6f2ed]"
                >
                  <span>View Assignment</span>
                  <ArrowActionIcon />
                </button>
                <button
                  onClick={onDelete}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[#d15a4e] transition hover:bg-[#fff1ee]"
                >
                  <span>Delete</span>
                  <TrashIcon />
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 text-[10px] font-medium text-[#7b746d] md:text-[11px]">
        <p>
          <span className="font-semibold text-[#37312c]">Assigned on:</span>{" "}
          {assignment.assignedOn}
        </p>
        <p>
          <span className="font-semibold text-[#37312c]">Due :</span>{" "}
          {assignment.dueOn}
        </p>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toUpperCase();
  const styles =
    normalizedStatus === "COMPLETED"
      ? "bg-[#eaf8ee] text-[#246a38]"
      : normalizedStatus === "FAILED"
        ? "bg-[#fff1ee] text-[#c35345]"
        : normalizedStatus === "PROCESSING"
          ? "bg-[#f6efe1] text-[#9c620d]"
          : "bg-[#ece9e3] text-[#6d655c]";
  const label =
    normalizedStatus === "COMPLETED"
      ? "Questions generated"
      : normalizedStatus === "PROCESSING"
        ? "Generating questions"
        : normalizedStatus.charAt(0) + normalizedStatus.slice(1).toLowerCase();

  return (
    <span
      className={`mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.02em] ${styles}`}
    >
      {label}
    </span>
  );
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <path d="M4 6.5h16M7.5 12h9M10 17.5h4" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5 text-[#9a9389]"
    >
      <circle cx="11" cy="11" r="5.5" />
      <path d="m15 15 4 4" strokeLinecap="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  );
}

function ArrowActionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M4.5 7.5h15" strokeLinecap="round" />
      <path d="M9.5 3.8h5l.7 2.2H8.8l.7-2.2Z" />
      <path d="M7.5 7.5 8.2 19a2 2 0 0 0 2 1.9h3.6a2 2 0 0 0 2-1.9l.7-11.5" />
      <path d="M10 11v5M14 11v5" strokeLinecap="round" />
    </svg>
  );
}

function AssignmentStackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7"
    >
      <rect x="5" y="4" width="10" height="13" rx="2" />
      <path d="M9 8h2.5M9 11h4.5M9 14h3.5" strokeLinecap="round" />
      <path d="M15 7h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1" />
    </svg>
  );
}
