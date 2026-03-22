import { useEffect, useMemo, useState } from "react";
import { PlusIcon } from "../icons";

type AssignmentListPageProps = {
  assignments?: AssignmentCard[];
  dueDateFilter?: string;
  errorMessage?: string | null;
  onDueDateFilterChange?: (value: string) => void;
  isLoading?: boolean;
  onCreateAssignment?: () => void;
  onDeleteAssignment?: (id: string) => void;
  onEditAssignment?: (id: string) => void;
  onRetryAssignment?: (id: string) => void;
  onTitleFilterChange?: (value: string) => void;
  onViewAssignment?: (id: string) => void;
  titleFilter?: string;
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
  dueDateFilter = "",
  errorMessage = null,
  onDueDateFilterChange,
  isLoading = false,
  onCreateAssignment,
  onDeleteAssignment,
  onEditAssignment,
  onRetryAssignment,
  onTitleFilterChange,
  onViewAssignment,
  titleFilter = "",
}: AssignmentListPageProps) {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [pendingPreviewAssignmentId, setPendingPreviewAssignmentId] = useState<
    string | null
  >(null);
  const hasAssignments = assignments.length > 0;
  const hasActiveFilters = titleFilter.trim().length > 0 || dueDateFilter.length > 0;
  const pendingPreviewAssignment = useMemo(
    () =>
      assignments.find((assignment) => assignment.id === pendingPreviewAssignmentId) ??
      null,
    [assignments, pendingPreviewAssignmentId],
  );

  useEffect(() => {
    if (!pendingPreviewAssignment) {
      return;
    }

    if (pendingPreviewAssignment.status.toUpperCase() === "COMPLETED") {
      const timeoutId = window.setTimeout(() => {
        onViewAssignment?.(pendingPreviewAssignment.id);
        setPendingPreviewAssignmentId(null);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [onViewAssignment, pendingPreviewAssignment]);

  const handleAttemptOpenAssignment = (assignment: AssignmentCard) => {
    const status = assignment.status.toUpperCase();

    if (status === "COMPLETED") {
      onViewAssignment?.(assignment.id);
      return;
    }

    setPendingPreviewAssignmentId(assignment.id);
  };

  return (
    <div className="assignment-canvas relative flex h-full min-h-0 flex-1 overflow-hidden bg-[var(--shell-bg)] px-2.5 pb-2 pt-2 sm:px-3 sm:pb-3 xl:px-5 2xl:px-8 2xl:pb-5">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1240px] flex-col">
        <section className="relative flex h-full min-h-0 flex-1 flex-col rounded-[20px] bg-white px-4 pb-4 pt-4 shadow-[0_10px_24px_rgba(28,21,14,0.08)] sm:px-5 sm:pb-5 md:rounded-[24px] md:px-6 md:pt-5 xl:px-8 xl:pt-6">
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
                      onClick={() => setIsFilterPanelOpen((current) => !current)}
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
                        value={titleFilter}
                        onChange={(event) => onTitleFilterChange?.(event.target.value)}
                        className="w-full bg-transparent text-[12px] text-[#4c463f] outline-none placeholder:text-[#a39c94]"
                      />
                    </label>
                  </div>
                </div>

                {isFilterPanelOpen ? (
                  <div className="mt-4 flex flex-col gap-3 rounded-[18px] border border-[#ece7df] bg-[#fbfaf7] px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
                    <label className="block sm:min-w-[220px]">
                      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b837a]">
                        Due Date
                      </span>
                      <input
                        type="date"
                        value={dueDateFilter}
                        onChange={(event) =>
                          onDueDateFilterChange?.(event.target.value)
                        }
                        className="h-11 w-full rounded-full border border-[#ddd8d2] bg-white px-4 text-[12px] text-[#3f3a37] outline-none"
                      />
                    </label>

                    <button
                      onClick={() => {
                        onDueDateFilterChange?.("");
                        onTitleFilterChange?.("");
                        setIsFilterPanelOpen(false);
                      }}
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-[#f1eee8] px-4 text-[12px] font-semibold text-[#4a433d]"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : null}

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
                          onEdit={() => {
                            setActiveMenuIndex(null);
                            onEditAssignment?.(assignment.id);
                          }}
                          onRetry={() => onRetryAssignment?.(assignment.id)}
                          onView={() => {
                            setActiveMenuIndex(null);
                            handleAttemptOpenAssignment(assignment);
                          }}
                          onPreview={() => handleAttemptOpenAssignment(assignment)}
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
                <div className="w-full max-w-[420px] px-6 py-6 text-center sm:px-8">
                  <div className="mx-auto flex h-[180px] w-full max-w-[260px] items-center justify-center">
                    <NoAssignmentsIllustration />
                  </div>

                  <div className="mx-auto mt-6 max-w-[360px]">
                    <span className="inline-flex rounded-full border border-[#e8e2d8] bg-[rgba(255,255,255,0.72)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a8178]">
                      Assignment library
                    </span>
                  </div>

                  <h2 className="mt-4 text-[1.2rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.5rem]">
                    {hasActiveFilters ? "No matching assignments" : "No assignments yet"}
                  </h2>
                  <p className="mx-auto mt-3 max-w-[360px] text-[12px] leading-[1.7] text-[#8c8379] sm:text-[14px]">
                    {hasActiveFilters
                      ? "Try a different title or clear the date filter to see more assignments."
                      : "Create your first assignment to start sharing assessments with your classes."}
                  </p>
                  {hasActiveFilters ? (
                    <button
                      onClick={() => {
                        onDueDateFilterChange?.("");
                        onTitleFilterChange?.("");
                      }}
                      className="mt-7 inline-flex h-11 items-center justify-center rounded-full border border-[#e6e0d6] bg-white px-5 text-[12px] font-semibold text-[#433d37] shadow-[0_8px_18px_rgba(20,23,31,0.06)] transition hover:-translate-y-0.5"
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <button
                      onClick={onCreateAssignment}
                      className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-5 text-[12px] font-semibold text-white shadow-[0_10px_22px_rgba(20,23,31,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                      Create Assignment
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {pendingPreviewAssignment ? (
            <GenerationStatusModal
              assignment={pendingPreviewAssignment}
              onClose={() => setPendingPreviewAssignmentId(null)}
              onRetry={() => onRetryAssignment?.(pendingPreviewAssignment.id)}
            />
          ) : null}

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
  onEdit,
  onOpenMenu,
  onPreview,
  onRetry,
  onView,
}: {
  assignment: AssignmentCard;
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onOpenMenu: () => void;
  onPreview: () => void;
  onRetry: () => void;
  onView: () => void;
}) {
  return (
    <article
      onClick={onPreview}
      className="cursor-pointer rounded-[18px] bg-[#f8f7f4] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] transition hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[14px] font-extrabold tracking-[-0.045em] text-[#2f2b28] md:text-[15px]">
            {assignment.title}
          </h2>
          <StatusBadge status={assignment.status} />
        </div>
        <div className="relative">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onOpenMenu();
            }}
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
                onClick={(event) => {
                  event.stopPropagation();
                  onCloseMenu();
                }}
                type="button"
              />
              <div className="absolute right-0 top-8 z-20 w-[136px] origin-top-right animate-[menu-pop_0.16s_ease-out] rounded-[14px] border border-[#eee7de] bg-white p-1.5 text-[11px] shadow-[0_16px_34px_rgba(55,45,34,0.14)]">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onView();
                  }}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[#3d3731] transition hover:bg-[#f6f2ed]"
                >
                  <span>View Assignment</span>
                  <ArrowActionIcon />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit();
                  }}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[#3d3731] transition hover:bg-[#f6f2ed]"
                >
                  <span>Edit</span>
                  <EditIcon />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete();
                  }}
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

      {assignment.status.toUpperCase() === "FAILED" ? (
        <div className="mt-4 flex justify-end">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onRetry();
            }}
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#2f3136] px-4 text-[11px] font-semibold text-white shadow-[0_10px_18px_rgba(20,23,31,0.14)] transition hover:-translate-y-0.5"
          >
            <RetryIcon />
            Retry Generation
          </button>
        </div>
      ) : null}
    </article>
  );
}

function GenerationStatusModal({
  assignment,
  onClose,
  onRetry,
}: {
  assignment: AssignmentCard;
  onClose: () => void;
  onRetry: () => void;
}) {
  const normalizedStatus = assignment.status.toUpperCase();
  const isFailed = normalizedStatus === "FAILED";

  return (
    <div className="absolute inset-0 z-30 overflow-hidden rounded-[24px]">
      <div className="absolute inset-0 rounded-[24px] bg-[rgba(24,22,19,0.18)] backdrop-blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,238,0.16)_0%,rgba(255,248,238,0.05)_40%,rgba(255,248,238,0)_72%)]" />
      <div className="relative flex h-full items-center justify-center px-4">
        <div className="w-full max-w-[420px] rounded-[28px] border border-[#ebe4db] bg-[linear-gradient(180deg,#fffdfa_0%,#f7f4ef_100%)] px-6 py-6 text-center shadow-[0_28px_70px_rgba(17,17,17,0.24)]">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f4f1eb] text-[#2d2d2d]">
            {isFailed ? <FailedIcon /> : <LoadingIcon />}
          </div>
          <h3 className="mt-5 text-[1.15rem] font-extrabold tracking-[-0.04em] text-[#2d2a27]">
            {isFailed ? "Generation failed" : "Generating PDF preview"}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#7d756c]">
            {isFailed
              ? "The question paper is not ready yet because generation failed. Retry to continue."
              : "The question paper is still being prepared. This preview will open automatically once generation completes."}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex h-10 items-center rounded-full bg-[#f4f1eb] px-5 text-[12px] font-semibold text-[#3d3833]"
            >
              Close
            </button>
            {isFailed ? (
              <button
                onClick={onRetry}
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#2f3136] px-5 text-[12px] font-semibold text-white"
              >
                <RetryIcon />
                Retry
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
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

function RetryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        d="M20 11a8 8 0 1 1-2.34-5.66"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 4v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        d="M4 20h4l9.5-9.5a2.1 2.1 0 0 0-4-4L4 16v4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m12.5 7.5 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7 animate-spin"
    >
      <path
        d="M21 12a9 9 0 1 1-2.64-6.36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FailedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" strokeLinecap="round" />
    </svg>
  );
}

function NoAssignmentsIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="empty-assignments-glow" cx="0" cy="0" r="1" gradientTransform="translate(114 86) rotate(90) scale(84 88)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEFDFC" />
          <stop offset="0.62" stopColor="#F4F1EB" />
          <stop offset="1" stopColor="#EEE7DE" />
        </radialGradient>
        <linearGradient id="empty-assignments-card" x1="86" y1="22" x2="86" y2="123" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F7F3ED" />
        </linearGradient>
        <linearGradient id="empty-assignments-glass" x1="116" y1="65" x2="177" y2="126" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8D2C6" />
          <stop offset="1" stopColor="#BDB4A4" />
        </linearGradient>
      </defs>

      <circle cx="115" cy="89" r="80" fill="url(#empty-assignments-glow)" />

      <path
        d="M7 78C27 69 36 53 46 39C53 28 62 19 77 14"
        stroke="#7C7368"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M30 47C22 38 18 30 22 24C26 18 36 18 43 23C52 29 51 40 42 47C31 56 17 56 7 54"
        stroke="#7C7368"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect x="69" y="25" width="66" height="94" rx="16" fill="url(#empty-assignments-card)" />
      <rect x="69" y="25" width="66" height="94" rx="16" stroke="#E7E0D8" />
      <rect x="77" y="38" width="34" height="8" rx="4" fill="#35312F" />
      <rect x="77" y="57" width="48" height="7" rx="3.5" fill="#DDD7D0" />
      <rect x="77" y="71" width="40" height="7" rx="3.5" fill="#DDD7D0" />
      <rect x="77" y="85" width="28" height="7" rx="3.5" fill="#DDD7D0" />

      <rect x="135" y="20" width="48" height="28" rx="8" fill="#FCFBF8" stroke="#E6E0D7" />
      <circle cx="149" cy="34" r="5" fill="#93D094" />
      <rect x="158" y="30.5" width="15" height="7" rx="3.5" fill="#D9D4CC" />

      <circle cx="143" cy="96" r="38" fill="#FFFFFF" fillOpacity="0.38" />
      <circle cx="143" cy="96" r="37" stroke="url(#empty-assignments-glass)" strokeWidth="6" />
      <path d="M160 115L181 136" stroke="#CFC7BA" strokeWidth="8" strokeLinecap="round" />
      <path d="M132 85L154 107" stroke="#E35B50" strokeWidth="8" strokeLinecap="round" />
      <path d="M154 85L132 107" stroke="#E35B50" strokeWidth="8" strokeLinecap="round" />

      <circle cx="177" cy="121" r="4" fill="#CFC7BA" />
      <circle cx="177" cy="121" r="2" fill="#B9AF9E" />

      <path
        d="M48 132L50.6 139.4L58 142L50.6 144.6L48 152L45.4 144.6L38 142L45.4 139.4L48 132Z"
        stroke="#8E8378"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="188" cy="133" r="4" fill="#93D094" />
    </svg>
  );
}
