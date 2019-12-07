import React from 'react';
import Timeline from 'react-native-timeline-flatlist'
import {TouchableOpacity, AsyncStorage, View, Text, FlatList, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import {Container, Header, Content, Left, Body, Right, Button} from 'native-base';
import {styles} from "../../postCreate/styles";
import Icon from "react-native-vector-icons/Feather";

class PostDetail extends React.Component {
    constructor() {
        super()
        this.data = [
            {
                time: '09:000',
                title: 'Archery Training',
                description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                lineColor: '#009688',
            },
            {
                time: '10:45',
                title: 'Play Badminton',
                description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'
            },
            {time: '12:00', title: 'Lunch'},
            {
                time: '14:00',
                title: 'Watch Soccer',
                description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                lineColor: '#009688'
            },
            {
                time: '16:30',
                title: 'Go to Fitness center',
                description: 'Look out for the Best Gym & Fitness Centers around me :)'
            },
            {
                time: '09:000',
                title: 'Archery Training',
                description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                lineColor: '#009688',
            },
            {
                time: '10:45',
                title: 'Play Badminton',
                description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'
            },
            {time: '12:00', title: 'Lunch'},
            {
                time: '14:00',
                title: 'Watch Soccer',
                description: 'Team sport played between two teams of eleven players with a spherical ball. ',
                lineColor: '#009688'
            },
            {
                time: '16:30',
                title: 'Go to Fitness center',
                description: 'Look out for the Best Gym & Fitness Centers around me :)'
            }
        ]
        this.state = {
            post: [],
        }
    }

    componentDidMount = () => {
        let post = this.props.navigation.getParam('post')[0];
        this.setState({post});
    }

    render() {
        console.info(this.state)
        return (
            <SafeAreaView>
                <ScrollView>
                    <Header style={styles.banner}>
                        <Left>
                            <TouchableOpacity>
                                <Icon color="#000" size={20} name="arrow-left"></Icon>
                            </TouchableOpacity>
                        </Left>
                        <Body/>
                        <Right/>
                    </Header>
                    <Timeline
                        data={this.data}
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

