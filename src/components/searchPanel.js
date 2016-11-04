'use strict';

import React, { Component } from 'react';
import SearchTextInput from './searchTextInput';
import {
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableHighlight,
 ActivityIndicator,
 Image
} from 'react-native';

const _ = require('lodash')

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
     console.log(stateName + ': Navigate to auto-complete page');
   }

   onTargetFocus() {

   }

   onButtonPressed(searchInfo){
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
      //  nextState.params.lat = cl.lat;
      //  nextState.params.lng = cl.lng;
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

   render () {
     return (
       <View style={styles.search_panel_container}>
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

        <TouchableHighlight style={styles.btn}
          underlayColor='#99d9f4'
          onPress={this.onSearchPressed}>
          <Text style={styles.btnText}>Route now!</Text>
        </TouchableHighlight>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  search_panel_container: {
    padding: 25,
    marginTop: 65,
    backgroundColor: '#82abdb',
  },
  flowRight: {
    padding: 4,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flowTextRight: {
    flex: 1,
    fontSize: 18,
    paddingBottom: 15,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 3,
    flex: 6,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#575758'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    color: '#FFFFFF',
    height: 36,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  btn: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = SearchPanel;
