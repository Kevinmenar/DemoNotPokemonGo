/** @format */

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes.js';
import {name as appName} from './app.json';

class Scene extends Component {
   render() {
      return (
         <Routes />
      )
   }
}
export default Scene

AppRegistry.registerComponent(appName, () => Scene);
