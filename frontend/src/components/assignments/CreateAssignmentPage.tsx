import { useState, type ChangeEvent, type FormEvent, type HTMLInputTypeAttribute } from "react";
import { ChevronDownIcon, PlusIcon } from "../icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearAssignmentError,
  createAssessment,
  selectAssignmentError,
  selectCreateStatus,
} from "../../store/slices/assignmentSlice";

type CreateAssignmentPageProps = {
  onBack?: () => void;
};

type QuestionTypeOption =
  | "MULTIPLE_CHOICE"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "TRUE_FALSE"
  | "NUMERICAL"
  | "DIAGRAM_GRAPH";

type QuestionTypeRow = {
  id: number;
  marks: number;
  questionCount: number;
  type: QuestionTypeOption;
};

type AssessmentFormState = {
  additionalInstructions: string;
  className: string;
  dueDate: string;
  schoolName: string;
  subject: string;
  timeAllowed: string;
  title: string;
  uploadedFileUrl: string;
};

const questionTypeOptions: Array<{ label: string; value: QuestionTypeOption }> = [
  { label: "Multiple Choice", value: "MULTIPLE_CHOICE" },
  { label: "Short Answer", value: "SHORT_ANSWER" },
  { label: "Long Answer", value: "LONG_ANSWER" },
  { label: "True / False", value: "TRUE_FALSE" },
  { label: "Numerical", value: "NUMERICAL" },
  { label: "Diagram / Graph", value: "DIAGRAM_GRAPH" },
];

const initialFormState: AssessmentFormState = {
  additionalInstructions: "",
  className: "",
  dueDate: "",
  schoolName: "",
  subject: "",
  timeAllowed: "",
  title: "",
  uploadedFileUrl: "",
};

const createQuestionTypeRow = (id: number): QuestionTypeRow => ({
  id,
  marks: 1,
  questionCount: 1,
  type: "MULTIPLE_CHOICE",
});

export function CreateAssignmentPage({ onBack }: CreateAssignmentPageProps) {
  const dispatch = useAppDispatch();
  const createStatus = useAppSelector(selectCreateStatus);
  const assignmentError = useAppSelector(selectAssignmentError);
  const [form, setForm] = useState<AssessmentFormState>(initialFormState);
  const [questionTypes, setQuestionTypes] = useState<QuestionTypeRow[]>([
    createQuestionTypeRow(1),
  ]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const totalQuestions = questionTypes.reduce(
    (sum, row) => sum + row.questionCount,
    0,
  );
  const totalMarks = questionTypes.reduce(
    (sum, row) => sum + row.questionCount * row.marks,
    0,
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleQuestionTypeChange = <K extends keyof QuestionTypeRow>(
    id: number,
    key: K,
    value: QuestionTypeRow[K],
  ) => {
    setQuestionTypes((currentRows) =>
      currentRows.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  const addQuestionType = () => {
    setQuestionTypes((currentRows) => [
      ...currentRows,
      createQuestionTypeRow(Date.now()),
    ]);
  };

  const removeQuestionType = (id: number) => {
    setQuestionTypes((currentRows) =>
      currentRows.length === 1
        ? currentRows
        : currentRows.filter((row) => row.id !== id),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearAssignmentError());
    setSuccessMessage(null);

    if (questionTypes.length === 0) {
      return;
    }

    try {
      const payload = {
        title: form.title.trim(),
        subject: form.subject.trim(),
        className: form.className.trim(),
        schoolName: form.schoolName.trim(),
        timeAllowed: Number(form.timeAllowed),
        dueDate: form.dueDate,
        questionTypes: questionTypes.map((row) => ({
          marks: row.marks,
          questionCount: row.questionCount,
          type: row.type,
        })),
        additionalInstructions: form.additionalInstructions.trim() || null,
        uploadedFileUrl: form.uploadedFileUrl.trim() || null,
      };

      await dispatch(createAssessment(payload)).unwrap();

      setSuccessMessage("Assignment created successfully.");
      setForm(initialFormState);
      setQuestionTypes([createQuestionTypeRow(1)]);
    } catch {
      // Error state is handled in Redux and surfaced below.
    }
  };

  return (
    <div className="bg-[#e6e6e6] px-3 pb-4 pt-2 sm:px-8 sm:pb-6 sm:pt-3 xl:px-5 xl:pt-4 2xl:px-8 2xl:pb-8">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col xl:max-w-[1240px]">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-[26px] bg-[linear-gradient(180deg,#faf8f4_0%,#f7f6f3_100%)] px-4 py-5 shadow-[0_20px_50px_rgba(53,41,28,0.1)] sm:px-6 sm:py-7 md:-mt-2 md:rounded-[30px] md:border md:border-[#ece5dc] md:pt-8 md:shadow-[0_24px_60px_rgba(53,41,28,0.12)] xl:px-8 xl:py-8 xl:pt-9 2xl:px-10"
        >
          <header className="border-b border-[#e6e0d8] pb-5 sm:pb-6">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#93d094]" />
              <h1 className="text-[1.1rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.7rem]">
                Create Assignment
              </h1>
            </div>
            <p className="mt-1 text-[12px] text-[#8d8882] sm:text-[14px]">
              Fields marked with * are mandatory.
            </p>

            <div className="mt-4 grid grid-cols-[1fr_1fr] gap-2 sm:mt-5 sm:gap-3">
              <div className="h-[4px] rounded-full bg-[#6a6764]" />
              <div className="h-[4px] rounded-full bg-[#d9d6d1]" />
            </div>
          </header>

          <div className="pt-5 sm:pt-6">
            <h2 className="text-[1.05rem] font-extrabold tracking-[-0.04em] text-[#35312f] sm:text-[1.55rem]">
              Assignment Details
            </h2>
            <p className="mt-1 text-[12px] text-[#908a84] sm:text-[14px]">
              This form maps to your Spring Boot `AssessmentRequest`.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InputField
              label="Title"
              name="title"
              onChange={handleInputChange}
              required
              value={form.title}
            />
            <InputField
              label="Subject"
              name="subject"
              onChange={handleInputChange}
              required
              value={form.subject}
            />
            <InputField
              label="Class Name"
              name="className"
              onChange={handleInputChange}
              required
              value={form.className}
            />
            <InputField
              label="School Name"
              name="schoolName"
              onChange={handleInputChange}
              required
              value={form.schoolName}
            />
            <InputField
              label="Time Allowed (minutes)"
              min="1"
              name="timeAllowed"
              onChange={handleInputChange}
              required
              type="number"
              value={form.timeAllowed}
            />
            <InputField
              label="Due Date"
              name="dueDate"
              onChange={handleInputChange}
              required
              type="datetime-local"
              value={form.dueDate}
            />
          </div>

          <div className="mt-5 sm:mt-6">
            <label className="mb-2 block text-[13px] font-semibold text-[#3b3734] sm:text-[15px]">
              Uploaded File URL
              <span className="ml-2 text-[11px] font-medium text-[#9b948c]">
                Optional
              </span>
            </label>
            <input
              name="uploadedFileUrl"
              onChange={handleInputChange}
              placeholder="https://example.com/file.pdf"
              type="url"
              value={form.uploadedFileUrl}
              className="h-12 w-full rounded-full border border-[#ddd8d2] bg-[#fbfbf9] px-4 text-[13px] text-[#3b3734] outline-none transition placeholder:text-[#b1aba5] focus:border-[#b49f8c] sm:text-[14px]"
            />
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-3 text-[12px] font-semibold text-[#3b3734] sm:mb-4 sm:text-[15px]">
              <span>Question Type *</span>
              <span className="w-[82px] text-center sm:w-[96px]">
                Questions
              </span>
              <span className="w-[72px] text-center sm:w-[88px]">Marks</span>
              <span className="w-8" />
            </div>

            <div className="space-y-3">
              {questionTypes.map((row) => (
                <QuestionTypeEditor
                  key={row.id}
                  disableRemove={questionTypes.length === 1}
                  row={row}
                  onChange={handleQuestionTypeChange}
                  onRemove={removeQuestionType}
                />
              ))}
            </div>

            <button
              onClick={addQuestionType}
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#33302d] sm:text-[14px]"
            >
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
                Additional Instructions
              <span className="ml-2 text-[11px] font-medium text-[#9b948c]">
                Optional extra prompt
              </span>
            </label>
            <div className="rounded-[18px] border border-dashed border-[#e0dbd5] bg-white px-4 py-4">
              <textarea
                name="additionalInstructions"
                onChange={handleInputChange}
                placeholder="e.g. Generate a question paper for a 3 hour exam with moderate difficulty and step-based marking."
                rows={5}
                value={form.additionalInstructions}
                className="w-full resize-none bg-transparent text-[13px] text-[#3b3734] outline-none placeholder:text-[#a09a94] sm:text-[14px]"
              />
              <div className="mt-3 flex justify-end">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f5f4f1] text-[#47423f]">
                  <MicIcon />
                </span>
              </div>
            </div>
          </div>

          {assignmentError ? (
            <p className="mt-5 rounded-2xl border border-[#e8beb1] bg-[#fff3ef] px-4 py-3 text-[13px] text-[#9a4c39]">
              {assignmentError}
            </p>
          ) : null}

          {successMessage ? (
            <p className="mt-5 rounded-2xl border border-[#cbe7cf] bg-[#eef9f0] px-4 py-3 text-[13px] text-[#31653c]">
              {successMessage}
            </p>
          ) : null}

          <div className="mt-5 flex items-center justify-between px-1 pb-2 sm:mt-6">
            <button
              onClick={onBack}
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-[#3b3734] shadow-[0_12px_30px_rgba(51,43,34,0.08)]"
            >
              <BackArrowIcon />
              Previous
            </button>

            <button
              disabled={createStatus === "loading"}
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#2f3136_0%,#1a1b1d_100%)] px-7 text-[14px] font-medium text-white shadow-[0_12px_30px_rgba(21,22,24,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createStatus === "loading" ? "Saving..." : "Create Assignment"}
              <ForwardArrowIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  min?: string;
  name: keyof AssessmentFormState;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  value: string;
};

function InputField({
  label,
  min,
  name,
  onChange,
  required = false,
  type = "text",
  value,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-[#3b3734] sm:text-[15px]">
        {label}
        {required ? <span className="ml-1 text-[#e06a3f]">*</span> : null}
      </span>
      <input
        className="h-12 w-full rounded-full border border-[#ddd8d2] bg-[#fbfbf9] px-4 text-[13px] text-[#3b3734] outline-none transition placeholder:text-[#b1aba5] focus:border-[#b49f8c] sm:text-[14px]"
        min={min}
        name={name}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

type QuestionTypeEditorProps = {
  disableRemove: boolean;
  onChange: <K extends keyof QuestionTypeRow>(
    id: number,
    key: K,
    value: QuestionTypeRow[K],
  ) => void;
  onRemove: (id: number) => void;
  row: QuestionTypeRow;
};

function QuestionTypeEditor({
  disableRemove,
  onChange,
  onRemove,
  row,
}: QuestionTypeEditorProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-3">
      <div className="relative">
        <select
          value={row.type}
          onChange={(event) =>
            onChange(row.id, "type", event.target.value as QuestionTypeOption)
          }
          className="h-11 w-full appearance-none rounded-full border border-[#ddd8d2] bg-white px-4 pr-10 text-[13px] text-[#3f3a37] outline-none sm:text-[14px]"
        >
          {questionTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#827c76]" />
      </div>

      <CounterPill
        value={row.questionCount}
        onChange={(value) => onChange(row.id, "questionCount", value)}
      />
      <CounterPill
        value={row.marks}
        onChange={(value) => onChange(row.id, "marks", value)}
      />

      <button
        disabled={disableRemove}
        onClick={() => onRemove(row.id)}
        type="button"
        className="text-[18px] text-[#5c5752] disabled:cursor-not-allowed disabled:opacity-30"
      >
        x
      </button>
    </div>
  );
}

function CounterPill({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div className="flex h-11 w-[82px] items-center justify-between rounded-full bg-white px-3 text-[14px] font-semibold text-[#47423f] sm:w-[96px]">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
        className="text-[#8d867f]"
      >
        -
      </button>
      <span>{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        type="button"
        className="text-[#5a554f]"
      >
        +
      </button>
    </div>
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
