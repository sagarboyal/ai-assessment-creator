import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AssignmentCard = {
  assignedOn: string;
  dueOn: string;
  title: string;
};

type AssignmentState = {
  assignments: AssignmentCard[];
  view: "list" | "create";
};

const initialState: AssignmentState = {
  assignments: [
    { title: "Quiz on Electricity", assignedOn: "20-08-2025", dueOn: "21-08-2025" },
    { title: "Quiz on Electricity", assignedOn: "20-08-2025", dueOn: "21-08-2025" },
    { title: "Quiz on Electricity", assignedOn: "20-08-2025", dueOn: "21-08-2025" },
    { title: "Quiz on Electricity", assignedOn: "20-08-2025", dueOn: "21-08-2025" },
    { title: "Quiz on Electricity", assignedOn: "20-08-2025", dueOn: "21-08-2025" },
    { title: "Quiz on Electricity", assignedOn: "20-08-2025", dueOn: "21-08-2025" },
  ],
  view: "list",
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<AssignmentCard>) => {
      state.assignments.unshift(action.payload);
    },
    removeAssignment: (state, action: PayloadAction<number>) => {
      state.assignments.splice(action.payload, 1);
    },
    setAssignments: (state, action: PayloadAction<AssignmentCard[]>) => {
      state.assignments = action.payload;
    },
    setView: (state, action: PayloadAction<AssignmentState["view"]>) => {
      state.view = action.payload;
    },
  },
});

export const { addAssignment, removeAssignment, setAssignments, setView } =
  assignmentSlice.actions;

export const assignmentReducer = assignmentSlice.reducer;

