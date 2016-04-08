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

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
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
              passProps: {
                newIdea: true
              }
            });
          }
        }}
        rightButtonTitle='Add'
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
