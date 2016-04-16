import * as types from './actionTypes';

export function add(idea) {
  return {
    type: types.ADD,
    data: idea
  };
}

export function save(idea) {
  return {
    type: types.SAVE,
    data: idea
  };
}

export function remove(rowID) {
  return {
    type: types.REMOVE,
    data: rowID
  };
}

export function reset() {
  return {
    type: types.RESET
  };
}
