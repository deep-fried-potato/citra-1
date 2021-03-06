import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    content:{flex:1, justifyContent:'center'},
    icon: {position: 'relative', marginTop: -16},
});

class Bookmarks extends Component {
    static navigationOptions = {
        title:'Citra',
        drawerLabel:"bookmarks",
        drawerIcon:({tintColor})=>(
            <Ionicon style={styles.icon} color="#fff" size={30} name="md-bookmark"></Ionicon>
        )
    }
    render() {
        return (
            <View style={styles.content}>
                <Text>
                    Hello bookmarks.....
                </Text>
            </View>
        );
    }
}

export default Bookmarks;
