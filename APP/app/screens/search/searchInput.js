import React, {Component} from 'react';
import {Body, Header, Left, Right, Thumbnail, Input, Item, Content} from "native-base";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    banner: {backgroundColor: 'rgb(240,240,240)'},
    bannerText: {color: 'blue', fontSize: 24, fontWeight: 'bold'},
    searchInput:{marginLeft:17,borderRadius:5}
});

const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png"

class SearchInput extends Component {
    render() {
        return (
            <Header searchBar style={styles.banner}>
                <Left style={{flex:null}}>
                    <TouchableOpacity>
                        <Thumbnail small source={{uri: uri}}/>
                    </TouchableOpacity>
                </Left>
                <Item regular style={styles.searchInput}>
                    <Input placeholder='Search...'/>
                </Item>
            </Header>
        );
    }
}

export default SearchInput;
