'use strict';

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native'

class SearchTextInput extends Component {
  render () {

    return (
      <View style={styles.search_textinput_container}>
        <View style={styles.flowTextRight}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.props.location.name}
            onChange={this.props.onChange.bind(this)}
            onFocus={this.props.onFocus.bind(this, this.props.label)}
            placeholder={this.props.placeholder} />
          <AutoCompletedButton
            iconName='location-arrow'
            onPress={this.props.onButtonPressed.bind(this,
              {
                'action':'cl',
                'searchFor': this.props.label
              })} />
          <AutoCompletedButton
            iconName='globe'
            onPress={this.props.onButtonPressed.bind(this,
              {
                'action':'map',
                'searchFor': this.props.label
              })} />
        </View>
      </View>
    );
  }
}

export default class AutoCompletedButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor='#99d9f4'
        onPress={this.props.onPress}>
        <Icon
          name={this.props.iconName}
          size={25}
          color="#575758" />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  search_textinput_container: {
    alignItems: 'center',
    backgroundColor: '#82abdb',
  },
  flowRight: {
    padding: 4,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flowTextRight: {
    flex: 1,
    paddingBottom: 15,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  buttonText: {
    padding: 4,
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    color: '#FFFFFF',
    height: 36,
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 3,
    flex: 6,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#575758'
  }
});

module.exports = SearchTextInput;
