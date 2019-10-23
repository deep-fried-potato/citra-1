import React from 'react';
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const welcomeNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
    SignUp: {
        screen: SignupScreen
    }

}) 

export default createAppContainer(welcomeNavigator);