'use strict';

import React, { View } from 'react-native';
import TestUtils from 'react-addons-test-utils';

import { Settings } from '../../../components/Settings';

function setup(Component) {
  let props = {
    navigator: {},
    actions: {},
    state: {
      ideas: [ { title: 'My idea' }]
    }
  };

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

describe('settings page', () => {
  it('should render properly', () => {
    const { output } = setup(Settings);

    expect(output.type).toEqual(View);
    expect(output.props.children.length).toEqual(4);

    expect(output.props.children[1].props.children.props.children).toEqual('Email/Share');
    expect(output.props.children[3].props.children.props.children).toEqual('Reset ideas');
  });

  it('should be able to press buttons', () => {
    const { output } = setup(Settings);

    const shareButton = output.props.children[1];
    shareButton.props.onPress();
    const resetButton = output.props.children[3];
    resetButton.props.onPress();
  });
});
