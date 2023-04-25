import { produce } from "immer";

export const initialState = {
  visitedRoutes: [],
};

/* eslint-disable default-case, no-param-reassign */
export default produce((draft, action) => {
  switch (action.type) {
    case "ADD_VISITED_ROUTE":
      draft.visitedRoutes.push(action.value);
      break;
    case "REMOVE_VISITED_ROUTE":
      const index = draft.visitedRoutes.indexOf(action.value);
      draft.visitedRoutes.splice(index, 1);
      break;
  }
});
