'use strict';

import React, {
  Component,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity
} from 'react-native';

// import css variables
import design from '../design';

import Ideas from './Ideas';
import AddIdea from '../components/AddIdea';
import Settings from '../components/Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import Device from 'react-native-device';
import Orientation from 'react-native-orientation';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsIcon: null
    };
    Icon.getImageSource('navicon', 32, 'red').then(
      (source) => this.setState({
        settingsIcon: source,
        orientation: Orientation.getInitialOrientation()
      })
    );
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange.bind(this));
  }

  _orientationDidChange(orientation) {
    orientation = orientation || 'PORTRAIT';
    this.setState({
      orientation: orientation
    });
  }

  _getNavbarHeight(orientation) {
    if(Device.isIphone() && orientation === 'LANDSCAPE') {
      return 'navbarSmall';
    } else {
      return 'navbarLarge';
    }
  }

  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps} />
  }

  configureScene() {
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  }

  render() {
    var NavigationBarRouteMapper = {
      Title: function(route) {
        return (
          <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
        );
      },

      LeftButton: function(route, navigator, index) {
        if (index === 0) {
          return (
            <TouchableOpacity
              onPress={() => navigator.push({
                component: Settings,
                title: 'Settings'
              })}
              style={styles.navBarButton}>
              <Text style={[styles.navBarText, styles.navBarButtonText, styles.navBarLeftIconButton]}>
                <Icon name="navicon" size={32} color="white" />
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>Back</Text>
          </TouchableOpacity>
        );
      },

      RightButton: function(route, navigator, index) {
        if (index === 0) {
          return (
            <TouchableOpacity
              onPress={() => navigator.push({
                component: AddIdea,
                title: 'New idea',
                passProps: {
                  newIdea: true
                }
              })}
              style={styles.navBarButton}>
              <Text style={styles.navBarText}>Add</Text>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      }
    };

    if(!this.state.settingsIcon) {
      return false;
    }

    // const navbarHeight = this._getNavbarHeight(this.state.orientation);
    return (
      <Navigator
        debugOverlay={false}
        style={styles.container}
        initialRoute={{component: Ideas, title: 'My ideas'}}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: design.designUnit.backgroundColor
  },
  navbarSmall: {
    marginTop: 32
  },
  navbarLarge: {
    marginTop: 64
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  navBar: {
    backgroundColor: design.designUnit.primaryColor
  },
  navBarText: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10
  },
  navBarTitleText: {
    fontWeight: 'bold',
    marginVertical: 9
  },
  navBarButton: {
    paddingRight: 10,
    paddingLeft: 10
  },
  navBarLeftIconButton: {
    marginTop: 5
  }
});
