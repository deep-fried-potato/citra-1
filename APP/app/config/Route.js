import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Home from "./screens/home";
import PostCreate from "./screens/postCreate";
import PostDetail from "./screens/postDetail";
import Search from "./screens/search";
import Notifications from "./screens/notifications";
import Sos from "./screens/sos"

const appNavigator = createStackNavigator({
    Home: {screen: Home},
    Search: {screen: Search},
    PostCreate: {screen: PostCreate},
    PostDetail: {screen: PostDetail},
    Notifications: {screen: Notifications},
    Sos:{screen:Sos}
});

const AppContainer = createAppContainer(appNavigator);

export default AppContainer
