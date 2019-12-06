import React from 'react';
import {FlatList,  AsyncStorage, PermissionsAndroid} from 'react-native';
import {Card, Text,CardItem, Left, Right, Icon, Button,Thumbnail, Body, ActionSheet} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Comment extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props.comment)
        return(
            <Card style={{backgroundColor:'#797c86'}} >
                <CardItem header>
                    <Body>
                        <Text>{this.props.comment.item.user}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text note>{this.props.comment.item.text}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}