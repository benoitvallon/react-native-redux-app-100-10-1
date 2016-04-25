'use strict';

import React, {
  Component,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

// import css variables
import design from '../design';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import ActivityView from 'react-native-activity-view';

export class Settings extends Component {
  constructor(props) {
    super(props);
  }

  _handleShare() {
    const { state } = this.props;

    let ideasString = state.ideas.map((idea, index) => {
      return index + 1 + '-' + idea.title;
    }).join('\n');

    ideasString = 'My idea list:\n\n' + ideasString;
    ActivityView.show({
      text: ideasString
    });
  }
  _handleResetIdeas() {
    const { actions } = this.props;

    Alert.alert(
      'Confirm suppression',
      'Are you sure you want to delete all of your ideas?',
      [{
        text: 'OK', onPress: () => {
          actions.reset();
          this.props.navigator.pop();
        }
      },
      {
        text: 'Cancel'
      }]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={design.designComp.label}>
          Send or share your idea list:
        </Text>
        <TouchableOpacity onPress={this._handleShare.bind(this)} style={design.designComp.button}>
          <Text style={design.designComp.buttonText}>Email/Share</Text>
        </TouchableOpacity>
        <Text style={design.designComp.label}>
          Delete your idea list:
        </Text>
        <TouchableOpacity onPress={this._handleResetIdeas.bind(this)} style={design.designComp.button}>
          <Text style={design.designComp.buttonText}>Reset ideas</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({
    state: state.ideas
  }),
  (dispatch) => ({
    actions: bindActionCreators(ideaActions, dispatch)
  })
)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
