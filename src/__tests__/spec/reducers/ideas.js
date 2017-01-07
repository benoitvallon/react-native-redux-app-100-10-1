'use strict';

import reducer from '../../../reducers/ideas';
import * as types from '../../../actions/actionTypes';

describe('ideas reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      ideas: []
    });
  });

  it('should return a wrong action', () => {
    expect(
      reducer(undefined, {
        type: types.WRONG,
        data: 'My first idea'
      })
    ).toMatchSnapshot();
  });

  it('should handle add and trim', () => {
    expect(
      reducer(undefined, {
        type: types.ADD,
        data: 'My first idea     '
      })
    ).toMatchSnapshot();

    expect(
      reducer({
        ideas: [
          { title: 'My first idea' }
        ]
      }, {
        type: types.ADD,
        data: 'My second idea \n\n\n '
      })
    ).toMatchSnapshot();
  });

  it('should handle remove', () => {
    expect(
      reducer({
        ideas: [
          { title: 'My first idea' },
          { title: 'My second idea' }
        ]
      }, {
        type: types.REMOVE,
        data: 1
      })
    ).toMatchSnapshot();
  });

  it('should handle save and trim', () => {
    expect(
      reducer({
        ideas: [
          { title: 'My second idea' }
        ]
      }, {
        type: types.SAVE,
        data: {
          index: 0,
          idea: 'My second idea edited \n\n\n '
        }
      })
    ).toMatchSnapshot();
  });

  it('should handle reset', () => {
    expect(
      reducer({
        ideas: [
          { title: 'My second idea edited' }
        ]
      }, {
        type: types.RESET
      })
    ).toMatchSnapshot();
  });
});
