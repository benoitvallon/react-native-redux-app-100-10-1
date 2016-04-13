'use strict';

import React, {
  ListView,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import * as ideaActions from '../actions/ideaActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// import css variables
import design from '../design';

import IdeaCell from '../components/IdeaCell';
import AddIdea from '../components/AddIdea';

class IdeasList extends Component {
  constructor(props) {
    super(props);
  }

  _handleBackButtonPress() {
    this.props.navigator.pop();
  }
  _handleNextButtonPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }
  _handleAddIdea() {
    this.props.navigator.push({
      title: 'New idea',
      component: AddIdea,
      rightButtonTitle: '',
      passProps: {
        newIdea: true
      }
    });
  }

  render() {
    const { state } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    if(state.ideas.length) {
      return (
        <ListView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          dataSource={ds.cloneWithRows(state.ideas)}
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

    rowID = parseInt(rowID);
    const rowIDDisplay = state.ideas.length - parseInt(rowID);
    return (
      <IdeaCell onSelect={() => this._handleNextButtonPress(
        {
          title:  'Idea #' + rowIDDisplay,
          component: AddIdea,
          rightButtonTitle: '',
          passProps: {
            rowID: rowID,
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
  }
});
