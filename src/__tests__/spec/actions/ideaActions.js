'use strict';

jest.disableAutomock();

import * as actions from '../../../actions/ideaActions';
import * as types from '../../../actions/actionTypes';

describe('idea actions', function() {

  it('should be find an actions file', function() {
    expect(actions).toBeDefined();
  });

  it('should create an action to add an idea', function() {
    const idea = 'My first idea';
    const expectedAction = {
      type: types.ADD,
      data: idea
    };
    expect(actions.add(idea)).toEqual(expectedAction);
  });

  it('should create an action to save an idea', function() {
    const index = 1;
    const idea = 'My second idea';
    const expectedAction = {
      type: types.SAVE,
      data: {
        idea,
        index
      }
    };
    expect(actions.save(idea, index)).toEqual(expectedAction);
  });

  it('should create an action to remove an idea', function() {
    const index = 1;
    const expectedAction = {
      type: types.REMOVE,
      data: index
    };
    expect(actions.remove(index)).toEqual(expectedAction);
  });

  it('should create an action to reset the idea list', function() {
    const expectedAction = {
      type: types.RESET
    };
    expect(actions.reset()).toEqual(expectedAction);
  });
});
