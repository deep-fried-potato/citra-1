import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    content:{flex:1, justifyContent:'center'},
    icon: {position: 'relative', marginTop: -16},
});

class Settings extends Component {
    static navigationOptions = {
        title:'Citra',
        drawerLabel:"settings",
        drawerIcon:({tintColor})=>(
            <Ionicon style={styles.icon} color="#fff" size={30} name="md-cog"/>
        )
    }
    render() {
        return (
            <View style={styles.content}>
                <Text>
                    Hello settings.....
                </Text>
            </View>
        );
    }
}

export default Settings;
