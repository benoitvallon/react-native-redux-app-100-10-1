import * as types from './actionTypes';

export function add(idea) {
  return {
    type: types.ADD,
    data: idea
  };
}

export function save(data) {
  return {
    type: types.SAVE,
    data: data
  };
}

export function remove(rowID) {
  return {
    type: types.REMOVE,
    data: rowID
  };
}
