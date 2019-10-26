import React from "react"
import {Root} from "native-base";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screens/home";
import PostCreate from "./screens/postCreate"

const Drawer = createDrawerNavigator(
    {
        Home:{screen:Home},
        PostCreate:{screen: PostCreate},

    }
)
