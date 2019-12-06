import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TabBarComponent from './footer';
import Icon from 'react-native-vector-icons/Feather';
import Home from '../../screens/home/';
import Search from '../../screens/search/search';
import PostCreate from '../../screens/postCreate/';
import Notifications from '../../screens/notifications';
import Sos from '../../screens/sos';
import Feedscreen from '../../screens/Post/feed';
import {Body, Header, Left, Right, Thumbnail, Button, Text} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  banner: {backgroundColor: 'white'},
  btn: {backgroundColor: 'blue'},
});

const icon = (iconName, color) => (
  <Icon color={color} size={30} name={iconName}></Icon>
);

const postModalStack = createStackNavigator(
  {
    PostCreate: {
      screen: PostCreate,
      navigationOptions: {
        header: (
          <Header style={styles.banner}>
            <Left>
              {/*<Icon color="#000" size={20} name="arrow-left"></Icon>*/}
            </Left>
            <Body />
            <Right>
              <Button onPress style={styles.btn} rounded small>
                <Text>Post</Text>
              </Button>
            </Right>
          </Header>
        ),
        // headerLeft:({goBack})=>({
        //     left:(<Icon onPress={ () => { goBack() } } color="#000" size={20} name="arrow-left"></Icon>)
        // })
      },
    },
  },
  {
    mode: 'modal',
  },
);

export const FooterNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => icon('home', tintColor),
      },
    },
    Feed: {
      screen: Feedscreen,
      navigationOptions: {
        tabBarLabel: 'Feed',
        tabBarIcon: ({tintColor}) => icon('search', tintColor),
      },
    },
    PostCreate: {
      screen: PostCreate,
      navigationOptions: {
        tabBarLabel: 'Post',
        tabBarIcon: ({tintColor}) => icon('edit', tintColor),
      },
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({tintColor}) => icon('bell', tintColor),
      },
    },
    Sos: {
      screen: Sos,
      navigationOptions: {
        tabBarLabel: 'SOS',
        tabBarIcon: ({tintColor}) => icon('alert-triangle', tintColor),
      },
    },
  },
  {
    tabBarComponent: TabBarComponent,
    tabBarOptions: {
      activeTintColor: 'blue',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        flex: null,
        paddingTop: 5,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    },
  },
);

// const Footer = createAppContainer(FooterNavigator);

// export default Footer;
