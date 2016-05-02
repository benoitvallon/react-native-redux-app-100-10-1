'use strict';

jest.disableAutomock();

import React, { View } from 'react-native';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import { IdeaCell } from '../../../components/IdeaCell';

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

describe('idea cell', () => {
  it('should render properly', () => {
    const props = {
      index: 0,
      rowIDDisplay: 1,
      idea: {
        title: 'My idea'
      },
      state: {
        ideas: [ { title: 'My idea' }]
      }
    };
    const { output } = setup(IdeaCell, props);

    expect(output.type).toEqual(View);
    expect(output.props.children.length).toEqual(3);

    expect(output.props.children[0].props.children.props.children).toEqual(1);
    expect(output.props.children[1].props.children).toEqual('My idea');
  });
});
