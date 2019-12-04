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
<<<<<<< HEAD
    _viewfeed = async () => {
        let token = await AsyncStorage.getItem('userToken');
        await this.props.navigation.navigate('feedscreen',{token: token});
=======
    _viewfeed = () => {
        this.props.navigation.navigate('feedscreen');
>>>>>>> fetching feed
    }
}

export default Home;
