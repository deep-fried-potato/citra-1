import React from 'react';
import {FlatList,  AsyncStorage} from 'react-native';
import {Card, Text,CardItem, Left, Right, Icon, Button,Thumbnail, Body} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import axios from 'axios';
// const axios = require('axios').default;


const DATA = [
    {
        id:'1',
        title:'Why so serious?',
        content : 'Like any other social media site Facebook has length requirements when it comes to writing on the wall.',
        tags:['Zuora', 'Subscription', 'Startup', 'Entrepreneurship' ,'Sales' ,'Marketing' ,'Pitching']
    },
    {
        id:'2',
        title:'Why so serious?',
        content : 'Like any other social media site Facebook has length requirements when it comes to writing on the wall.',
        tags:['Zuora', 'Subscription', 'Startup', 'Entrepreneurship' ,'Sales' ,'Marketing' ,'Pitching']
    },
    {
        id:'3',
        title:'Why so serious?',
        content : 'Like any other social media site Facebook has length requirements when it comes to writing on the wall.',
        tags:['Zuora', 'Subscription', 'Startup', 'Entrepreneurship' ,'Sales' ,'Marketing' ,'Pitching']
    },
];

function Item ({card, postpage} ) {
    return (
        <Card>
                <CardItem >
                    <Left>
                        {/* icon for differnt tags like potholes gaerbage etc */}
                        <Thumbnail source={require('../assets/drawer-cover.png')} />
                        <Body>
                            <Text>{card.tags[0]}</Text>
                            <Text note> Posted by {card.author} | {card.time} ago </Text>
                            {/* <Text note> {card.tags.map(tag => { `<li> #${tag}</li>` })} </Text> */}
                        </Body>
                    </Left> 
                </CardItem>
                <TouchableOpacity onPress={() => postpage(card.id)}>
                    <CardItem cardBody>
                        {/* <Image source={require('../assets/drawer-cover.png')}  style={{height: 200, width: null, flex:1}} /> */}
                        <Body>
                            <Text>{card.title}</Text>
                            <Text note>{card.content}</Text>
                            {/* content max 100 chars */}
                        </Body>
                    </CardItem>
                </TouchableOpacity>
                <CardItem footer>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>{card.upvotes|| 12}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>{card.countcomments || 4}</Text>
                        </Button>
                     </Body>
                    <Right>
                        <Button transparent>
                            <Text>2.4 Km away</Text>
                        </Button>
                        
                    </Right>
 
                </CardItem>
        </Card>
      );    
}


class feed extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            feed : []
        }
    }

    _postpage = (id)=>{
        this.props.navigation.navigate('postscreen', {postid : id});
    }

    fetchfeed = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios.get('http://139.59.75.22:3000/common/getIssues', {
            params:{
                lat: 17.399320,
                lng: 78.521402,
                rad: 5,
            },
            headers: {
                'x-access-token': userToken,
            }
        })
        .then((res) =>{
            console.log(res);
        })
        .catch(err => {console.log(err)}) 
    }

    componentDidMount = () => {
        this.fetchfeed();
    }

    render(){
        return(
            <FlatList 
                data = {DATA}
                renderItem = {({item}) => <Item card = {item} postpage = {this._postpage} />}
                keyExtractor = {item => item.id} 
            /> 
        );
    }
}

export default feed;