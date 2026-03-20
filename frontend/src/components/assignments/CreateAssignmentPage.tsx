import { ChevronDownIcon, PlusIcon } from "../icons";

type CreateAssignmentPageProps = {
  onBack?: () => void;
};

const questionRows = [
  { label: "Multiple Choice Questions", count: 4, marks: 1 },
  { label: "Short Questions", count: 3, marks: 2 },
  { label: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
  { label: "Numerical Problems", count: 5, marks: 5 },
];

export function CreateAssignmentPage({ onBack }: CreateAssignmentPageProps) {
  const totalQuestions = questionRows.reduce((sum, row) => sum + row.count, 0);
  const totalMarks = questionRows.reduce(
    (sum, row) => sum + row.count * row.marks,
    0
  );

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[#e6e6e6] px-3 pb-4 pt-3 sm:px-8 sm:pb-6 sm:pt-5">
      <div className="mx-auto flex max-w-[980px] flex-col">
        <header className="mb-4 sm:mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#93d094]" />
              <h1 className="text-[1.1rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.7rem]">
                Create Assignment
              </h1>
            </div>
            <p className="mt-1 text-[12px] text-[#8d8882] sm:text-[14px]">
              Set up a new assignment for your students
            </p>
          </div>
        </header>

        <div className="mb-5 grid grid-cols-[1fr_1fr] gap-2 sm:mb-6 sm:gap-3">
          <div className="h-[4px] rounded-full bg-[#6a6764]" />
          <div className="h-[4px] rounded-full bg-[#d9d6d1]" />
        </div>

        <section className="rounded-[26px] bg-[#f7f6f3] px-4 py-5 shadow-[0_20px_50px_rgba(53,41,28,0.1)] sm:px-6 sm:py-7">
          <div>
            <h2 className="text-[1.05rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.55rem]">
              Assignment Details
            </h2>
            <p className="mt-1 text-[12px] text-[#908a84] sm:text-[14px]">
              Basic information about your assignment
            </p>
          </div>

          <div className="mt-5 rounded-[20px] border border-dashed border-[#d6d1cb] bg-white px-4 py-8 text-center sm:mt-6 sm:px-6 sm:py-10">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full text-[#2f2b28]">
              <UploadCloudIcon />
            </div>
            <p className="text-[14px] font-medium text-[#3c3734] sm:text-[16px]">
              Choose a file or drag & drop it here
            </p>
            <p className="mt-1 text-[11px] text-[#a09a94] sm:text-[12px]">
              JPEG, PNG, upto 10MB
            </p>
            <button className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#f3f2ef] px-6 text-[13px] font-medium text-[#4b4744]">
              Browse Files
            </button>
          </div>

          <p className="mt-3 text-center text-[12px] text-[#938d87] sm:mt-4 sm:text-[14px]">
            Upload images of your preferred document/image
          </p>

          <div className="mt-5 sm:mt-6">
            <label className="mb-2 block text-[13px] font-semibold text-[#3b3734] sm:text-[15px]">
              Due Date
            </label>
            <div className="flex h-12 items-center justify-between rounded-full border border-[#ddd8d2] bg-[#fbfbf9] px-4 text-[13px] text-[#b1aba5] sm:text-[14px]">
              <span>Choose a chapter</span>
              <CalendarPlusIcon />
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="mb-3 grid grid-cols-[1fr_auto_auto] items-center gap-3 text-[12px] font-semibold text-[#3b3734] sm:mb-4 sm:text-[15px]">
              <span>Question Type</span>
              <span className="w-[72px] text-center sm:w-[88px]">
                No. of Questions
              </span>
              <span className="w-[72px] text-center sm:w-[88px]">Marks</span>
            </div>

            <div className="space-y-3">
              {questionRows.map((row) => (
                <QuestionTypeRow key={row.label} {...row} />
              ))}
            </div>

            <button className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#33302d] sm:text-[14px]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2d2b29] text-white">
                <PlusIcon className="h-3.5 w-3.5" />
              </span>
              Add Question Type
            </button>
          </div>

          <div className="mt-6 text-right text-[13px] text-[#35312f] sm:mt-8 sm:text-[15px]">
            <div>Total Questions : {totalQuestions}</div>
            <div className="mt-1">Total Marks : {totalMarks}</div>
          </div>

          <div className="mt-6 sm:mt-8">
            <label className="mb-2 block text-[13px] font-semibold text-[#3b3734] sm:text-[15px]">
              Additional Information (For better output)
            </label>
            <div className="flex min-h-[104px] items-start justify-between rounded-[18px] border border-dashed border-[#e0dbd5] bg-white px-4 py-4 text-[12px] text-[#a09a94] sm:text-[13px]">
              <span>
                e.g Generate a question paper for 3 hour exam duration...
              </span>
              <span className="mt-auto grid h-8 w-8 place-items-center rounded-full bg-[#f5f4f1] text-[#47423f]">
                <MicIcon />
              </span>
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center justify-between px-1 pb-2 sm:mt-6">
          <button
            onClick={onBack}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-[#3b3734] shadow-[0_12px_30px_rgba(51,43,34,0.08)]"
          >
            <BackArrowIcon />
            Previous
          </button>

          <button className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-7 text-[14px] font-medium text-white shadow-[0_12px_30px_rgba(21,22,24,0.18)]">
            Next
            <ForwardArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

type QuestionTypeRowProps = {
  count: number;
  label: string;
  marks: number;
};

function QuestionTypeRow({ count, label, marks }: QuestionTypeRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
      <div className="flex items-center gap-3">
        <button className="flex h-11 min-w-0 flex-1 items-center justify-between rounded-full bg-white px-4 text-left text-[13px] text-[#3f3a37] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:text-[14px]">
          <span className="truncate">{label}</span>
          <ChevronDownIcon className="h-4 w-4 flex-none text-[#827c76]" />
        </button>
        <button className="text-[18px] text-[#5c5752]">x</button>
      </div>

      <CounterPill value={count} />
      <CounterPill value={marks} />
    </div>
  );
}

function CounterPill({ value }: { value: number }) {
  return (
    <div className="flex h-11 w-[72px] items-center justify-between rounded-full bg-white px-3 text-[14px] font-semibold text-[#47423f] sm:w-[88px]">
      <button className="text-[#d2cec9]">-</button>
      <span>{value}</span>
      <button className="text-[#d2cec9]">+</button>
    </div>
  );
}

function UploadCloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M8.5 18.5h6.8a3.7 3.7 0 0 0 .7-7.3 4.8 4.8 0 0 0-9.4 1.1A3.3 3.3 0 0 0 8.5 18.5Z" />
      <path d="M12 8.5v7" />
      <path
        d="m9.5 11 2.5-2.5 2.5 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarPlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4.5 w-4.5 text-[#4f4a46]"
    >
      <rect x="4.5" y="5.5" width="15" height="14" rx="3" />
      <path d="M8 3.8v3.4M16 3.8v3.4M4.5 9.5h15" />
      <path d="M12 12v4M10 14h4" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path
        d="M7.5 11.5a4.5 4.5 0 0 0 9 0M12 16v3M9.5 19h5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m14.5 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ForwardArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m9.5 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
