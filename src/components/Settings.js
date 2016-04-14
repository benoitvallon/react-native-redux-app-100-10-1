'use strict';

import React, {
  Component,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import css variables
import design from '../design';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
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
