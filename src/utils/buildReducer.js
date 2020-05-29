export const buildReducer = (initial, handlers) => {
  return (state = initial, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
  };
};
