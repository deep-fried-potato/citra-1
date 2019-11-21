import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
// import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from "../screens/home/home";
import PostDetail from "../screens/postDetail";
import Search from "../screens/search/search";
import Notifications from "../screens/notifications";
import Sos from "../screens/sos";

import Feedscreen from './screens/feed'
import Postscreen from './screens/postDetail'

import LoginScreen from "./screens/auth/LoginScreen"
import SignupScreen from "./screens/auth/SignupScreen"
import Authloadingscreen from "./screens/Authloading"
import ForgotauthScreen from "./screens/forgotauth"

const appNavigator = createStackNavigator({
    // Drawer:{screen:Drawer},
    feedscreen: {screen: Feedscreen},
    postscreen: {screen: Postscreen},
    Home: {screen: Home},
    Search: {screen: Search},
    // PostCreate: {screen: PostCreate},
    PostDetail: {screen: PostDetail},
    Notifications: {screen: Notifications},
    Sos: {screen: Sos}
}, {
    defaultNavigationOptions: {
        header: null
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


export default createAppContainer(createSwitchNavigator({
    Authloading : Authloadingscreen,
    Auth: authStack,
    App : appNavigator,
},{
    initialRouteName: 'Authloading',
}
)
