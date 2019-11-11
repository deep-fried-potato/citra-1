import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
// import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from "../screens/home/home";
import PostCreate from "../screens/postCreate";
import PostDetail from "../screens/postDetail";
import Search from "../screens/search/search";
import Notifications from "../screens/notifications";
import Sos from "../screens/sos";


const appNavigator = createStackNavigator({
    // Drawer:{screen:Drawer},
    Home: {screen: Home},
    Search: {screen: Search},
    PostCreate: {screen: PostCreate},
    PostDetail: {screen: PostDetail},
    Notifications: {screen: Notifications},
    Sos: {screen: Sos}
}, {
    defaultNavigationOptions: {
        header: null
    }
});

const AppContainer = createAppContainer(appNavigator);

export default AppContainer
