import React from 'react';
import {StyleSheet, Text, Button, AsyncStorage } from 'react-native'
import { Container, Header, Content, Form, Item, Input,Footer, Label, Card,CardItem} from 'native-base';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        email : '',
        password:'',
    }
  }

  render(){
  return(
      <Container>
        <Header />
        <Content>
          <Form>
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
              secureTextEntry={true}
              />
            </Item>
              <Button 
              // onPress = {this.login}
              onPress = {this._signInAsync}
              // onPress = {() => window.alert(this.state.password)}
              title = 'Sign In'
              />
          </Form>
          <Card>
            <CardItem>
              <Button 
                title='forgot Password?'
                onPress={ () => {this.props.navigation.navigate('forgotauth')} }
              />
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <Text>Don't have a Citra account?</Text>
          <Button
            onPress = {() => {this.props.navigation.navigate('signupscreen')}} 
            title = "Reigister"
          />
        </Footer>
      </Container>
    )
  }

  _signInAsync = async () => {
    console.log('Clicked')
    fetch('http://172.18.0.1:3000/auth/residentLogin', {
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
    .then(async (resjson) => {
      console.log(resjson)
      if (resjson.token){
        await AsyncStorage.setItem('userToken', resjson.token);
        this.props.navigation.navigate('App')
      }
      else{
        alert('Invalid Credentials');
      }
    })
    .catch(err => (console.log('Error', err)));
  }
}