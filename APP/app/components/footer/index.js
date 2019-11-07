import React, {Component} from "react";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";

import Home from "../../screens/home";
import Search from "../../screens/search/search";
import PostCreate from "../../screens/postCreate";
import Notifications from "../../screens/notifications";
import Sos from "../../screens/sos";

const FooterNavigator = createBottomTabNavigator({
    Home:{screen:Home},
    Search:{screen:Search},
    PostCreate:{screen:PostCreate},
    Notifications:{screen:Notifications},
    Sos:{screen:Sos}
},{
    tabBarOptions: {
        activeTintColor: 'blue',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'white',
        },
    }
})

const Footer = createAppContainer(FooterNavigator);

export default Footer;
