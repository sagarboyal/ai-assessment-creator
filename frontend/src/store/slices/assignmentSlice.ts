import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../lib/api";
import type { RootState } from "../store";

export type AssignmentView = "list" | "create";

export type QuestionTypeOption =
  | "MULTIPLE_CHOICE"
  | "SHORT_ANSWER"
  | "LONG_ANSWER"
  | "TRUE_FALSE"
  | "NUMERICAL"
  | "DIAGRAM_GRAPH";

export type QuestionTypeConfig = {
  marks: number;
  questionCount: number;
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
  title: string;
};

type AssignmentState = {
  createStatus: "failed" | "idle" | "loading" | "succeeded";
  deleteStatus: "failed" | "idle" | "loading" | "succeeded";
  error: string | null;
  fetchStatus: "failed" | "idle" | "loading" | "succeeded";
  items: Assessment[];
  view: AssignmentView;
};

const initialState: AssignmentState = {
  createStatus: "idle",
  deleteStatus: "idle",
  error: null,
  fetchStatus: "idle",
  items: [],
  view: "list",
};

const normalizePagedItems = (data: PagedResponse<Assessment> | Assessment[]) => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.items ?? data.content ?? [];
};

const getErrorMessage = (error: unknown) => {
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
  void,
  { rejectValue: string }
>("assignment/fetchAssessments", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<ApiResponse<PagedResponse<Assessment> | Assessment[]>>(
      "/assessments",
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

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    clearAssignmentError: (state) => {
      state.error = null;
    },
    setView: (state, action: PayloadAction<AssignmentView>) => {
      state.view = action.payload;
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
      .addCase(deleteAssessment.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload ?? "Failed to delete assignment.";
      });
  },
});

export const { clearAssignmentError, setView } = assignmentSlice.actions;

export const assignmentReducer = assignmentSlice.reducer;

export const selectAssignments = (state: RootState) => state.assignment.items;
export const selectAssignmentError = (state: RootState) => state.assignment.error;
export const selectAssignmentView = (state: RootState) => state.assignment.view;
export const selectCreateStatus = (state: RootState) => state.assignment.createStatus;
export const selectDeleteStatus = (state: RootState) => state.assignment.deleteStatus;
export const selectFetchStatus = (state: RootState) => state.assignment.fetchStatus;

export const selectAssignmentCards = createSelector([selectAssignments], (items) =>
  items.map<AssignmentCard>((item) => ({
    assignedOn: formatDate(item.createdAt),
    dueOn: formatDate(item.dueDate),
    id: item.id,
    title: item.title,
  })),
);

