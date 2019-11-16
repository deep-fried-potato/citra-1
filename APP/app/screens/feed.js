import React from 'react';
import {FlatList,  AsyncStorage, PermissionsAndroid} from 'react-native';
import {Card, Text,CardItem, Left, Right, Icon, Button,Thumbnail, Body} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

class Item extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            time: null,
            distance: null
        }
    }

    diff_days = (dt2, dt1) => {
     let diff =(dt2.getTime() - dt1.getTime()) / 1000;
     if ((diff /= 60) <= 59){ return `${Math.abs(Math.round(diff))} m`} // minutes
     else if ((diff /= 60) <= 23) {return `${Math.abs(Math.round(diff))} h`}// hours
     else{ 
            diff /= 24;
            return `${Math.abs(Math.round(diff))} d`
        }
    }

    _parseDate = () => {
        let time = new Date(this.props.card.addedDate);
        let time_now = new Date();
        this.setState({time:this.diff_days(time_now, time)});
    }

    _parseDistance = () => {

    }

    componentDidMount = () => {
        this._parseDate();
        this._parseDistance();
    }

    render(){
    return (
        <Card>
                <CardItem >
                    <Left>
                        {/* icon for differnt tags like potholes garbage etc */}
                        <Thumbnail source={require('../assets/drawer-cover.png')} />
                        <Body>
                            <Text>{this.props.card.typeOfIssue}</Text>
                            <Text note> Posted by {this.props.card.addedBy} | {this.state.time} days ago </Text>
                            {/* <Text note> {card.tags.map(tag => { `<li> #${tag}</li>` })} </Text> */}
                        </Body>
                    </Left> 
                </CardItem>
                <TouchableOpacity onPress={() => this.props.postpage(this.props.card._id)}>
                    <CardItem cardBody>
                        {/* <Image source={require('../assets/drawer-cover.png')}  style={{height: 200, width: null, flex:1}} /> */}
                        <Body>
                            <Text>{this.props.card.title}</Text>
                            <Text note>{this.props.card.description}</Text>
                            {/* content max 100 chars */}
                        </Body>
                    </CardItem>
                </TouchableOpacity>
                <CardItem footer>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>{this.props.card.upvotes.length}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>{this.props.card.residentComments.length + this.props.card.authorityComments.length}</Text>
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
}


class feed extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            feed : [],
            lat: null,
            lng: null,
            rad: 5,
            refreshing: true,
            location: null,
        }
    }

    _postpage = (id)=>{
        this.props.navigation.navigate('postscreen', {postid : id});
    }

    _fetchfeed = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.info(this.state)
        axios.get('http://139.59.75.22:3000/common/getIssues', {
            params:{
                lat: this.state.lat,
                lng: this.state.lng,
                rad: this.state.rad,
            },
            headers: {
                'x-access-token': userToken, 
            }
        })
        .then(resjson => {
            // ["tags", "addedDate", "upvotes", "assignedAuthority", "_id", "positiveVerifiers", "negativeVerifiers", "title", "description", "photo",
            //  "typeOfIssue", "location", "plusCode", "addedBy", "residentComments", "authorityComments", "__v", "completionStatus", "verifications"]
            this.setState({feed: Object.values(resjson.data) , refreshing: false})
        })
        .catch(err => {
            console.log(err)
            this.setState({refreshing:false})
        }) 
    }

    _getCurrentPositionAsync = () => {
        return new Promise(function (resolve, reject) {
            Geolocation.getCurrentPosition(resolve, reject);
        }).then((position) => {
            return position;
        })
        .catch((err) => { 
            console.log(err);
        });
    } 

    _getCurrentLocation2 = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            //TODO: onrefresh location update
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You are asasd accessing the location');
                let position = await this._getCurrentPositionAsync();
                this.setState({'lat': position.coords.latitude, 'lng': position.coords.longitude}) 
                console.log(this.state);
            } else {
              console.log('Location permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
    }

    componentDidMount = async () => {
        await this._getCurrentLocation2();
        await this._fetchfeed()
    }

    handlerefresh =() => {
        this.setState({refreshing : true}, () => this._fetchfeed())
    }

    render(){
        return(
            <FlatList 
                data = {this.state.feed}
                renderItem = {({item}) => <Item card = {item} postpage = {this._postpage} />}
                keyExtractor = {item => item._id}
                refreshing = {this.state.refreshing}
                onRefresh = {this.handlerefresh}
            /> 
        );
    }
}

export default feed;


