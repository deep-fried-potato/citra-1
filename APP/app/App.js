import React from "react"
// import {Root} from "native-base";
import { createAppContainer } from "react-navigation";
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from "./screens/home";
// import PostCreate from "./screens/postCreate"

// const Drawer = createDrawerNavigator(
//     {
//         FirstScreen:{screen:Home},
//         // PostCreate:{screen:  PostCreate},
//     }
// )

const appNavigator = createStackNavigator({
    firstscreen:{screen:Home},
})

export default createAppContainer(appNavigator);