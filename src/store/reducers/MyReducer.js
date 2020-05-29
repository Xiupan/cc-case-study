import { buildReducer } from "../../utils/buildReducer";
import produce from "immer";
import * as actions from "../actions";

const initialState = {
  something: "yay",
};

const setSomething = produce((draft, action) => {
  draft.something = action.payload.something;
  return draft;
});

const handlers = {
  [actions.SET_SOMETHING]: setSomething,
};

export default buildReducer(initialState, handlers);
