import * as React from 'react';
import {
    Text,  
    View,
    StyleSheet,
  } from 'react-native';
import Constants from 'expo-constants';

export default class Profile extends React.Component {
  render(){
    return(
      <View>
        <View style={styles.container}>
          <Text style={styles.text}> login </Text>
        </View>
      </View>
      
    );
  }

   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3'
  },
  text:{
    color: '#ffff'
  }
  })
