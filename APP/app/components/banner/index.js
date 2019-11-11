import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from "react-native"
import {Header, Left, Right, Body, Thumbnail} from "native-base"

const styles = StyleSheet.create({
    banner:{backgroundColor:'white'},
    bannerText:{color:'blue', fontSize:24, fontWeight:'bold'}
});


class Banner extends Component {
    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png"

        return (
            <Header style={styles.banner}>
                <Left>
                  <TouchableOpacity>
                      <Thumbnail small source={{uri: uri}} />
                  </TouchableOpacity>
                </Left>
                <Body>
                    <Text style={styles.bannerText}>{this.props.name}</Text>
                </Body>
                <Right></Right>
            </Header>
        );
    }
}

export default Banner;
