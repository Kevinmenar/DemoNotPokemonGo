import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  Geolocation
} from "react-native";

import { Actions } from 'react-native-router-flux';

export default class App extends Component {
  state = {
    location: null,
    displayButton: false
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  componentDidMount = () => {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = JSON.stringify(position);
        console.log("CurrPosition is: " + location);
        console.log("position.coords.latitude is: " + position.coords.latitude);
        console.log("position.coords.longitude is: " + position.coords.longitude);
        let distance = this.calcCrow(9.859555, -83.910417,position.coords.latitude, position.coords.longitude)
        ToastAndroid.show('CurrPosition is: ' + location + ' Distance from: ' + distance, ToastAndroid.SHORT);
        console.log("distance is: " + distance);
        if (Math.floor( distance )<=100) {
          this.setState({ 
            location: location,
            displayButton: true
          });
        } else {
          this.setState({ 
            location: location,
            displayButton: false
           });
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

  }

  calcCrow = (lat1, lon1, lat2, lon2) =>
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d*1000;
    }

  toRad = (Value) => 
    {
        return Value * Math.PI / 180;
    }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  display = () => {
    if (this.state.displayButton) {
      return (
        <TouchableOpacity onPress={this.displayNotPokemon}>
          <Text style={styles.welcome}>Display the not Pokemon?</Text>
        </TouchableOpacity>
      );
    } else {
      console.log("")
      return null;
    }
  }

  displayNotPokemon = () => {
    Actions.viro();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
        {this.display()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});