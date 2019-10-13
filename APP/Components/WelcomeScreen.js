import React from 'react';
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


export default class WelcomeScreen extends React.Component{
    render(){
        return(
            <View>
                <LoginScreen />
                <SignupScreen />
            </View>
        )
    }
} 