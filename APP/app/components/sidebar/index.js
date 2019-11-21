import React from "react"
import sidebarContent from "./sidebarContent";
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from "react-navigation-drawer";

import Activity from "../../screens/profile/activity";
import Bookmarks from "../../screens/profile/bookmarks";
import PostList from "../../screens/profile/postList";
import Settings from "../../screens/profile/settings";
import EditProfile from "../../screens/profile/editProfile";

const drawer = createDrawerNavigator({
    Activity:{screen:Activity},
    Bookmarks:{screen:Bookmarks},
    Posts:{screen:PostList},
    Settings:{screen:Settings},
    Edit:{screen:EditProfile}
},{
    // initialRouteName:'Activity',
    contentComponent:sidebarContent,
    contentOptions:{
        activeTintColor: '#000000',
        activeBackgroundColor: '#e6e6e6',
    }
});

const Sidebar = createAppContainer(drawer);
export default Sidebar
