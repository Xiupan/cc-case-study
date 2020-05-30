import { takeEvery, put } from "redux-saga/effects";
import * as actions from "../actions";

function* selectNextMap(action) {
  try {
    const { availableStyles, currentIndex } = action.payload;
    let nextStyleIndex =
      currentIndex + 1 > availableStyles.length - 1 ? 0 : currentIndex + 1;

    yield put({
      type: "SET_SELECTED_STYLE",
      payload: { selectedStyle: availableStyles[nextStyleIndex] }
    });
  } catch (error) {
    console.log(error);
  }
}

function* watcherSaga() {
  yield takeEvery(actions["REQUEST_NEXT_MAP"], selectNextMap);
}

export default [watcherSaga];
