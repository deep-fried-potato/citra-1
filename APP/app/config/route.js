import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feedscreen from '../screens/Post/feed'
import LoginScreen from "../screens/auth/LoginScreen"
import SignupScreen from "../screens/auth/SignupScreen"
import Authloadingscreen from "../screens/Authloading"
import ForgotauthScreen from "../screens/forgotauth"
import {FooterNavigator} from "../components/footer/index"
import PostDetail from '../screens/Post/postDetail';
import PostMedia from '../screens/Post/postMedia'
import PostComments from '../screens/Post/postComments';

const postDetailNavigator = createMaterialBottomTabNavigator({
    Details: {
        screen: PostDetail,
        navigationOptions:{
            tabBarIcon: ({focused}) =><Icon name="bars" size={20} color={'#DACE91'}/>,
        },
    },
    Media: {
        screen: PostMedia,
        navigationOptions:{
            tabBarIcon: ({focused}) =><Icon name="image" size={20} color={'#DACE91'}/>,
        },
    },
    Comments: {
        screen: PostComments,
        navigationOptions:{
            tabBarIcon: ({focused}) =><Icon name="comment" size={20} color={'#DACE91'}/>,
        },
    }   
},
{
    initialRouteName:'Details',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    shifting: false,
    labeled: true,
    barStyle: { backgroundColor: '#694fad' },
});

const appNavigator = createStackNavigator({
    FooterNavigator,
    postDetailNavigator,
    feedscreen: {screen: Feedscreen},
    // postscreen: {screen: Postscreen},
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
