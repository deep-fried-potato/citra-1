import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,  
} from 'react-native';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        email : '',
        password:'',
    }
  }
  
  login = () => {
    fetch('http://localhost:2000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })

    .then((response) => response.json())
    .then((resjson) => {
      return resjson.loggedin
    })
    .catch(err => (console.log(err)));
  }

  render(){
  return(
    <View >
        <Text style={styles.header}>Login</Text>
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
          title = 'Login'
          onPress = {this.login}
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