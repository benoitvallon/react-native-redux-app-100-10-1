'use strict';

jest.disableAutomock();

import React, { View } from 'react-native';
import TestUtils from 'react-addons-test-utils';

import { AddIdea } from '../../../components/AddIdea';

function setup(Component, props) {
  let renderer = TestUtils.createRenderer();
  renderer.render(
      <Component {...props} />
    );
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('add idea page', () => {
  it('should render properly for new idea', () => {
    const props = {
      newIdea: true,
      state: {
        ideas: [ { title: 'My idea' }]
      }
    };
    const { output } = setup(AddIdea, props);

    expect(output.type).toEqual(View);
    expect(output.props.children.length).toEqual(5);

    expect(output.props.children[2].props.children.props.children).toEqual('Add');
    expect(output.props.children[3]).toEqual(false);
    expect(output.props.children[4]).toEqual(false);
  });

  it('should render properly for existing idea', () => {
    const props = {
      index: 0,
      rowIDDisplay: 1,
      idea: 'My idea',
      state: {
        ideas: [ { title: 'My idea' }]
      }
    };
    const { output } = setup(AddIdea, props);

    expect(output.type).toEqual(View);
    expect(output.props.children.length).toEqual(5);

    expect(output.props.children[2]).toEqual(undefined);
    expect(output.props.children[3].props.children.props.children).toEqual('Save');
    expect(output.props.children[4].props.children.props.children).toEqual('Remove');
  });
});
