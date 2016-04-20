'use strict';

import React, {
  ListView,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TouchableHighlight
} from 'react-native';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// import css variables
import design from '../design';

import IdeaCell from '../components/IdeaCell';
import AddIdea from '../components/AddIdea';

import { SwipeListView } from 'react-native-swipe-list-view';

class IdeasList extends Component {
  constructor(props) {
    super(props);
  }

  _handleNextButtonPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  _handleRemoveIdea(rowID) {
    const { actions } = this.props;

    Alert.alert(
      'Confirm suppression',
      'Are you sure you want to delete this idea?',
      [{
        text: 'OK', onPress: () => {
          actions.remove(rowID);
          this.props.navigator.pop();
        }
      },
      {
        text: 'Cancel'
      }]
    );
  }

  _handleAddIdea() {
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

  render() {
    const { state } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    if(state.ideas.length) {
      const ideas = [];
      for(let i = 0; i < state.ideas.length; i++) {
        ideas[state.ideas.length - 1 - i] = state.ideas[i];
      }

      return (
        <SwipeListView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(ideas)}
          renderRow={this.renderCell.bind(this)}
          renderHiddenRow={(idea, sectionID, rowID) => (
            <TouchableHighlight onPress={ () => {
              this._handleRemoveIdea(rowID);
            }} style={styles.rowBack}>
              <Text style={styles.rowBackText}>Delete</Text>
            </TouchableHighlight>
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
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
    return (
      <IdeaCell onSelect={() => this._handleNextButtonPress(
        {
          title:  'Idea #' + rowIDDisplay,
          component: AddIdea,
          rightButtonTitle: '',
          leftButtonIcon: '',
          passProps: {
            index: rowIDDisplay - 1,
            rowIDDisplay: rowIDDisplay,
            idea: idea.title
          }
        })}
        rowID={rowID}
        rowIDDisplay={rowIDDisplay}
        idea={idea}
      />
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
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15
  },
  rowBackText: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'right'
  }
});
