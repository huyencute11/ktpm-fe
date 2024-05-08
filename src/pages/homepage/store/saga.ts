import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getListClassInSubject,
  getListClassInSubjectSuccess,
  getListClassInSubjectFailed,
  getListSubject,
  getListSubjectSuccess,
  getListSubjectFailed,
  getListSemester,
  getListSemesterSuccess,
  getListSemesterFailed,
} from "./subject.slice";
import { BaseInterfaceRespone } from "../../../helper/BaseInterface";
import { getListClassInSubjectData, getListSemesterData, getListSubjectData } from "./service";

function* getListClassInSubjectSaga(action: PayloadAction<{subjectId:number, semesterId: number}>) {
  try {
    const response: BaseInterfaceRespone<any> = yield call(
      getListClassInSubjectData,
      action.payload
    );
    if (response) {
      yield put(getListClassInSubjectSuccess({ data: response.data }));
    } else {
      yield put(getListClassInSubjectFailed({ data: response }));
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListSubjectSaga(action: PayloadAction<{ params: any }>) {
  try {
    const response: BaseInterfaceRespone<any> = yield call(
      getListSubjectData,
      action.payload
    );
    if (response) {
      yield put(getListSubjectSuccess({ data: response.data }));
    } else {
      yield put(getListSubjectFailed({ data: response }));
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListSemesterSaga(action: PayloadAction<{ params: any }>) {
  try {
    const response: BaseInterfaceRespone<any> = yield call(
      getListSemesterData,
      action.payload
    );
    if (response) {
      yield put(getListSemesterSuccess({ data: response.data }));
    } else {
      yield put(getListSemesterFailed({ data: response }));
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* subjectSaga() {
  yield all([
    takeEvery(getListClassInSubject.type, getListClassInSubjectSaga),
    takeEvery(getListSubject.type, getListSubjectSaga),
    takeEvery(getListSemester.type, getListSemesterSaga),
  ]);
}
