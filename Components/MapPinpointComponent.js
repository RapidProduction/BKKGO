import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from 'react-native-button';
import Pinpoint from './PinpointComponent.js';
import MapView from 'react-native-maps';

let pinImages = {
    to:  require('../assets/images/TO_PIN_01.png'),
    from: require('../assets/images/FROM_PIN_01.png')
}

export default class MapPinpoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionStep: "from",
            FromLocation: undefined,
            ToLocation: undefined
        };
    }

    onTouchConfirmButton() {
        var myState = this.state;
        if (this.state.selectionStep == "from") {
            myState.selectionStep = "to";
            this.setState(myState);
            console.log("set from location at " + this.state.FromLocation.latitude + "  " + this.state.FromLocation.longitude);
        }
        else if (this.state.selectionStep == "to") {
            myState.selectionStep = "plotting";
            this.setState(myState);
        }
    }

    onDragComplete(region) {
        if (this.state != undefined) {
            if (this.state.selectionStep == "from") {
                this.state.FromLocation = region;
            }
            else if (this.state.selectionStep == "to") {
                this.state.ToLocation = region;
            }
        }
    }

    createMarker(title, location, style, imageSrc) {
        return <MapView.Marker 
                coordinate={location}
                title={title}>
                <Image
                    style={style}
                    source={imageSrc}
                />
            </MapView.Marker>;
    }

    createSelecterPin(type, size, style) {
        return <Pinpoint type = {type} size = {size} style={style}/>;
    }

    createDirectionLine() {
        return <MapView.Polyline 
                coordinates={[
                    this.state.FromLocation,
                    this.state.ToLocation
                ]}
                strokeColor={"#02f26e"}
                strokeWidth={2}
            />;
    }

    render() {
        var selectorPin = undefined;
        var plotline = undefined;
        if (this.state.selectionStep == "to") {
            selectorPin = this.createSelecterPin("to", "default", styles.selectorPin);
        }
        else if (this.state.selectionStep == "from") {
            selectorPin = this.createSelecterPin("from", "default", styles.selectorPin);
        }
        else if (this.state.selectionStep == "plotting") {
            plotline = this.createDirectionLine();
        }

        var confirmButton = undefined;
        if (this.state.selectionStep == "to" || this.state.selectionStep == "from") {
            confirmButton = <Button 
                        style={styles.confirmButton}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.onTouchConfirmButton()}>
                        OK
                    </Button>
        }

        var toMarker = undefined;
        var fromMarker = undefined;
        if (this.state.FromLocation != undefined) {
            fromMarker = this.createMarker("From here", this.state.FromLocation, styles.pinPoint, pinImages.from);
        }

        if (this.state.ToLocation != undefined) {
            toMarker = this.createMarker("To here", this.state.ToLocation, styles.pinPoint, pinImages.to);
        }

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0400,
                        longitudeDelta: 0.0400,
                    }}
                    onRegionChangeComplete={this.onDragComplete.bind(this)}
                    rotateEnabled={true}>
                    {fromMarker}
                    {toMarker}
                    {plotline}
                </MapView>

                <View style={styles.selectorPin}>
                    {selectorPin}
                </View>

                <View style={styles.confirmButtonView}>
                    {confirmButton}
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
    selectorPin: {
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
    confirmButtonView: {
        position: 'absolute',
        height: 40,
        width: 40,
        margin: 2,
        bottom: 20,
        right: 20,
    },
    confirmButton: {
        fontSize: 25,
        color: 'white',
        backgroundColor: 'green'
    },
    pinPoint: {
        height: 40,
        width: 40,
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