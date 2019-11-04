import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./screens/auth/LoginScreen"
import SignupScreen from "./screens/auth/SignupScreen"
import Authloadingscreen from "./screens/Authloading"
import Homescreen from './screens/home'

const appStack = createStackNavigator({
    homescreen : {screen: Homescreen}
},{
    headerMode : 'none'
})


const authStack = createSwitchNavigator({
    loginscreen: {screen: LoginScreen},
    signupscreen: {screen: SignupScreen},
},{
    initialRouteName: 'loginscreen',
    headerMode : 'none'
})

export default createAppContainer(createSwitchNavigator({
    Authloading : Authloadingscreen,
    Auth: authStack,
    App : appStack,
},{
    initialRouteName: 'Authloading',
}
));
