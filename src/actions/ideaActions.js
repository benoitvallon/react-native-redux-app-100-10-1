import * as types from './actionTypes';

export function add(idea) {
  return {
    type: types.ADD,
    data: idea
  };
}

export function save(idea, index) {
  return {
    type: types.SAVE,
    data: {
      idea,
      index
    }
  };
}

export function remove(index) {
  return {
    type: types.REMOVE,
    data: index
  };
}

export function reset() {
  return {
    type: types.RESET
  };
}
