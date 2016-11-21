import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

let pinImages = {
    to:  require('../Assets/Images/TO_02.png'),
    from: require('../Assets/Images/FROM_02.png')
}

let pinSize = {
    small: 30,
    default: 40,
    large:  50
}

export default class Pinpoint extends Component {
    constructor(props) {
        super(props);
        this.state = {isDropAlpha: false}
    }

    ToggleVisibility() {
        this.state.isDropAlpha = true;
    }

    render() {
        var imageSource = pinImages.to;
        if (this.props.type == "to") {
            imageSource = pinImages.to;
        }
        else if (this.props.type == "from") {
            imageSource = pinImages.from;
        }

        var imageSize = pinSize.default;
        if (this.props.size == "small") {
            imageSize = pinSize.small;
        }
        else if (this.props.size == "large") {
            imageSize = pinSize.large;
        }

        return (
            <Image
                style={{width:imageSize, height:imageSize}}
                source={imageSource}
            />
        );
    }
}