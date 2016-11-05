import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

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
                style={{width:40, height:40}}
                source={require('../Assets/Images/PinButton_To.png')}
            />
        );
    }
}