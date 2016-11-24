'use strict';

import React, { Component } from 'react'
import { View } from 'react-native';

const SearchPanel = require('./search-panel');
const styles = require('../styles.js');

class Main extends Component {
	render() {
		return (
			<View style={styles.container}>
				<SearchPanel navigator={this.props.navigator}>
				</SearchPanel>
			</View>
		);
	}
}

module.exports = Main;