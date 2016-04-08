import * as types from '../actions/actionTypes';

const initialState = {
  ideas: []
};

export default function counter(state = initialState, action = {}) {
  let ideas;
  switch (action.type) {
    case types.ADD:
      ideas = state.ideas.slice();
      ideas.unshift({
        title: action.data
      });
      return {
        ...state,
        ideas: ideas
      };
    case types.SAVE:
      ideas = state.ideas.slice();
      ideas[action.data.rowID].title = action.data.idea;
      return {
        ...state,
        ideas: ideas
      };
    case types.REMOVE:
      ideas = state.ideas.slice();
      ideas.splice(action.data, 1);
      return {
        ...state,
        ideas: ideas
      };
    default:
      return state;
  }
}
