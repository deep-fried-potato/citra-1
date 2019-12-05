import React from 'react';
import {StyleSheet, Text, Button } from 'react-native'
import { Container, Header, Content, Form, Item, Input,Footer, Label} from 'native-base';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        name: '',
        email : '',
        password:'',
        password2 : '',
    }
  }

  signup = () => {
    fetch('http://172.18.0.1:3000/auth/registerResident', {
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
  }

  render(){
  return(
      <Container>
        <Header />
        <Content>
          <Form>

          <Item floatingLabel>
              <Label>Name</Label>
              <Input 
              onChangeText = {text => this.setState({'name':text})}
              value = {this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
              onChangeText = {text => this.setState({'email':text})}
              value = {this.state.email}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
              onChangeText = {text => this.setState({'password':text})}
              value = {this.state.password}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input 
              onChangeText = {text => this.setState({'password2':text})}
              value = {this.state.password2}
              />
            </Item>
              <Button 
              // style = {styles.btn} 
              // onPress = {this.login}
              onPress={this._signUp}
              title = 'Register'
              />
          </Form>
        </Content>
        <Footer>
          <Text>Already have an Citra account</Text>
          <Button
            onPress = {() => {this.props.navigation.navigate('loginscreen')}} 
            title = "Login"
          />
        </Footer>
      </Container>
  )
  }
  _signUp = () => {
    
    if (this.state.password !== this.state.password2){
      alert(`Passwords don't match`);
      this.setState({'password':'', 'password2':''});
    }
    else{
    // redirect to login
    // validation via email
      console.log(this.state)
      this.signup();
      alert('Verify your account. Check your inbox for more info');
      this.props.navigation.navigate('loginscreen');
    }
  }
}