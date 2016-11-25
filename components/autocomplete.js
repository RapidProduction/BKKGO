/* eslint no-console: 0 */
'use strict';

import React, { Component } from 'react'
import {
	ActivityIndicator,
	Image,
	ListView,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Main = require('./main.js');
const styles = require('../styles.js');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class AutoComplete extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			status: '',
			loading: false,
			dataSource: ds,
			initialPosition: null,
			lastPosition: null
		}
	}

	watchID: ?number = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({ initialPosition: position });
			},
			(error) => alert(JSON.stringify(error)),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.setState({ lastPosition: position });
		});
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	onTextChanged(event) {
		this.setState({ keyword: event.nativeEvent.text });
	}

	useCurrentLocation() {
		var coords = this._getCurrentLocation();
		console.log('Use current location', coords);
	}

	useLocationFromMap() {
		var coords = this._getCurrentLocation();
		console.log('Use location from map', coords);
	}

	_getCurrentLocation() {
		let currentPosition = this.state.lastPosition || this.state.initialPosition;
		let coords = currentPosition.coords || {};
		return { 'latitude': coords.latitude, 'longitude': coords.longitude };
	}

	_navigate(props) {
		this.props.navigator.push({
			title: 'BKK Go',
			component: Main,
			passProps: {}
		});
	}

	search() {
		// let stations = [];
		// for (let i = 0; i < 25;) {
		// 	stations.push({
		// 		id: 'BTS_' + ++i,
		// 		name: 'BTS Station' + i
		// 	});
		// }

		// this.setState({
		// 	loading: false,
		// 	dataSource: ds.cloneWithRows(stations)
		// });

		this.setState({ loading: true });

		var that = this;
		var body = {
			'type': 'calculate-routes',
			'params': {
				'from': {
					'type': 'latlong',
					'params': {
						'latitude': 13.817598,
						'longitude': 100.565264
					}
				},
				'to': {
					'type': 'latlong',
					'params': {
						'latitude': 13.719041,
						'longitude': 100.453405
					}
				},
				'options': {
					'mode': 'shortest-time'
				}
			}
		};

		var request = new Request('https://bkkgo-90783.appspot.com/getAllStations', {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		});

		fetch(request)
			.then((response) => response.json())
			.then((json) => {
				if (json && json['isSuccess']) {
					let stations = json['stations'];
					that.setState({
						loading: false,
						dataSource: ds.cloneWithRows(stations)
					});
				} else {
					that.setState({
						loading: false,
						status: 'Location not recognized; please try again.'
					});
				}
			})
			.catch((error) => {
				that.setState({
					loading: false,
					status: 'Location not recognized; please try again.'
				});
				console.error(error);
			});
	}

	rowPressed(id) {
		console.log(id + ' is selected' );
	}

	renderRow(rowData, sectionID, rowID, highlightRow) {
		return (
			<TouchableHighlight style={styles['list-item']} onPress={() => this.rowPressed(rowData.id)}
				underlayColor='#DDDDDD'>
				<View style={{ flexDirection: 'row', padding: 10}}>
					<Image style={styles.thumb}
						source={require('../assets/images/BTS_LOGO.png')} />
					<View style={{ alignSelf: 'stretch' }}>
						<Text style={styles.label}>{rowData.id}</Text>
						<Text style={styles.label}
							numberOfLines={1}>{rowData.name}</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		let spinner = this.state.loading ? (<ActivityIndicator size='large'/>) : (<View/>);
		return (
			<View style={[styles.container, styles['autocomplete-panel']]}>
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						value={this.state.keyword}
						autoCapitalize='words'
						autoFocus={true}
						placeholder={'Type to search ' + this.props.stateName.toUpperCase() + ' location ...'}
						returnKeyType='search'
						onChange={() => this.onTextChanged()}/>
					<TouchableOpacity style={styles.button}
						underlayColor='#99d9f4'
						onPress={() => this.search()}>
						<Icon name='search' style={styles.icon} size={15} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.button} underlayColor='#99d9f4'
					onPress={() => this.useCurrentLocation()}>
					<Icon name='map-marker' style={styles['button-icon']} size={15} />
					<Text style={styles['button-label']}>Current Location</Text>
				</TouchableOpacity>
				<View style={styles.row}></View>
				<TouchableOpacity style={styles.button} underlayColor='#99d9f4'
					onPress={() => this.useLocationFromMap()}>
					<Icon name='map-o' style={styles['button-icon']} size={15} />
					<Text style={styles['button-label']}>Search via Map</Text>
				</TouchableOpacity>
				{spinner}
				<Text style={styles.label}>{this.state.status}</Text>
				<ListView style={{ alignSelf: 'stretch' }}
					automaticallyAdjustContentInsets={false}
					scrollEnabled={true}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}/>
			</View>
		);
	}
}

module.exports = AutoComplete;
