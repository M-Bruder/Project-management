import {
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  FETCH_PROJECT,
} from '../actions/types';

export default function projectReducer(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT:
      return [...state, action.payload];
    case EDIT_PROJECT:
      return [...state, action.payload];
    case DELETE_PROJECT:
      return state.filter(project => project._id !== action.payload.id);
    case FETCH_PROJECT:
      return action.projects;
    default:
      return state;
  }
}
