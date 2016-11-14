import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Pinpoint from './PinpointComponent.js';
import MapView from 'react-native-maps';

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
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinpoint: {
        position: 'absolute',
        top: 180,
        left: 150,
    },
    map: {
        height: 320,
        width: 340,
        margin: 5,
        borderWidth: 1,
        borderColor: '#000000',
        flex: 1,
    }
  });