'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	TouchableOpacity,
	ActivityIndicator,
	Image
} from 'react-native';

const _ = require('lodash')
const SearchTextInput = require('./search-text-input');
const AutoComplete = require('./autocomplete');
const styles = require('../styles.js');

class SearchPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"from": {
				"id": "",
				"name": "",
				"params": {
					"lat": "",
					"lng": ""
				}
			},
			"to": {
				"id": "",
				"name": "",
				"params": {
					"lat": "",
					"lng": ""
				}
			},
			isLoading: false,
		};
	}

	onSourceChanged(e) {
		let nextState = _.cloneDeep(this.state.from);
		nextState.name = e.nativeEvent.text;
		this.setState({
			from: nextState
		});
	}

	onTargetChanged(e) {
		let nextState = _.cloneDeep(this.state.to);
		nextState.name = e.nativeEvent.text;
		this.setState({
			to: nextState
		});
	}

	onSearchTextInputFocus(stateName) {
		if (!stateName) {
			return;
		}
		this.props.navigator.push({
			title: 'Search location',
			component: AutoComplete,
			passProps: { 'stateName': stateName }
		});
	}

	onTargetFocus() {

	}

	onButtonPressed(searchInfo) {
		if (!searchInfo || !searchInfo.action || !searchInfo.searchFor) {
			return;
		}

		console.log('1. Get current location');
		console.log('2. Set state for name');

		let stateName = searchInfo.searchFor.toLowerCase();
		let state = this.state[stateName];
		if (state) {
			let nextState = _.cloneDeep(state);
			nextState.name = (searchInfo.action === 'cl') ? 'Current Location' : 'From Map';
			//	nextState.params.lat = cl.lat;
			//	nextState.params.lng = cl.lng;
			let stateObj = {};
			stateObj[stateName] = nextState;
			this.setState(stateObj);
		}

		if (searchInfo.action === 'map') {
			console.log('3. Popup From/To button to the map');
		}
	}

	onSearchPressed() {
		console.log('Search for that state');
	}

	render() {
		return (
			<View style={styles['search-panel']}>
				<SearchTextInput
					label='From'
					location={this.state.from}
					onChange={this.onSourceChanged.bind(this)}
					onFocus={this.onSearchTextInputFocus.bind(this)}
					onButtonPressed={this.onButtonPressed.bind(this)}
					placeholder='Choose your source...'/>

				<SearchTextInput
					label='To'
					location={this.state.to}
					onChange={this.onTargetChanged.bind(this)}
					onFocus={this.onSearchTextInputFocus.bind(this)}
					onButtonPressed={this.onButtonPressed.bind(this)}
					placeholder='Choose your destination...'/>

				<TouchableOpacity style={styles['search-panel-big-button']} underlayColor='#99d9f4'
					onPress={this.onSearchPressed}>
					<Text style={styles['button-label']}>Route now!</Text>
				</TouchableOpacity>

			 </View>
		);
	}
}

module.exports = SearchPanel;
