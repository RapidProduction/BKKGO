/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View
} from 'react-native';
import MapPinPoint from './Components/MapPinpointComponent.js';

export default class BKKGo extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'BKK Go!',
          component: require('./components/main')
        }}>
          <View style={styles.container}>
            <MapPinPoint />
          </View>
      </NavigatorIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('BKKGo', () => BKKGo);
