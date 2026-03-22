import { useRef, useState } from "react";
import type {
  Assessment,
  QuestionPaper,
  QuestionPaperQuestion,
} from "../../store/slices/assignmentSlice";

type AssignmentDetailPageProps = {
  assignment: Assessment | null;
  errorMessage?: string | null;
  isLoading?: boolean;
  onBack?: () => void;
  questionPaper: QuestionPaper | null;
};

type Html2PdfWorker = {
  from: (element: HTMLElement) => Html2PdfWorker;
  save: () => Promise<void>;
  set: (options: Record<string, unknown>) => Html2PdfWorker;
};

type Html2PdfFactory = () => Html2PdfWorker;

export function AssignmentDetailPage({
  assignment,
  errorMessage = null,
  isLoading = false,
  onBack,
  questionPaper,
}: AssignmentDetailPageProps) {
  const isCompleted = assignment?.status === "COMPLETED" && Boolean(questionPaper);
  const readyQuestionPaper = isCompleted ? questionPaper : null;
  const printableRef = useRef<HTMLElement | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!questionPaper || !printableRef.current) {
      return;
    }

    try {
      setDownloadError(null);
      setIsDownloading(true);

      const html2pdf = (await import("html2pdf.js")).default as Html2PdfFactory;

      await html2pdf()
        .set({
          filename: `${slugify(
            assignment?.title ?? questionPaper.subject,
          )}-question-paper.pdf`,
          html2canvas: {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
          },
          image: { quality: 0.98, type: "jpeg" },
          jsPDF: {
            format: "a4",
            orientation: "portrait",
            unit: "mm",
          },
          margin: [10, 10, 10, 10],
          pagebreak: {
            after: [".pdf-end-page"],
            before: [".pdf-answer-page"],
            mode: ["css", "legacy"],
          },
        })
        .from(printableRef.current)
        .save();
    } catch {
      setDownloadError("Unable to generate the PDF right now. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-[#e8e8e8] px-0 pb-4 pt-2 sm:px-4 sm:pb-6 xl:px-6 2xl:px-8">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="rounded-[22px] bg-[#242424] px-4 py-4 text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)] sm:px-6">
          <p className="max-w-[760px] text-[13px] font-semibold leading-[1.6] text-white sm:text-[14px]">
            Certainly, {extractFirstName(assignment?.title) ?? "Lakshya"}! Here are
            customized Question Paper for your {assignment?.subject ?? "CBSE Grade"}
            {" "}classes on the NCERT chapters:
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {questionPaper ? (
              <button
                onClick={() => void handleDownloadPdf()}
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[12px] font-semibold text-[#1f1f1f]"
              >
                <DownloadIcon />
                {isDownloading ? "Preparing PDF..." : "Download as PDF"}
              </button>
            ) : null}

            <button
              onClick={onBack}
              type="button"
              className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-[12px] font-semibold text-white/88"
            >
              Back
            </button>
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-2xl border border-[#e8beb1] bg-[#fff3ef] px-4 py-3 text-[13px] text-[#9a4c39]">
            {errorMessage}
          </p>
        ) : null}

        {downloadError ? (
          <p className="mt-4 rounded-2xl border border-[#e8beb1] bg-[#fff3ef] px-4 py-3 text-[13px] text-[#9a4c39]">
            {downloadError}
          </p>
        ) : null}

        {isLoading ? (
          <div className="mt-3 h-[640px] animate-pulse rounded-[22px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]" />
        ) : !assignment ? (
          <EmptyState
            title="Assignment not found"
            description="This assignment is no longer available in the current list."
          />
        ) : !isCompleted ? (
          <EmptyState
            title={
              assignment.status === "FAILED"
                ? "Question generation failed"
                : "Question paper is not ready yet"
            }
            description={
              assignment.status === "FAILED"
                ? "The question paper could not be generated. Retry generation from the backend flow before opening this view again."
                : "The assignment is still being processed. This screen will show the paper once generation completes."
            }
          />
        ) : readyQuestionPaper ? (
          <article
            ref={printableRef}
            className="mt-3 rounded-[22px] bg-white px-4 py-5 text-[#222] shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:px-6 sm:py-7 md:px-8"
          >
            <header className="text-center">
              <h1 className="text-[1.75rem] font-extrabold tracking-[-0.04em] text-[#333] sm:text-[2.1rem]">
                {readyQuestionPaper.schoolName}
              </h1>
              <p className="mt-2 text-[1rem] font-bold text-[#444]">
                Subject: {readyQuestionPaper.subject}
              </p>
              <p className="mt-1 text-[1rem] font-bold text-[#444]">
                Class: {readyQuestionPaper.className}
              </p>
            </header>

            <div className="mt-8 flex items-start justify-between gap-4 text-[12px] font-medium text-[#2d2d2d]">
              <span>Time Allowed: {readyQuestionPaper.timeAllowed} minutes</span>
              <span>Maximum Marks: {readyQuestionPaper.totalMarks}</span>
            </div>

            <p className="mt-5 text-[12px] font-medium text-[#2d2d2d]">
              {readyQuestionPaper.generalInstruction}
            </p>

            <div className="mt-6 space-y-1 text-[12px] text-[#2d2d2d]">
              <InfoLine label="Name:" />
              <InfoLine label="Roll Number:" />
              <InfoLine label={`Class: ${readyQuestionPaper.className} Section:`} />
            </div>

            <div className="mt-10 space-y-10">
              {readyQuestionPaper.sections.map((section) => (
                <section key={`${section.title}-${section.questionType}`}>
                  <h2 className="text-center text-[1.45rem] font-bold text-[#333]">
                    {section.title}
                  </h2>

                  <div className="mt-6">
                    <h3 className="text-[14px] font-semibold text-[#2d2d2d]">
                      {formatQuestionType(section.questionType)}
                    </h3>
                    <p className="mt-1 text-[11px] italic text-[#666]">
                      {section.instruction}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {section.questions.map((question) => (
                      <QuestionBlock
                        key={`${section.title}-${question.questionNumber}`}
                        question={question}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="pdf-end-page mt-8 text-[12px] font-semibold text-[#2d2d2d]">
              End of Question Paper
            </div>

            <section className="pdf-answer-page mt-10 [break-before:page]">
              <h2 className="text-[1.2rem] font-bold text-[#333]">Answer Key:</h2>
              <div className="mt-5 space-y-3">
                {readyQuestionPaper.answerKey.map((question) => (
                  <div key={`answer-${question.questionNumber}`} className="text-[12px] text-[#2d2d2d]">
                    <p className="leading-[1.7]">
                      <span className="font-semibold">{question.questionNumber}.</span>{" "}
                      {question.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        ) : null}
      </div>
    </div>
  );
}

function QuestionBlock({ question }: { question: QuestionPaperQuestion }) {
  return (
    <div className="text-[12px] leading-[1.8] text-[#2d2d2d]">
      <p>
        <span className="font-medium">{question.questionNumber}.</span>{" "}
        <span className="text-[#555]">[{toTitleCase(question.difficulty)}]</span>{" "}
        {stripDifficultyTag(question.questionText)} [{question.marks} Marks]
      </p>

      {question.options?.length ? (
        <div className="mt-1 space-y-1 pl-5">
          {question.options.map((option, index) => (
            <p key={`${question.questionNumber}-${option}`}>
              {String.fromCharCode(65 + index)}. {option}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function InfoLine({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2">
      <span>{label}</span>
      <span className="inline-block w-[90px] border-b border-[#555]" />
    </p>
  );
}

function EmptyState({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="mt-3 rounded-[22px] bg-white px-6 py-16 text-center shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <h2 className="text-[1.1rem] font-bold tracking-[-0.04em] text-[#2f2b28]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-[540px] text-[13px] leading-[1.7] text-[#847a70]">
        {description}
      </p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8.5 11.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" strokeLinecap="round" />
    </svg>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatQuestionType(type: string) {
  return toTitleCase(type.replaceAll("_", " "));
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripDifficultyTag(value: string) {
  return value.replace(/^\s*\[[^\]]+\]\s*/u, "");
}

function extractFirstName(value?: string | null) {
  if (!value) {
    return null;
  }

  const parts = value.trim().split(/\s+/u);
  return parts[0] || null;
}
