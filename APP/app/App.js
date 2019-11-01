import React from "react"
import { createAppContainer } from "react-navigation";
import { createStackNavigator} from 'react-navigation-stack';
import WelcomeScreen from "./screens/welcome"
import LoginScreen from "./screens/auth/LoginScreen"
import SignupScreen from "./screens/auth/SignupScreen"

const appNavigator = createStackNavigator({
    welcomescreen:{screen:WelcomeScreen},
    loginscreen: {screen: LoginScreen},
    signupscreen: {screen: SignupScreen},
},{
    headerMode : 'none'
})

export default createAppContainer(appNavigator);
// TODO-signup and home screens
