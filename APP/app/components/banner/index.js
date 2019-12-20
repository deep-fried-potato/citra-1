  import React, {Component} from 'react';
  import {StyleSheet, TouchableOpacity, Text, AsyncStorage} from 'react-native';
  import {Header, Icon, Left, Right, Body, Thumbnail} from 'native-base';
  
  const styles = StyleSheet.create({
    banner: {backgroundColor: 'white'},
    bannerText: {color: 'blue', fontSize: 24, fontWeight: 'bold'},
  });

  class Banner extends Component {

    constructor(props){
      super(props)
    }

    render() {
      const uri =
        'https://facebook.github.io/react-native/docs/assets/favicon.png';

      return (
        <Header style={styles.banner}>
          <Left>
            <TouchableOpacity onPress={this.props._toggledrawer}>
            <Icon name='menu' />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={styles.bannerText}>Citra</Text>
          </Body>
          <Right></Right>
        </Header>
      );
    }
  }

  export default Banner;
