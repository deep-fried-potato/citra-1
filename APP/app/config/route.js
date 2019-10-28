import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import Home from "../screens/home";
import PostCreate from "../screens/postCreate";
import PostDetail from "../screens/postDetail";
import Search from "../screens/search";
import Notifications from "../screens/notifications";
import Sos from "../screens/sos";
import UserSettings from "../screens/profile/settings";
import UserPosts from "../screens/profile/postList";
import UserBookmarks from "../screens/profile/bookmarks";
import UserActivity from "../screens/profile/activity";
import UserEditProfile from "../screens/profile/editProfile";

const Drawer = createDrawerNavigator({
    UserBookmarks: {screen: UserBookmarks},
    UserPosts:{screen:UserPosts},
    UserSettings:{screen:UserSettings},
    UserActivity:{screen:UserActivity},
    UserEditProfile:{screen:UserEditProfile}
});

const appNavigator = createStackNavigator({
    Drawer:{screen:Drawer},
    Home: {screen: Home},
    Search: {screen: Search},
    PostCreate: {screen: PostCreate},
    PostDetail: {screen: PostDetail},
    Notifications: {screen: Notifications},
    Sos: {screen: Sos}
});

const AppContainer = createAppContainer(appNavigator);

export default AppContainer
