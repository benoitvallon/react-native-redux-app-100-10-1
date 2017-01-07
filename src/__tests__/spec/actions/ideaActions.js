'use strict';

import * as actions from '../../../actions/ideaActions';

describe('idea actions', function() {
  it('should be find an actions file', function() {
    expect(actions).toBeDefined();
  });

  it('should create an action to add an idea', function() {
    const idea = 'My first idea';
    expect(actions.add(idea)).toMatchSnapshot();
  });

  it('should create an action to save an idea', function() {
    const index = 1;
    const idea = 'My second idea';
    expect(actions.save(idea, index)).toMatchSnapshot();
  });

  it('should create an action to remove an idea', function() {
    const index = 1;
    expect(actions.remove(index)).toMatchSnapshot();
  });

  it('should create an action to reset the idea list', function() {
    expect(actions.reset()).toMatchSnapshot();
  });
});
