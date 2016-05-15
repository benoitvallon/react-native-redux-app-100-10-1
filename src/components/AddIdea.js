'use strict';

import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert
} from 'react-native';

// import css variables
import design from '../design';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

export class AddIdea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.idea
    };
  }

  _handleAddIdea() {
    const { actions } = this.props;

    if(this.state.text === '' || this.state.text === undefined) {
      Alert.alert(
        'Type your idea first',
        'Is an empty idea really worth saving...',
        [{
          text: 'OK'
        }]
      );
    } else {
      actions.add(this.state.text);
      this.props.navigator.pop();
    }
  }
  _handleSaveIdea() {
    const { actions } = this.props;

    if(this.state.text === '') {
      this._handleRemoveIdea();
    } else {
      actions.save(this.state.text, this.props.index);
      this.props.navigator.pop();
    }
  }
  _handleRemoveIdea() {
    const { actions } = this.props;

    Alert.alert(
      'Confirm suppression',
      'Are you sure you want to delete this idea?',
      [{
        text: 'OK', onPress: () => {
          actions.remove(this.props.index);
          this.props.navigator.pop();
        }
      }, {
        text: 'Cancel'
      }]
    );
  }
  _handleTextChange(text) {
    this.setState(text);
  }

  render() {
    const { newIdea } = this.props;

    return (
      <View style={styles.container}>
        <Text style={design.designComp.label}>
          My idea:
        </Text>
        <TextInput
          placeholder='Enter your idea here...'
          style={styles.input}
          multiline={true}
          onChangeText={(text) => this._handleTextChange({text})}
          value={this.state.text}
        />

        {newIdea &&
          <TouchableOpacity onPress={this._handleAddIdea.bind(this)} style={design.designComp.button}>
            <Text style={design.designComp.buttonText}>Add</Text>
          </TouchableOpacity>
        }
        {!newIdea &&
          <TouchableOpacity onPress={this._handleSaveIdea.bind(this)} style={design.designComp.button}>
            <Text style={design.designComp.buttonText}>Save</Text>
          </TouchableOpacity>
        }
        {!newIdea &&
          <TouchableOpacity onPress={this._handleRemoveIdea.bind(this)} style={[design.designComp.button, styles.remove]}>
            <Text style={design.designComp.buttonText}>Remove</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

AddIdea.propTypes = {
  idea: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  newIdea: React.PropTypes.bool,
  index: React.PropTypes.number
};

export default connect(
  state => ({
    state: state.ideas
  }),
  (dispatch) => ({
    actions: bindActionCreators(ideaActions, dispatch)
  })
)(AddIdea);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
    height: 140,
    padding: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    fontSize: 16
  },
  remove: {
    backgroundColor: 'red'
  }
});
