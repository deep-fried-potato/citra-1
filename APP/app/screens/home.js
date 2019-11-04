import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
class Home extends Component {
    render() {
        return (
            <View>
                <Text>Home screen</Text>
                <Button title="Sign Out" onPress={this._signOutAsync} /> 
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
}

export default Home;
