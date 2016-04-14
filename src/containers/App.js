'use strict';

import React, {
  Component,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

// import css variables
import design from '../design';

import Ideas from './Ideas';
import AddIdea from '../components/AddIdea';
import Settings from '../components/Settings';
import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsIcon: null
    };
    Icon.getImageSource('navicon', 32, 'red').then(
      (source) => this.setState({
        settingsIcon: source
      })
    );
  }

  render() {
    if(!this.state.settingsIcon) {
      return false;
    }
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        itemWrapperStyle={styles.wrapper}
        tintColor={design.designUnit.tintColor}
        barTintColor={design.designUnit.primaryColor}
        titleTextColor={design.designUnit.titleTextColor}

        initialRoute={{
          component: Ideas,
          title: 'My ideas',
          onRightButtonPress: () => {
            this.refs.nav.navigator.push({
              title: 'New idea',
              component: AddIdea,
              rightButtonTitle: '',
              leftButtonIcon: '',
              passProps: {
                newIdea: true
              }
            });
          }
        }}
        rightButtonTitle='Add'
        leftButtonIcon={this.state.settingsIcon}
        onLeftButtonPress={() => {
          this.refs.nav.navigator.push({
            title: 'Settings',
            component: Settings,
            rightButtonTitle: '',
            leftButtonIcon: ''
          });
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    backgroundColor: design.designUnit.backgroundColor,
    marginTop: 64
  }
});
