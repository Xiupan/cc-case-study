import { takeEvery } from "redux-saga/effects";
import * as actions from "../actions";

function* someSagaThatDoesSomething(action) {
  try {
    yield console.log("yay");
  } catch (error) {
    console.log(error);
  }
}

function* watcherSaga() {
  yield takeEvery(actions["REQUEST_SOME_ACTION"], someSagaThatDoesSomething);
}

export default [watcherSaga];
