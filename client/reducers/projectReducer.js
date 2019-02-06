import { ADD_PROJECT, DELETE_PROJECT, FETCH_PROJECT } from '../actions/types';

export default function postReducer(state = [], action) {
  switch (action.type) {
    case ADD_PROJECT:
      return [...state, action.payload];
    case DELETE_PROJECT:
      return state.filter(post => post._id !== action.payload.id);
      case FETCH_PROJECT:
      return action.posts;
    default:
      return state;
  }
}


