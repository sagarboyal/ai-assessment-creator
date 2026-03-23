import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../lib/api";
import type { RootState } from "../store";

export type AssignmentView = "list" | "create" | "edit";
export type AssignmentDetailView = "detail";
export type AssignmentScreenView = AssignmentView | AssignmentDetailView;

export type QuestionTypeOption =
  | "MULTIPLE_CHOICE"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "TRUE_FALSE"
  | "NUMERICAL"
  | "DIAGRAM_GRAPH";

export type QuestionTypeConfig = {
  marksPerQuestion: number;
  numberOfQuestions: number;
  type: QuestionTypeOption;
};

export type CreateAssessmentPayload = {
  additionalInstructions: string | null;
  className: string;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  schoolName: string;
  subject: string;
  timeAllowed: number;
  title: string;
  uploadedFileUrl: string | null;
};

export type Assessment = {
  additionalInstructions: string | null;
  className: string;
  createdAt: string;
  dueDate: string;
  id: string;
  questionTypes: QuestionTypeConfig[];
  schoolName: string;
  status: string;
  subject: string;
  timeAllowed: number;
  title: string;
  uploadedFileUrl: string | null;
};

export type AssessmentFilters = {
  dueDate?: string;
  title?: string;
};

export type UpdateAssessmentPayload = CreateAssessmentPayload & {
  id: string;
};

export type QuestionPaperQuestion = {
  answer: string;
  difficulty: string;
  marks: number;
  options: string[] | null;
  questionNumber: number;
  questionText: string;
  type: string;
};

export type QuestionPaperSection = {
  instruction: string;
  questionType: string;
  questions: QuestionPaperQuestion[];
  title: string;
};

export type QuestionPaper = {
  answerKey: QuestionPaperQuestion[];
  assessmentId: string;
  className: string;
  createdAt: string;
  generalInstruction: string;
  id: string;
  schoolName: string;
  sections: QuestionPaperSection[];
  subject: string;
  timeAllowed: number;
  totalMarks: number;
};

type QuestionGenerationAcceptedResponse = {
  assessmentId: string;
  status: string;
  topic: string;
};

type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

type PagedResponse<T> = {
  content?: T[];
  items?: T[];
};

type AssignmentCard = {
  assignedOn: string;
  dueOn: string;
  id: string;
  status: string;
  title: string;
};

type AssignmentState = {
  createStatus: "failed" | "idle" | "loading" | "succeeded";
  deleteStatus: "failed" | "idle" | "loading" | "succeeded";
  error: string | null;
  fetchStatus: "failed" | "idle" | "loading" | "succeeded";
  items: Assessment[];
  editingAssignmentId: string | null;
  questionPaperError: string | null;
  questionPaperFetchStatus: "failed" | "idle" | "loading" | "succeeded";
  questionPapersByAssignmentId: Record<string, QuestionPaper>;
  selectedAssignmentId: string | null;
  updateStatus: "failed" | "idle" | "loading" | "succeeded";
  view: AssignmentScreenView;
};

const initialState: AssignmentState = {
  createStatus: "idle",
  deleteStatus: "idle",
  editingAssignmentId: null,
  error: null,
  fetchStatus: "idle",
  items: [],
  questionPaperError: null,
  questionPaperFetchStatus: "idle",
  questionPapersByAssignmentId: {},
  selectedAssignmentId: null,
  updateStatus: "idle",
  view: "list",
};

const normalizePagedItems = (data: PagedResponse<Assessment> | Assessment[]) => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.items ?? data.content ?? [];
};

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | { data?: Record<string, string>; message?: string }
      | undefined;

    if (responseData?.data && typeof responseData.data === "object") {
      const fieldErrors = Object.values(responseData.data).filter(
        (value): value is string => typeof value === "string" && value.length > 0,
      );

      if (fieldErrors.length > 0) {
        return fieldErrors.join(", ");
      }
    }

    if (typeof responseData?.message === "string" && responseData.message.length > 0) {
      return responseData.message;
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Something went wrong.";
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const fetchAssessments = createAsyncThunk<
  Assessment[],
  AssessmentFilters | void,
  { rejectValue: string }
>("assignment/fetchAssessments", async (filters, { rejectWithValue }) => {
  try {
    const response = await api.get<ApiResponse<PagedResponse<Assessment> | Assessment[]>>(
      "/assessments",
      {
        params: {
          ...(filters?.title ? { title: filters.title } : {}),
          ...(filters?.dueDate ? { dueDate: filters.dueDate } : {}),
        },
      },
    );

    return normalizePagedItems(response.data.data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createAssessment = createAsyncThunk<
  Assessment,
  CreateAssessmentPayload,
  { rejectValue: string }
>("assignment/createAssessment", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<ApiResponse<Assessment>>("/assessments", payload);

    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const startQuestionGeneration = createAsyncThunk<
  QuestionGenerationAcceptedResponse,
  string,
  { rejectValue: string }
>("assignment/startQuestionGeneration", async (assessmentId, { rejectWithValue }) => {
  try {
    const response = await api.post<ApiResponse<QuestionGenerationAcceptedResponse>>(
      `/questions/${assessmentId}/generate`,
    );

    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteAssessment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("assignment/deleteAssessment", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/assessments/${id}`);

    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateAssessment = createAsyncThunk<
  Assessment,
  UpdateAssessmentPayload,
  { rejectValue: string }
>("assignment/updateAssessment", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.put<ApiResponse<Assessment>>("/assessments", payload);

    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchQuestionPaperByAssessmentId = createAsyncThunk<
  QuestionPaper,
  string,
  { rejectValue: string }
>(
  "assignment/fetchQuestionPaperByAssessmentId",
  async (assessmentId, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<QuestionPaper>>(
        `/questions/assessment/${assessmentId}`,
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    clearAssignmentError: (state) => {
      state.error = null;
    },
    clearQuestionPaperError: (state) => {
      state.questionPaperError = null;
    },
    openAssignmentDetail: (state, action: PayloadAction<string>) => {
      const selectedAssignment = state.items.find(
        (assessment) => assessment.id === action.payload,
      );
      const cachedQuestionPaper = state.questionPapersByAssignmentId[action.payload];

      state.selectedAssignmentId = action.payload;
      state.questionPaperError = null;
      state.questionPaperFetchStatus =
        selectedAssignment?.status === "COMPLETED" && !cachedQuestionPaper
          ? "loading"
          : cachedQuestionPaper
            ? "succeeded"
            : "idle";
      state.view = "detail";
    },
    openAssignmentEdit: (state, action: PayloadAction<string>) => {
      state.editingAssignmentId = action.payload;
      state.error = null;
      state.view = "edit";
    },
    updateAssignmentStatus: (
      state,
      action: PayloadAction<{
        id: string;
        questionPaper?: QuestionPaper;
        status: string;
      }>,
    ) => {
      const item = state.items.find(
        (assessment) => assessment.id === action.payload.id,
      );

      if (item) {
        item.status = action.payload.status;
      }

      if (action.payload.questionPaper) {
        state.questionPapersByAssignmentId[action.payload.id] =
          action.payload.questionPaper;
        state.questionPaperFetchStatus = "succeeded";
        state.questionPaperError = null;
      }
    },
    setView: (state, action: PayloadAction<AssignmentScreenView>) => {
      state.view = action.payload;

      if (action.payload !== "detail") {
        state.selectedAssignmentId = null;
        state.questionPaperError = null;
        state.questionPaperFetchStatus = "idle";
      }

      if (action.payload !== "edit") {
        state.editingAssignmentId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessments.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload ?? "Failed to load assignments.";
      })
      .addCase(createAssessment.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload);
        state.view = "list";
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload ?? "Failed to create assignment.";
      })
      .addCase(updateAssessment.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateAssessment.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
        delete state.questionPapersByAssignmentId[action.payload.id];
        state.editingAssignmentId = null;
        state.view = "list";
      })
      .addCase(updateAssessment.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload ?? "Failed to update assignment.";
      })
      .addCase(startQuestionGeneration.pending, (state, action) => {
        state.error = null;

        const item = state.items.find(
          (assessment) => assessment.id === action.meta.arg,
        );

        if (item) {
          item.status = "PROCESSING";
        }
      })
      .addCase(startQuestionGeneration.fulfilled, (state, action) => {
        const item = state.items.find(
          (assessment) => assessment.id === action.payload.assessmentId,
        );

        if (item) {
          item.status = action.payload.status;
        }
      })
      .addCase(startQuestionGeneration.rejected, (state, action) => {
        const item = state.items.find(
          (assessment) => assessment.id === action.meta.arg,
        );

        if (item) {
          item.status = "FAILED";
        }

        state.error =
          action.payload ?? "Failed to start question paper generation.";
      })
      .addCase(fetchQuestionPaperByAssessmentId.pending, (state) => {
        state.questionPaperFetchStatus = "loading";
        state.questionPaperError = null;
      })
      .addCase(fetchQuestionPaperByAssessmentId.fulfilled, (state, action) => {
        state.questionPaperFetchStatus = "succeeded";
        state.questionPapersByAssignmentId[action.payload.assessmentId] =
          action.payload;
      })
      .addCase(fetchQuestionPaperByAssessmentId.rejected, (state, action) => {
        state.questionPaperFetchStatus = "failed";
        state.questionPaperError =
          action.payload ?? "Failed to load question paper.";
      })
      .addCase(deleteAssessment.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
        delete state.questionPapersByAssignmentId[action.payload];

        if (state.selectedAssignmentId === action.payload) {
          state.selectedAssignmentId = null;
          state.view = "list";
        }
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload ?? "Failed to delete assignment.";
      });
  },
});

export const {
  clearAssignmentError,
  clearQuestionPaperError,
  openAssignmentDetail,
  openAssignmentEdit,
  setView,
  updateAssignmentStatus,
} = assignmentSlice.actions;

export const assignmentReducer = assignmentSlice.reducer;

export const selectAssignments = (state: RootState) => state.assignment.items;
export const selectAssignmentError = (state: RootState) => state.assignment.error;
export const selectAssignmentView = (state: RootState) => state.assignment.view;
export const selectCreateStatus = (state: RootState) => state.assignment.createStatus;
export const selectDeleteStatus = (state: RootState) => state.assignment.deleteStatus;
export const selectFetchStatus = (state: RootState) => state.assignment.fetchStatus;
export const selectUpdateStatus = (state: RootState) => state.assignment.updateStatus;
export const selectEditingAssignmentId = (state: RootState) =>
  state.assignment.editingAssignmentId;
export const selectQuestionPaperError = (state: RootState) =>
  state.assignment.questionPaperError;
export const selectQuestionPaperFetchStatus = (state: RootState) =>
  state.assignment.questionPaperFetchStatus;
export const selectSelectedAssignmentId = (state: RootState) =>
  state.assignment.selectedAssignmentId;
export const selectQuestionPapersByAssignmentId = (state: RootState) =>
  state.assignment.questionPapersByAssignmentId;
export const selectSelectedAssignment = createSelector(
  [selectAssignments, selectSelectedAssignmentId],
  (items, selectedAssignmentId) =>
    items.find((item) => item.id === selectedAssignmentId) ?? null,
);
export const selectEditingAssignment = createSelector(
  [selectAssignments, selectEditingAssignmentId],
  (items, editingAssignmentId) =>
    items.find((item) => item.id === editingAssignmentId) ?? null,
);
export const selectSelectedQuestionPaper = createSelector(
  [selectQuestionPapersByAssignmentId, selectSelectedAssignmentId],
  (papers, selectedAssignmentId) =>
    selectedAssignmentId ? papers[selectedAssignmentId] ?? null : null,
);
export const selectActiveGenerationAssignmentIds = createSelector(
  [selectAssignments],
  (items) =>
    items
      .filter((item) => item.status === "PROCESSING")
      .map((item) => item.id),
);

export const selectAssignmentCards = createSelector([selectAssignments], (items) =>
  items.map<AssignmentCard>((item) => ({
    assignedOn: formatDate(item.createdAt),
    dueOn: formatDate(item.dueDate),
    id: item.id,
    status: item.status,
    title: item.title,
  })),
);

