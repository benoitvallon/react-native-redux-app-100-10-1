'use strict';

import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import css variables
import design from '../design';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

export class IdeaCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>
            {this.props.rowIDDisplay}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {this.props.idea.title}
        </Text>
        <TouchableOpacity style={styles.arrowRightContainer} onPress={this.props.onSelect}>
          <Text style={styles.arrowRight}> > </Text>
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
)(IdeaCell);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFD',
    height: 70,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#c8c7cc'
  },
  numberContainer: {
    backgroundColor: '#dddddd',
    width: 70,
    justifyContent: 'center'
  },
  number: {
    alignSelf: 'center',
    fontSize: 32,
    color: design.designUnit.primaryColor
  },
  description: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 8,
    fontSize: 16
  },
  arrowRightContainer: {
    width: 50,
    justifyContent: 'center'
  },
  arrowRight:{
    alignSelf: 'center',
    fontSize: 24,
    color: '#dddddd'
  }
});
