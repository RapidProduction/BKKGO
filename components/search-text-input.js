'use strict';

import React, { Component } from 'react'
import {
	Text,
	TextInput,
	View,
	TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = require('../styles.js');

class SearchTextInput extends Component {
	render () {
		return (
			<View>
				<View style={styles.row}>
					<Text style={styles['search-panel-label']}>{this.props.label}</Text>
				</View>
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						value={this.props.location.name}
						onChange={this.props.onChange.bind(this)}
						onFocus={this.props.onFocus.bind(this, this.props.label)}
						placeholder={this.props.placeholder} />
					<GlyphButton
						iconName='location-arrow'
						onPress={this.props.onButtonPressed.bind(this, {
								'action':'cl',
								'searchFor': this.props.label
							})} />
					<GlyphButton
						iconName='globe'
						onPress={this.props.onButtonPressed.bind(this, {
								'action':'map',
								'searchFor': this.props.label
							})} />
				</View>
			</View>
		);
	}
}

export default class GlyphButton extends Component {
	render() {
		return (
			<TouchableOpacity style={styles['search-panel-button']}
				underlayColor='#99d9f4'
				onPress={this.props.onPress}>
				<Icon color="#575758" name={this.props.iconName} style={styles.icon} size={15} />
			</TouchableOpacity>
		);
	}
}

module.exports = SearchTextInput;
