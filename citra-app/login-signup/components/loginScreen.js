import * as React from 'react';
import {
    TextInput,
    Text,  
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
    Button,
  } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer} from 'react-navigation'
import Constants from 'expo-constants';

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  
  componentDidMount() {
    this._loadInitialState();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value != null) {
      this.props.navigation.navigate('Profile');
    }
  }

  render(){
    return(
      <View>
      <KeyboardAvoidingView behavior='padding' style= {styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}> login </Text>
          <TextInput 
             style={styles.textInput} placeholder = 'Username'
             onChangeText= {(username) => this.setState({username})}
             underlineColorAndroid = 'transparent'
          />

          <TextInput 
             style={styles.textInput} placeholder = 'Password'
             onChangeText= {(password) => this.setState({password})}
             underlineColorAndroid = 'transparent'
             secureTextEntry={true}
          />
          <Button onPress ={this.login} style={styles.btn} title="LogIn"/>
        </View>
      </KeyboardAvoidingView>
      </View>
      
    );
  }

  login = () => {
    alert(this.state.username)
    fetch('http://51.83.3.220:3000/users' ,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })

    .then((response) => response.json())
    .then((res) => {
      if(res.success === true){
        AsyncStorage.setItem('user', res.user);
        this.props.navigation.navigate('Profile');
      }
      else{
        alert(res.message);
      }
    })
    .done()
  } 
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2896d3',
      paddingLeft: 40,
      paddingRight: 40,
    },
    header: {
      fontSize: 24,
      marginBottom: 60,
      color: '#aaaa',
      fontWeight: 'bold',
    },
    textInput: {
      alignSelf: 'stretch',
      padding: 15,
      marginBottom: 28,
      backgroundColor: '#ffff',
    },
    btn: {
      alignSelf: 'stretch',
      backgroundColor: '#ffff',
      padding: 20,
      alignItems: 'center',
    },
  })
