import React from 'react';
import Timeline from 'react-native-timeline-flatlist'
import {TouchableOpacity, AsyncStorage, View, Text, FlatList, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import {Container, Header, Content, Left, Body, Right, Button} from 'native-base';
import {styles} from "../create/styles";
import Icon from "react-native-vector-icons/Feather";

class PostDetail extends React.Component {
    constructor() {
        super()
        
        this.state = {
            data: [],
        }
    }

    statusData = (item) => {
        newitem = {}
        newitem.time = new Date(item.timestamp).toLocaleDateString();
        newitem.title  =  (item.status)?'Completed':'Pending' 
        console.log(newitem.time)
        newitem.description = item.text
        return newitem
    }

    componentDidMount = () => {
        let post = this.props.navigation.getParam('post')[0];
        let data  = post.completionStatus.map(x => this.statusData(x))
        this.setState({'data':data});
    }

    render() {
        console.info(this.state)
        const {goBack} = this.props.navigation;
        return (
            <SafeAreaView>
                <ScrollView>
                    <Header style={styles.banner}>
                        <Left>
                            <TouchableOpacity onPress={() => goBack()}>
                                <Icon color="#000" size={20} name="arrow-left"></Icon>
                            </TouchableOpacity>
                        </Left>
                        <Body/>
                        <Right/>
                    </Header>
                    <Timeline
                        data={this.state.data}
                        circleSize={20}
                        circleColor='rgb(180,180,180)'
                        lineColor='rgb(200,200,200)'
                        timeContainerStyle={{minWidth: 52, marginTop: -5}}
                        timeStyle={{
                            textAlign: 'center',
                            backgroundColor: '#00f',
                            color: 'white',
                            padding: 5,
                            borderRadius: 13
                        }}
                        descriptionStyle={{color: 'gray'}}
                        options={{
                            style: {padding: 10}
                        }}
                    />
                </ScrollView>
             </SafeAreaView>
        );
    }
}

export default PostDetail;

