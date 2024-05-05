import { all } from "redux-saga/effects";
import subjectSaga from "../pages/homepage/store/saga";

function* rootSaga() {
  yield all([subjectSaga()]);
}
export default rootSaga;