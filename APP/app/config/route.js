import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feedscreen from '../screens/Post/feedpost/feed'
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import Authloadingscreen from '../screens/Authloading';
import ForgotauthScreen from '../screens/auth/forgotauth';
import {FooterNavigator} from '../components/footer/index';
import PostDetail from '../screens/Post/detail/index';
import PostMedia from '../screens/Post/detail/postMedia';
import PostComments from '../screens/Post/detail/postMedia';
import Profile from '../screens/profile/editProfile';
import DrawerScreen  from '../screens/drawer'
import sosinfoscreen from '../screens/SOSinfo';

import { createDrawerNavigator } from 'react-navigation-drawer';

const postDetailNavigator = createMaterialBottomTabNavigator(
  {
    Details: {
      screen: PostDetail,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon name="bars" size={20} color={'#DACE91'} />
        ),
      },
    },
    Media: {
      screen: PostMedia,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon name="image" size={20} color={'#DACE91'} />
        ),
      },
    },
    Comments: {
      screen: PostComments,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon name="comment" size={20} color={'#DACE91'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Details',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    shifting: false,
    labeled: true,
    barStyle: {backgroundColor: '#694fad'},
  },
);

const appNavigator = createStackNavigator(
  {
    feedscreen: {
      screen: Feedscreen,
    },
    SOSinfo: {  
      screen: sosinfoscreen,
    },
    FooterNavigator,
    postDetailNavigator,
  },
  {
      headerMode: 'none',
      initialRouteName: 'FooterNavigator',
    },
);

const authStack = createSwitchNavigator(
  {
    loginscreen: {screen: LoginScreen},
    signupscreen: {screen: SignupScreen},
    forgotauth: {screen: ForgotauthScreen},
  },
  {
    initialRouteName: 'loginscreen',
    headerMode: 'none',
  },
);

const appDrawer = createDrawerNavigator({
  Home: {
    screen: appNavigator,
  },
  Profile: {
    screen: Profile,
  },
  
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300
})

const Appcontainer = createAppContainer(
  createSwitchNavigator(
    {
      App: {
        screen: appDrawer,
      },
      Authloading: Authloadingscreen,
      Auth: authStack,
    },
    {
      initialRouteName: 'Authloading',
    },
  ),
  // appNavigator
);

const prefix = 'http://'
const MainApp = () => <Appcontainer uriPrefix={prefix} />

export default MainApp;
