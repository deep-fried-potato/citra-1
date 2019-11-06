import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
import { Input, Card, CardItem }from 'native-base';
class forgotauth extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
        }
      }
    render() {
        return (
            <View>
                <Text>Email</Text>
                <Card>
                    <CardItem>
                        <Input 
                            onChangeText = {text => this.setState({'email':text})}
                            value = {this.state.email}
                        />
                    </CardItem>
                </Card>
                <Button title="Send Confirmation" onPress={this._sendOTPAsync} /> 
            </View>
        );
    }

    _sendOTPAsync = async () => {
        // check otp
        alert('Check your inbox for more info');
        this.props.navigation.navigate('loginscreen');
    }
}

export default forgotauth;
