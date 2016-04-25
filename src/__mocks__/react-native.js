'use strict';

import React from 'react';
const ReactNative = React;

ReactNative.StyleSheet = {
  create: function create(styles) {
    return styles;
  }
};

ReactNative.View = React.Component;
ReactNative.ScrollView = React.Component;
ReactNative.Text = React.Component;
ReactNative.TouchableOpacity = React.Component;
ReactNative.TouchableHighlight = React.Component;
ReactNative.TouchableWithoutFeedback = React.Component;
ReactNative.ToolbarAndroid = React.Component;
ReactNative.Image = React.Component;
ReactNative.NativeModules= {};

ReactNative.Platform = {};
module.exports = ReactNative;
