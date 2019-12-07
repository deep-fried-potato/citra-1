import React from 'react';
import Timeline from 'react-native-timeline-flatlist'
import {AsyncStorage, View, Text, FlatList} from 'react-native';
import axios from 'axios';
import { Container, Header, Content } from 'native-base';

class PostDetail extends React.Component {
    constructor(){
        super()
        this.data = [
            {time: '09:000', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', },
            {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
            {time: '12:00', title: 'Lunch'},
            {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
            {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)'},
            {time: '09:000', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',lineColor:'#009688', },
            {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
            {time: '12:00', title: 'Lunch'},
            {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
            {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)'}
          ]
        this.state={
            post:[],
        }
      }
    componentDidMount = () => {
        let post =  this.props.navigation.getParam('post')[0];
        this.setState({post});
    }

    render() {
        console.info(this.state)
        return(
            <Container>
                <Header />
                    <Timeline
                    data={this.data}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{minWidth:52, marginTop: -5}}
                    timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                    descriptionStyle={{color:'gray'}}
                    options={{
                      style:{paddingTop:10}
                    }}
                    />
            </Container>
        );
    }
}

export default PostDetail;

