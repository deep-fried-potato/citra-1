import React, {Component} from 'react';
import {View, Text, Button, AsyncStorage} from 'react-native';
class Home extends Component {
    render() {
        return (
            <View>
                <Text>Home screen</Text>
                <Button title="Sign Out" onPress={this._signOutAsync} />
                <Button title= "View Posts" onPress = {this._viewfeed} />
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    _viewfeed = async () => {
        let token = await AsyncStorage.getItem('userToken');
        await this.props.navigation.navigate('feedscreen',{token: token});
    }
}

export default Home;
