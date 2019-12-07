import React from 'react';
import {FlatList,  AsyncStorage, PermissionsAndroid} from 'react-native';
import {View, Card, Text,CardItem, Left, Right, Icon, Button,Thumbnail, Body, ActionSheet} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const uri =
    'https://facebook.github.io/react-native/docs/assets/favicon.png';


export default class Comment extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props.comment)
        return(
            <View style={{marginVertical:10, flex:1, flexDirection:'row'}}>
                <View style={{flex:0.15}}>
                    <Thumbnail style={{alignSelf:'center'}} small source={{uri: uri}} />
                </View>
                <View style={{flex:0.85, paddingHorizontal:10, backgroundColor:'rgb(230,230,230)', marginRight:20, marginTop:5, borderRadius:8, borderTopLeftRadius:0}}>
                    <Text style={{paddingTop:5, fontWeight:'bold'}}>{this.props.comment.item.user}</Text>
                    <Text note>1 hr</Text>
                    <Text style={{paddingVertical:10, fontWeight:'100', fontSize:14}}>{this.props.comment.item.text}</Text>
                </View>
            </View>
        )
    }
}
