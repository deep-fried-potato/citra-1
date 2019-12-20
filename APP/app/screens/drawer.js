import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, AsyncStorage} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import {Button,Container,Content,List,ListItem, Header, Left, Body} from 'native-base'
// import styles from '../../styles/index';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render () {
    return (
      <Container>
        <Header style={{backgroundColor:'#3897f1'}} >
            <Body>
            {/* <Text style={{fontSize: 20, fontWeight: "800", marginTop: 30, marginBottom: 30, textAlign: 'center'}}> Hello {this.props.userName}! </Text> */}
            </Body>
          </Header>
        <Content>
          <List>
            <ListItem>
            <Text onPress={this.navigateToScreen('Profile')}>
                Profile
              </Text>
            </ListItem>

            <ListItem>
            <Text onPress={this.navigateToScreen('Home')}>
               Home
              </Text>
            </ListItem>
            <ListItem>
            <Button transparent onPress={this._signOutAsync}>
              <Text>Log Out</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;