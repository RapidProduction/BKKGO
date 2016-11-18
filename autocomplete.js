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
let styles = require('./styles.js');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class autocomplete extends Component {

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

	_navigate(title, component, props) {
		// this.props.navigator.push({
		// 	title: '',
		// 	component: ,
		// 	passProps: {}
		// });
	}

	search() {
		let stations = [ // mock data for testing
			{
				id: 'BTS_1',
				name: 'BTS Station 1'
			},
			{
				id: 'BTS_2',
				name: 'BTS Station 2'
			},
			{
				id: 'BTS_3',
				name: 'BTS Station 3'
			},
			{
				id: 'BTS_4',
				name: 'BTS Station 4'
			},
			{
				id: 'BTS_5',
				name: 'BTS Station 5'
			}
		];
		this.setState({
			loading: false,
			dataSource: ds.cloneWithRows(stations)
		});

		/*
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

		var request = new Request('https://bkkgo-90783.appspot.com/getRoute', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(body)
		});

		fetch(request)
			.then((response) => response.json())
			.then((json) => {
				if (json && json['isSuccess']) {
					let stations = json['routes'][0]['items'][1]['stations'];
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
		*/
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
						source={require('./assets/images/MRT_LOGO.png')} />
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
			<View style={styles.container}>
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						value={this.state.keyword}
						autoCapitalize='words'
						autoFocus={true}
						placeholder='Type to search START location ...'
						returnKeyType='search'
						onChange={this.onTextChanged.bind(this)}/>
					<TouchableOpacity style={styles.button}
						underlayColor='#99d9f4'
						onPress={this.search.bind(this)}>
						<Icon name='search' style={styles.icon} size={15} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.button} underlayColor='#99d9f4'
					onPress={() => this.useCurrentLocation()}>
					<Icon name='map-marker' style={styles['button-icon']} size={15} />
					<Text style={styles['button-label']}>Current Location</Text>
				</TouchableOpacity>
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

module.exports = autocomplete;
