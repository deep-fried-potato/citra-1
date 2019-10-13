import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        name:'',
        email : '',
        password:'',
    }
  }
  
  signup = () => {
    fetch('http://172.18.0.1:3000/auth/registerResident/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then((response) => response.text())
    .then((resjson) => {
      console.log(resjson)
      return resjson
    })
    .catch(err => (console.log('Error', err)));
  }

  render(){
  return(
    <View >
        <Text style={styles.header}>Login</Text>
        <TextInput 
          placeholder= 'Name'
          onChangeText = {(name) => this.setState({name})}
          value = {this.state.name}
        />
        <TextInput 
          placeholder= 'Email'
          onChangeText = {(email) => this.setState({email})}
          value = {this.state.email}
        />
        <TextInput 
          placeholder= 'Password'
          onChangeText = {(password) => this.setState({password})}
          value = {this.state.password}
          secureTextEntry = {true}
        />
        <Button 
          title = 'Signup'
          onPress = {this.signup}
        />
    </View>
  )
  }
}

const styles = StyleSheet.create({
    header:{
     textAlign: 'center',   
    }
});