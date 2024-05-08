export type APIStatus = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ClassInSubjectType {
  id: number;
  classCode: string;
  subjectId: {
    id: number;
    name: string;
    credit: number;
    type: string;
    majorId: number;
    preSubject: [];
  };
  semester: {
    id: number;
    name: string;
    year: string;
  };
  createdDate: string;
  closedDate: string;
  numberOfStudent: number;
  minStudent: number;
  maxStudent: number;
  startDate: string;
  endDate: string;
  acceptOpen: boolean;
}
export interface SubjectDataType {
  key?: React.Key;
  id: number;
  name: string;
  credit: number;
  type: string;
  majorId: number;
  preSubject: number[];
}

export interface SemesterType {
  id: number;
  name: string;
  year: string;
}

export interface Customer {
  dataListClassInSubject: ClassInSubjectType[];
  statusGetDataList: "idle" | "loading" | "failed" | "complete";
  messageGetDataList: string;

  dataListSubject: SubjectDataType[];
  dataListSemester: SemesterType[];
  // insertDataCustomer: any;
  // statusInsertCustomer: "idle" | "loading" | "failed" | "complete";
  // messageInsertCustomer: string;
}

const initialState: Customer = {
  dataListClassInSubject: [],
  statusGetDataList: "idle",
  messageGetDataList: "",
  dataListSubject: [],
  dataListSemester: [],
};

export const SubjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers: {
    //GET API
    getListClassInSubject: (state) => {
      state.statusGetDataList = "loading";
    },
    getListClassInSubjectSuccess: (
      state,
      action: PayloadAction<{ data: any }>
    ) => {
      state.dataListClassInSubject = action.payload.data;
      state.statusGetDataList = "complete";
    },
    getListClassInSubjectFailed: (
      state,
      action: PayloadAction<{ data: string }>
    ) => {
      state.statusGetDataList = "failed";
      state.messageGetDataList = action.payload.data;
    },
    //
    getListSubject: (state) => {
      state.statusGetDataList = "loading";
    },
    getListSubjectSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.dataListSubject = action.payload.data;
      state.statusGetDataList = "complete";
    },
    getListSubjectFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetDataList = "failed";
      state.messageGetDataList = action.payload.data;
    },
    //semester
    getListSemester: (state) => {
      state.statusGetDataList = "loading";
    },
    getListSemesterSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.dataListSemester = action.payload.data;
      state.statusGetDataList = "complete";
    },
    getListSemesterFailed: (state, action: PayloadAction<{ data: string }>) => {
      state.statusGetDataList = "failed";
      state.messageGetDataList = action.payload.data;
    },
  },
});

// ACTION
export const {
  getListClassInSubject,
  getListClassInSubjectSuccess,
  getListClassInSubjectFailed,
  getListSubject,
  getListSubjectSuccess,
  getListSubjectFailed,
  getListSemester,
  getListSemesterSuccess,
  getListSemesterFailed,
} = SubjectSlice.actions;
// SELECTORS

// reducer
const subjectReducer = SubjectSlice.reducer;
export default subjectReducer;
