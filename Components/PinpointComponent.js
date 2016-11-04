import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class Pinpoint extends Component {
    constructor(props) {
        super(props);

        //Props contain
        //this.props.text
        this.state = {isDropAlpha: false}
    }

    render() {
        return (
            <Image
              style={{width:30, height:30}}
              source={require('./Assets/Images/PinButton_To.png')}
            />
        );
    }
}

var styles = StyleSheet.create({
    pinpoint: {
        height: 30,
        width: 30
    }
  });