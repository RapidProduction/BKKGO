'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Components
const Main = require('./ios/main');

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class BKKGo extends Component {
  render() {
    return (
    <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title: "Home",
        component: Main,
    }} />
  );
  }
}

AppRegistry.registerComponent('BKKGo', () => BKKGo);
