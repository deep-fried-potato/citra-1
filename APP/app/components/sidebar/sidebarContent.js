import React, {Component} from 'react';
import {Thumbnail, View} from "native-base";
import {StyleSheet, ScrollView, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {DrawerItems} from 'react-navigation-drawer';

const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

const styles = StyleSheet.create({
    header: {backgroundColor: 'white'},
    container: {flex: 1,},
    hr: {borderBottomColor: 'black', borderBottomWidth: 1,}
});


class sidebarContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                    <Thumbnail large source={{uri: uri}}></Thumbnail>
                    <View style={styles.hr}/>
                    <DrawerItems {...this.props}/>
                </SafeAreaView>
            </ScrollView>
        )
    }
}


export default sidebarContent;
