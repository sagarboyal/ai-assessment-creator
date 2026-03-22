import { useEffect } from "react";
import { AssignmentListPage } from "../components/assignments/AssignmentListPage";
import { CreateAssignmentPage } from "../components/assignments/CreateAssignmentPage";
import { AssignmentDetailPage } from "../components/assignments/AssignmentDetailPage";
import { useAssignmentStatusSocket } from "../hooks/useAssignmentStatusSocket";
import {
  AssignmentIcon,
  GridIcon,
  GroupIcon,
  PlusIcon,
  SparkIcon,
} from "../components/icons";
import { Sidebar } from "../components/layout/Sidebar";
import { TopBar } from "../components/layout/TopBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteAssessment,
  fetchQuestionPaperByAssessmentId,
  fetchAssessments,
  openAssignmentDetail,
  selectActiveGenerationAssignmentIds,
  selectAssignmentCards,
  selectAssignmentError,
  selectQuestionPaperError,
  selectQuestionPaperFetchStatus,
  selectSelectedAssignment,
  selectSelectedQuestionPaper,
  selectAssignmentView,
  selectFetchStatus,
  startQuestionGeneration,
  setView,
  updateAssignmentStatus,
} from "../store/slices/assignmentSlice";

export function App() {
  const dispatch = useAppDispatch();
  const assignments = useAppSelector(selectAssignmentCards);
  const activeGenerationAssignmentIds = useAppSelector(
    selectActiveGenerationAssignmentIds,
  );
  const errorMessage = useAppSelector(selectAssignmentError);
  const fetchStatus = useAppSelector(selectFetchStatus);
  const questionPaperError = useAppSelector(selectQuestionPaperError);
  const questionPaperFetchStatus = useAppSelector(selectQuestionPaperFetchStatus);
  const selectedAssignment = useAppSelector(selectSelectedAssignment);
  const selectedQuestionPaper = useAppSelector(selectSelectedQuestionPaper);
  const view = useAppSelector(selectAssignmentView);

  useEffect(() => {
    void dispatch(fetchAssessments());
  }, [dispatch]);

  useEffect(() => {
    if (
      view !== "detail" ||
      !selectedAssignment ||
      selectedQuestionPaper ||
      selectedAssignment.status !== "COMPLETED"
    ) {
      return;
    }

    void dispatch(fetchQuestionPaperByAssessmentId(selectedAssignment.id));
  }, [dispatch, selectedAssignment, selectedQuestionPaper, view]);

  useAssignmentStatusSocket({
    assignmentIds: activeGenerationAssignmentIds,
    onStatusChange: ({ assessmentId, questionPaper, status }) => {
      if (!assessmentId || !status) {
        return;
      }

      dispatch(
        updateAssignmentStatus({
          id: assessmentId,
          questionPaper,
          status,
        }),
      );
    },
  });

  return (
    <main className="h-screen overflow-hidden bg-[var(--shell-bg)] p-2 text-[var(--text-strong)] sm:p-2.5 2xl:px-6 2xl:py-4">
      <div className="assignment-shell relative mx-auto flex h-full max-w-[1720px] overflow-hidden rounded-[18px] bg-[var(--shell-bg)] md:flex-row 2xl:gap-3 2xl:rounded-[26px]">
        <div className="hidden py-2.5 md:flex xl:py-3">
          <Sidebar onCreateAssignment={() => dispatch(setView("create"))} />
        </div>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#e6e6e6]">
          <TopBar
            onBack={
              view !== "list" ? () => dispatch(setView("list")) : undefined
            }
            title={
              view === "create"
                ? "Create Assignment"
                : view === "detail"
                  ? "Question Paper"
                  : "Assignments"
            }
          />
          <div
            className={`min-h-0 flex-1 ${
              view === "list" ? "overflow-hidden" : "overflow-y-auto"
            }`}
          >
            {view === "list" ? (
              <AssignmentListPage
                assignments={assignments}
                errorMessage={errorMessage}
                isLoading={fetchStatus === "loading"}
                onCreateAssignment={() => dispatch(setView("create"))}
                onDeleteAssignment={(id) => void dispatch(deleteAssessment(id))}
                onRetryAssignment={(id) => void dispatch(startQuestionGeneration(id))}
                onViewAssignment={(id) => dispatch(openAssignmentDetail(id))}
              />
            ) : view === "detail" ? (
              <AssignmentDetailPage
                assignment={selectedAssignment}
                errorMessage={questionPaperError}
                isLoading={questionPaperFetchStatus === "loading"}
                onBack={() => dispatch(setView("list"))}
                questionPaper={selectedQuestionPaper}
              />
            ) : (
              <CreateAssignmentPage onBack={() => dispatch(setView("list"))} />
            )}
          </div>
        </section>

        <button
          onClick={() => dispatch(setView("create"))}
          className="absolute bottom-[80px] right-3.5 z-20 grid h-9 w-9 place-items-center rounded-full bg-white text-[#ef8e63] shadow-[0_12px_28px_rgba(0,0,0,0.16)] md:hidden"
        >
          <PlusIcon className="h-4 w-4" />
        </button>

        <nav className="absolute inset-x-1.5 bottom-1.5 z-20 rounded-[16px] border border-[#5a5a5a] bg-[#1f1f1f] px-2 py-2 shadow-[0_18px_36px_rgba(0,0,0,0.28),0_6px_14px_rgba(0,0,0,0.18)] md:hidden md:rounded-[8px] md:px-3 md:py-3">
          <div className="grid grid-cols-4">
            <MobileNavItem icon={GridIcon} label="Home" />
            <MobileNavItem icon={GroupIcon} label="My Groups" active />
            <MobileNavItem icon={AssignmentIcon} label="Library" />
            <MobileNavItem icon={SparkIcon} label="AI Toolkit" />
          </div>
        </nav>
      </div>
    </main>
  );
}

type MobileNavItemProps = {
  active?: boolean;
  icon: typeof GridIcon;
  label: string;
};

function MobileNavItem({
  active = false,
  icon: Icon,
  label,
}: MobileNavItemProps) {
  return (
    <button
      className={`flex flex-col items-center gap-1 py-1 text-[10px] ${
        active ? "text-white" : "text-[#7d7d7d]"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-white" : "text-[#6f6f6f]"}`} />
      <span>{label}</span>
    </button>
  );
}
