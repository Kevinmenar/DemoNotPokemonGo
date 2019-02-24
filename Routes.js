import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import App from './App.js'
import Viro from './Viro.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "app" component = {App} hideNavBar={true} initial = {true} />
         <Scene key = "viro" component = {Viro} hideNavBar={true}/>
      </Scene>
   </Router>
)

export default Routes