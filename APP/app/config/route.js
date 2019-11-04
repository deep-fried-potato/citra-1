import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
// import { createDrawerNavigator } from 'react-navigation-drawer';
import Feedscreen from '../screens/feed'
import Postscreen from '../screens/postDetail'

import LoginScreen from "../screens/auth/LoginScreen"
import SignupScreen from "../screens/auth/SignupScreen"
import Authloadingscreen from "../screens/Authloading"
import ForgotauthScreen from "../screens/forgotauth"
import {FooterNavigator} from "../components/footer/index"

const appNavigator = createStackNavigator({
    // Drawer:{screen:Drawer},
    FooterNavigator,
    feedscreen: {screen: Feedscreen},
    postscreen: {screen: Postscreen},
}, {
    defaultNavigationOptions: {
        header: null,
        initialRouteName: 'FooterNavigator',
    }
});

const authStack = createSwitchNavigator({
    loginscreen: {screen: LoginScreen},
    signupscreen: {screen: SignupScreen},
    forgotauth: {screen: ForgotauthScreen},
},{
    initialRouteName: 'loginscreen',
    headerMode : 'none'
})

const Appcontainer = createAppContainer(createSwitchNavigator({
    Authloading : Authloadingscreen,
    Auth: authStack,
    App : appNavigator,
},{
    initialRouteName: 'Authloading',
})
)

export default Appcontainer
