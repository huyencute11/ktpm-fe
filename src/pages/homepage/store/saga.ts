import { takeEvery, all, put, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
 getListSubject,
  getListSubjectFailed,
  getListSubjectSuccess,
} from "./subject.slice";
import { BaseInterfaceRespone } from "../../../helper/BaseInterface";
import { getListSubjectData } from "./service";

function* getListSubjectSaga(action: PayloadAction<{ params: any }>) {
  try {
    const response: BaseInterfaceRespone<any>= yield call(
      getListSubjectData,
      action.payload
    );
    if (response) {
      yield put(getListSubjectSuccess({ data: response }));
    } else {
      yield put(getListSubjectFailed({ data: response }));
    }
  } catch (err) {
    console.log(err);
  }
}



export default function* subjectSaga() {
  yield all([
    takeEvery(getListSubject.type, getListSubjectSaga),
  ]);
}