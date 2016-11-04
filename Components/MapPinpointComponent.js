import React, { Component } from 'react';
import { MapView, StyleSheet } from 'react-native';
import Pinpoint from './PinpointComponent.js';

export default class MapPinpoint extends Component {
    constructor(props) {
        super(props);
        this.state = {enableToPin: false, 
            enableFromPin: false,
            ToLocation: null,
            Fromlocation: null};
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                />
                <Pinpoint />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        height: 400,
        width: 350,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
    map: {
        height: 350,
        width: 350,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000',
    }
  });