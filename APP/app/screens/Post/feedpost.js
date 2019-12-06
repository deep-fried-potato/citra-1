import React from 'react';
import {FlatList,  AsyncStorage, PermissionsAndroid} from 'react-native';
import {Card, Text,CardItem, Left, Right, Icon, Button,Thumbnail, Body, ActionSheet} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Item extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            time: null,
            distance: null,
            upvote: false,
            total_upvote: null,
            options : {},
            userId: null,
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
        //TODO: Correct this function
        let distance = Math.sqrt(Math.pow((this.props.latitude - this.props.card.location.lat),2)
                         + Math.pow((this.props.longitude - this.props.card.location.lng),2))
        distance = Math.round(distance);
        this.setState({distance});
    }

    _getUser = (id) => {
        //TODO: /getresident API update
        return id;
    }
    _upvote = () => {
        //TODO: if this.props.card.post.upvotes has userid :
        // console.log(this.props.card._id)
        if (!this.state.upvote){
            fetch(`http://10.0.33.176:3000/resident/upvoteIssue/:${this.props.card._id}`,{
                method: 'POST',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type' : 'application/json',
                    'x-access-token': this.props.token
                }
                })
                .then(response => response.json())
                .then((resjson) => {
                    // console.log(resjson);
                    this.setState({'upvote' : true, 'total_upvote': this.state.total_upvote+1});
                })
                .catch(err => (console.log('Error', err)));
        }
        else{
            this.setState({'upvote':false, 'total_upvote': this.state.total_upvote-1});
        }
    }

    _deletePost = (postId) => {
        fetch(`http://10.0.33.176:3000/resident/deleteIssue/:${postId}`,{
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type' : 'application/json',
                'x-access-token': this.props.token
            }
            })
            .then(response => response.json())
            .then((resjson) => {
                // this.setState({'upvote' : true, 'total_upvote': this.state.total_upvote+1});
                console.log('Post Deleted')
                console.log(resjson);
            })
            .catch(err => (console.log('Error', err)));
    }

    _getUserFromStorageAsync = async () => {
        let userId = await AsyncStorage.getItem('userId');
        this.setState({'userId': userId})
    }

    componentDidMount = () => {
        this._parseDate();
        this._parseDistance();
        this._getUserFromStorageAsync();
        this.setState({'total_upvote':this.props.card.upvotes.length})
    }

// PostDetail
    render(){
        let BUTTONS = [
            { text: "Remove from feed", icon: "american-football", iconColor: "#2c8ef4" },
            // { text: "Share", icon: "analytics", iconColor: "#f42ced" },
            // { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
            { text: "Cancel", icon: "close", iconColor: "#25de5b" }
        ]

        // console.log(this.state.userId)
        //TODO:Can't perform delete

        if (this.props.card.addedBy === this.state.userId){
            BUTTONS.push({ text: "Delete", icon: "trash", iconColor: "#fa213b" })
        } 

        var DESTRUCTIVE_INDEX = 3;
        var CANCEL_INDEX = 4;

        return (
            <Card>
                <CardItem >
                    <Left>
                        <TouchableOpacity onPress={() => this.props._feedByType(this.props.card.typeOfIssue)}>
                            {/* <Thumbnail source={require('../assets/drawer-cover.png')} /> */}
                            <Body>
                                <Text>t/{this.props.card.typeOfIssue}</Text>
                                <Text note> Posted by {this._getUser(this.props.card.addedBy)} | {this.state.time} ago </Text>
                            </Body>
                        </TouchableOpacity>
                    </Left>
                </CardItem>
                <TouchableOpacity onPress={() => this.props.postpage(this.props.card._id)}>
                    <CardItem cardBody>
                        <Body>
                            <Text>{this.props.card.title}</Text>
                            <Text note>{this.props.card.description}</Text>
                        </Body>
                    </CardItem>
                </TouchableOpacity>
                <CardItem footer>
                    <Left>
                        <Button  onPress={() => this._upvote()}>
                            <Icon active name="thumbs-up" />
                            <Text>{this.state.total_upvote}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button  >
                            <Text>{this.state.distance} Km</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Button 
                            onPress = {() => {
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                    title: "Select an option"
                                },
                                buttonIndex => {
                                    if( buttonIndex == 0){
                                        this.props._removeFromFeed(this.props.card._id)
                                    }
                                    else if(BUTTONS[buttonIndex] !== undefined && BUTTONS[buttonIndex]['text'] === 'Delete'){
                                        this._deletePost(this.props.card.id);
                                        this.props._removeFromFeed(this.props.card.id);
                                    }
                                }
                                )}
                            }
                        >
                            <Text>Options</Text>
                        </Button>
                    </Right>

                </CardItem>
            </Card>
        );    
}
}

export default Item;