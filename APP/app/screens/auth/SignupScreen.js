import React from 'react';
import {StyleSheet, Text, Button } from 'react-native'
import { Container, Header, Content, Form, Item, Input,Footer, Label} from 'native-base';

export default class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        email : '',
        password:'',
    }
  }

  // login = () => {
  //   fetch('http://172.18.0.1:3000/auth/residentLogin/', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type' : 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: this.state.email,
  //       password: this.state.password,
  //     }),
  //   })
  //   .then((response) => response.text())
  //   .then((resjson) => {
  //     console.log(resjson)
  //     return resjson
  //   })
  //   .catch(err => (console.log('Error', err)));
  // }

  render(){
  return(
      <Container>
        <Header />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
              <Button 
              style = {styles.btn} 
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
    // details -> signup -> validation  screen -> home 
  }
}

const styles = StyleSheet.create({
  btn:{
    textAlign : 'center',
    color: 'red',
  },
})