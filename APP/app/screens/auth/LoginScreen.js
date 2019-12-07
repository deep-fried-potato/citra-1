import React, {Component} from 'react';

import styles from './style';
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import {Button, Footer} from 'native-base';
import Config from 'react-native-config';
import axios from 'axios';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Citra</Text>
            <TextInput
              placeholder="Email"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
            />
            <Button
              style={styles.loginButton}
              onPress={() => this._signInAsync()}>
              <Text>Login</Text>
            </Button>
            <TouchableOpacity
              style={styles.fbLoginButton}
              onPress={() => {
                this.props.navigation.navigate('forgotauth');
              }}>
              <Text style={{color: '#3897f1'}}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fbLoginButton}
              onPress={() => {
                this.props.navigation.navigate('signupscreen');
              }}>
              <Text style={{color: '#3897f1'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    console.log('Clicked', Config.BASE_URL, Config.AWS_S3_FOLDER);
    fetch('http://' + Config.BASE_URL + ':3000/auth/residentLogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(async resjson => {
        console.log(resjson);
        if (resjson.token) {
          await AsyncStorage.setItem('userToken', resjson.token);
          console.log(this.state.email);
          await AsyncStorage.setItem('userId', this.state.email);
          this.props.navigation.navigate('App');
        } else {
          alert('Invalid Credentials');
        }
      })
      .catch(err => console.log('Error', err));
  };
}
