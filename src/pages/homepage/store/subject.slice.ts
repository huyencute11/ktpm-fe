// import { createSlice } from '@reduxjs/toolkit'
// import {
//     getSubjects
// } from './subject.actionThunks'
export type APIStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'

// export type SubjectState = {
//     dataSubjectStatus: APIStatus,
//     dataSubjectList: any[],
// }

// const initialState: SubjectState = {
//     dataSubjectList: [],
//     dataSubjectStatus: 'IDLE',
// }

// const subject = createSlice({
//     name: `Subject/state`,
//     initialState,
//     reducers: {
//         resetState: (state) => {
//             state.dataSubjectStatus = 'IDLE'
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getSubjects.pending, (state) => {
//                 state.dataSubjectStatus = 'LOADING'
//             })
//             .addCase(getSubjects.fulfilled, (state, action) => {
//                 state.dataSubjectStatus = 'SUCCESS'
//                 state.dataSubjectList = action.payload.data // Access the 'data' property of 'action.payload'
//             })
//             .addCase(getSubjects.rejected, (state) => {
//                 state.dataSubjectStatus = 'ERROR'
//             })
          
//     }
// })

// export const {
//     // setSearch,
//     // setFilterState
//     // setColumnState,
//     resetState
//     // toggleConfigLastChannelDialog,
// } = subject.actions

// export default subject.reducer


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  dataListSubject: any[];
  statusGetDataList: "idle" | "loading" | "failed" | "complete";
  messageGetDataList: string;
  // insertDataCustomer: any;
  // statusInsertCustomer: "idle" | "loading" | "failed" | "complete";
  // messageInsertCustomer: string;
}

const initialState: Customer = {
  dataListSubject: [],
  statusGetDataList: "idle",
  messageGetDataList: "",
};

export const SubjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers: {
    //GET API
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
   
    //GET API DETAIL PACKAGE
  },
});

// ACTION
export const {
  getListSubject,
  getListSubjectSuccess,
  getListSubjectFailed,
  
} = SubjectSlice.actions;
// SELECTORS

// reducer
const subjectReducer = SubjectSlice.reducer;
export default subjectReducer;
