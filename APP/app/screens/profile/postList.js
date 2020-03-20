import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    content:{flex:1, justifyContent:'center'},
    icon: {position: 'relative', marginTop: -16},
});

class PostList extends Component {
    static navigationOptions = {
        title:'Citra',
        drawerLabel:"postList",
        drawerIcon:({tintColor})=>(
            <Ionicon style={styles.icon} color="#fff" size={30} name="md-list-box"/>
        )
    }
    render() {
        return (
            <View style={styles.content}>
                <Text>
                    Hello posting list.....
                </Text>
            </View>
        );
    }
}

export default PostList;
