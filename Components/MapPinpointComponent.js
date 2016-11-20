import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Pinpoint from './PinpointComponent.js';
import MapView from 'react-native-maps';

export default class MapPinpoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionStep: "to",
            ToLocation: null,
            Fromlocation: null
        };
    }

    onTouchConfirmButton() {
        var myState = deepCopy(this.state);
        if (this.state.selectionStep == "to") {
            myState.selectionStep = "from";
            this.setState(myState);
        }
    }

    render() {
        var pinpoint = undefined;
        if (this.state.selectionStep == "to") {
            pinpoint = <Pinpoint type = "to" size = "default" style={styles.pinpoint}/>
        }
        else if (this.state.selectionStep == "from") {
            pinpoint = <Pinpoint type = "from" size = "default" style={styles.pinpoint}/>
        }

        // var confirmButton = undefined;
        // if (this.state.selectionStep == "to" || this.state.selectionStep == "from") {
        //     confirmButton = <Button onPress={this.onTouchConfirmButton} title="OK" color="#841584" accessibilityLabel="Touch to confirm selection" />
        // }

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
                >
                    <MapView.Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    />
                </MapView>
                <View style={styles.pinpoint}>
                    {pinpoint}
                </View>
                <View style={styles.confirmButton}>
                    <Button
                        title="OK"
                        color="#841584"
                        accessibilityLabel="Touch to confirm selection"
                    />
                </View>
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
    },
    confirmButton: {
        position: 'absolute',
        height: 40,
        width: 40,
        margin: 2,
        borderWidth: 1,
        borderColor: '#000000',
        bottom: 20,
        right: 20,
    }
  });

  var marker = {
        latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        title: 'My Place',
        description: 'This is my place'
    };