import React from 'react';
import WelcomeScreen from './Components/WelcomeScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Home: {
    screen : WelcomeScreen,
  },
})

export default createAppContainer(AppNavigator);