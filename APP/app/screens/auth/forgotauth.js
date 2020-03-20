import React, {Component} from 'react';
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';import { Input, Card, CardItem }from 'native-base';
import { Button } from 'native-base';


class Forgotauth extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
        }
      }
    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Citra</Text>
            <TextInput placeholder="Enter Registered Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
             onChangeText = {text => this.setState({'email':text})}
             value = {this.state.email}
             />
             <Button style={styles.loginButton} onPress={() => this._sendOTPAsync()} >
              <Text>Submit</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
        );
    }

    _sendOTPAsync = async () => {
        alert('Check your inbox for more info');
        this.props.navigation.navigate('loginscreen');
    }
}

export default Forgotauth;
