'use strict';

import React, {
  ListView,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// import css variables
import design from '../design';

import IdeaCell from '../components/IdeaCell';
import AddIdea from '../components/AddIdea';

import Swipeout from 'react-native-swipeout';

class IdeasList extends Component {
  constructor(props) {
    super(props);
    this._rows = [];
  }

  _handleEditIdea(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  _handleRemoveIdea(index) {
    const { actions } = this.props;

    Alert.alert(
      'Confirm suppression',
      'Are you sure you want to delete this idea?',
      [{
        text: 'OK', onPress: () => {
          this._closeAllRows();
          actions.remove(index);
        }
      },
      {
        text: 'Cancel', onPress: () => {
          this._closeAllRows();
        }
      }]
    );
  }

  _closeAllRows() {
    this._rows.forEach((row) => {
      if(row) {
        row._close();
      }
    });
  }

  _handleOpen() {
    this._closeAllRows();
  }

  _handleAddIdea() {
    this._closeAllRows();
    this.props.navigator.push({
      title: 'New idea',
      component: AddIdea,
      rightButtonTitle: '',
      leftButtonIcon: '',
      passProps: {
        newIdea: true
      }
    });
  }

  componentWillUpdate() {
    this._closeAllRows();
  }

  render() {
    const { state } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    if(state.ideas.length) {
      const ideas = [];
      for(let i = 0; i < state.ideas.length; i++) {
        ideas[state.ideas.length - 1 - i] = state.ideas[i];
      }

      return (
        <ListView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(ideas)}
          renderRow={this.renderCell.bind(this)}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome to 100-10-1</Text>
            <Text style={styles.welcomeText}>The sooner you start entering your 100 awesome ideas, the sonner you select the One!</Text>
            <TouchableOpacity onPress={this._handleAddIdea.bind(this)} style={[design.designComp.button, styles.welcomeButton]}>
              <Text style={design.designComp.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderCell(idea, sectionID, rowID) {
    const { state } = this.props;

    const rowIDDisplay = state.ideas.length - parseInt(rowID);
    const index = rowIDDisplay - 1;

    const swipeButtons = [{
      text: 'Remove',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 1, 0.6)',
      onPress: () => {this._handleRemoveIdea(index); }
    }];

    return (
      <Swipeout right={swipeButtons}
        onOpen={() => { this._handleOpen(index); }}
        ref={row => this._rows[index] = row}
        autoClose={false}
        backgroundColor= 'transparent'>
      <IdeaCell onSelect={() => this._handleEditIdea(
        {
          title:  'Idea #' + rowIDDisplay,
          component: AddIdea,
          rightButtonTitle: '',
          leftButtonIcon: '',
          passProps: {
            index: index,
            rowIDDisplay: rowIDDisplay,
            idea: idea.title
          }
        })}
        rowID={rowID}
        rowIDDisplay={rowIDDisplay}
        idea={idea}
      />
    </Swipeout>
    );
  }
}

export default connect(state => (
  {
    state: state.ideas
  }),
  (dispatch) => ({
    actions: bindActionCreators(ideaActions, dispatch)
  })
)(IdeasList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  welcomeTitle: {
    fontSize: 32,
    color: design.designUnit.primaryColor,
    textAlign: 'center',
    marginBottom: 16
  },
  welcomeContainer: {
    padding: 20
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50
  },
  welcomeButton: {
    marginBottom: 150
  }
});
