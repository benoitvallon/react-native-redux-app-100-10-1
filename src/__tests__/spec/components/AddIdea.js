'use strict';

import React, { View } from 'react-native';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

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
      navigator: {},
      actions: {},
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
      idea: 'My idea',
      navigator: {},
      actions: {},
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

  it('should be able to press buttons for new idea', () => {
    const props = {
      newIdea: true,
      state: {
        ideas: [ { title: 'My idea' }]
      },
      actions: {
        add: expect.createSpy(),
        save: expect.createSpy(),
        remove: expect.createSpy()
      },
      navigator: {
        pop: expect.createSpy(),
        push: expect.createSpy()
      }
    };
    const { output } = setup(AddIdea, props);

    const inputText = output.props.children[1];
    inputText.props.onChangeText('My new idea');

    const addButton = output.props.children[2];
    addButton.props.onPress();
    expect(props.actions.add.calls.length).toBe(1);
  });

  it('should be able to press buttons for existing idea', () => {
    const props = {
      index: 0,
      idea: 'My idea',
      state: {
        ideas: [ { title: 'My idea' }]
      },
      actions: {
        add: expect.createSpy(),
        save: expect.createSpy(),
        remove: expect.createSpy()
      },
      navigator: {
        pop: expect.createSpy(),
        push: expect.createSpy()
      }
    };
    const { output } = setup(AddIdea, props);

    const saveButton = output.props.children[3];
    saveButton.props.onPress();
    expect(props.actions.save.calls.length).toBe(1);

    const removeButton = output.props.children[4];
    removeButton.props.onPress();
  });
});
