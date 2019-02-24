
import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  ViroARSceneNavigator,
} from 'react-viro';

var apiKey = "B32EDED1-6F96-4F38-A1FB-88240FD0B9E8";


var arScenes = require('./js/HelloWorldSceneAR.js');

var showARScene = true;

export default class Viro extends Component {
  render() {

      return (
        <ViroARSceneNavigator
          initialScene={{ scene: arScenes }}
          apiKey={apiKey} />
        );
  }
};

module.exports = Viro;