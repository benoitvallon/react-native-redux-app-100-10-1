import * as types from '../actions/actionTypes';

const initialState = {
  ideas: []
};

export default function ideas(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD:
      return {
        ideas: [
          ...state.ideas,
          {
            title: action.data.trim()
          }
        ]
      };
    case types.SAVE:
      return {
        ideas: state.ideas.map((idea, index) => {
          if(action.data.index === index) {
            idea.title = action.data.idea.trim();
          }
          return idea;
        })
      };
    case types.REMOVE:
      return {
        ideas: state.ideas.filter((idea, index) => {
          return action.data !== index;
        })
      };
    case types.RESET:
      return {
        ideas: []
      };
    default:
      return state;
  }
}
