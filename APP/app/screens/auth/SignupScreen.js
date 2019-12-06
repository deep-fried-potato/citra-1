import React, { Component } from "react";

import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableOpacity , TouchableWithoutFeedback, Alert, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { Button, Footer } from 'native-base';


export default class SignupScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: '',
        email : '',
        password:'',
        password2 : '',
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Citra</Text>
           <TextInput placeholder="Name" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             onChangeText = {text => this.setState({'name':text})}
             value = {this.state.name}
             />
            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             onChangeText = {text => this.setState({'email':text})}
             value = {this.state.email}
             />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              onChangeText = {text => this.setState({'password':text})}
              value = {this.state.password}
            />
            <TextInput placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
              onChangeText = {text => this.setState({'password2':text})}
              value = {this.state.password2}
            />
            <Button style={styles.loginButton} onPress={() => this._signUp()} >
              <Text>Register</Text>
            </Button>
            <TouchableOpacity style={styles.  fbLoginButton} onPress = {() => {this.props.navigation.navigate('loginscreen')}} >
                <Text style ={{color:"#3897f1"}}>Sign in here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  _signUp = () => { 
    if (this.state.password !== this.state.password2){
      alert(`Passwords don't match`);
      this.setState({'password':'', 'password2':''});
    }
    else{
      fetch('http://10.0.33.176:3000/auth/registerResident', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      }),
    })
    .then((response) => response.text())
    .then((resjson) => {
      console.log(resjson)
      return resjson
    })
    .catch(err => (console.log('Error', err)));
      alert('Verify your account. Check your inbox for more info');
      this.props.navigation.navigate('loginscreen');
    }
  }
}