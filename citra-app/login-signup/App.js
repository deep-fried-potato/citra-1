import * as React from 'react';
import {TextInput, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer} from 'react-navigation'
import Login from './components/loginScreen';
import Profile from './components/Profile';


const Application = createStackNavigator({
  Home : {
    screen : Login,
  },
});
const Appcontainer = createAppContainer(Application)

export default class App extends React.Component {
  render(){
    return <Appcontainer />;
  }
}
