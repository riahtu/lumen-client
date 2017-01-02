
import { combineReducers } from 'redux';

export function counter(state = {
  val: 4
}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state,
        { val: state.val + 1 });
    case 'DECREMENT':
      return Object.assign({}, state,
        { val: state.val - 1 });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter
});
