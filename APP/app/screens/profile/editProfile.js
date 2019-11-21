import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    content:{flex:1, justifyContent:'center'}
})

class EditProfile extends Component {
    static navigationOptions = {
        title:'editProfile',
        drawerLabel:"editProfile",
    }
    render() {
        return (
            <View style={styles.content}>
                <Text>
                    Hello edit profile.....
                </Text>
            </View>
        );
    }
}

export default EditProfile;
