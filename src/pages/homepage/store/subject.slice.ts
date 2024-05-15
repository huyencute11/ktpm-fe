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

export interface Student {
  id: number;
  studentId: number | string;
  password: string;
  name: string;
  email: string;
  phone: string;
  completedSubjects: any[];
  registeredSubjects: any[];
  currentClasses: any[];
  majorId: number;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  username: string;
  authorities: any[];
  numberCredits: number;
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
  studentCurrent: Student | null;
  loadingGetStudentCurrent: "idle" | "loading" | "failed" | "complete";
  loadingClass: "idle" | "loading" | "failed" | "complete";
  registeredClass: ClassInSubjectType[];
  loadingRegisterd: "idle" | "loading" | "failed" | "complete";

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
  studentCurrent: null,
  loadingGetStudentCurrent: "idle",
  loadingClass: "idle",
  loadingRegisterd: "idle",
  registeredClass: [],
};

export const SubjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers: {
    //GET API
    getListClassInSubject: (state) => {
      state.loadingClass = "loading";
    },
    getListClassInSubjectSuccess: (
      state,
      action: PayloadAction<{ data: any }>
    ) => {
      state.dataListClassInSubject = action.payload.data;
      state.loadingClass = "complete";
    },
    getListClassInSubjectFailed: (
      state,
      action: PayloadAction<{ data: string }>
    ) => {
      state.loadingClass = "failed";
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
    //get student current
    getStudentCurrent: (state) => {
      state.loadingGetStudentCurrent = "loading";
    },
    getStudentCurrentSuccess: (state, action: PayloadAction<{ data: any }>) => {
      state.studentCurrent = action.payload.data;
      state.loadingGetStudentCurrent = "complete";
    },
    getStudentCurrentFailed: (
      state,
      action: PayloadAction<{ data: string }>
    ) => {
      state.loadingGetStudentCurrent = "failed";
      state.messageGetDataList = action.payload.data;
    },
    //get registered class
    getRegisteredClass: (state) => {
      state.loadingRegisterd = "loading";
    },
    getRegisteredClassSuccess: (
      state,
      action: PayloadAction<{ data: any }>
    ) => {
      state.registeredClass = action.payload.data;
      state.loadingRegisterd = "complete";
    },
    getRegisteredClassFailed: (
      state,
      action: PayloadAction<{ data: string }>
    ) => {
      state.loadingRegisterd = "failed";
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
  getStudentCurrent,
  getStudentCurrentFailed,
  getStudentCurrentSuccess,
  getRegisteredClass,
  getRegisteredClassSuccess,
  getRegisteredClassFailed,
} = SubjectSlice.actions;
// SELECTORS

// reducer
const subjectReducer = SubjectSlice.reducer;
export default subjectReducer;
