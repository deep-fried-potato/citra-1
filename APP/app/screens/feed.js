import React from 'react';
import {View, FlatList, AsyncStorage, PermissionsAndroid, Image} from 'react-native';
import {Card, Text, CardItem, Left, Right, Icon, Button, Thumbnail, Body, ActionSheet, Grid, Col} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Config from "react-native-config";
import styles from './styles'

const uri = 'https://miro.medium.com/max/1914/1*gyr5EOhxd17hPf5SY_KXYA.jpeg';

class Item extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            time: null,
            distance: null,
            upvote: false,
            total_upvote: null,
            options: {},
            userId: null,
        }
    }

    diff_days = (dt2, dt1) => {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        if ((diff /= 60) <= 59) {
            return `${Math.abs(Math.round(diff))} m`
        } // minutes
        else if ((diff /= 60) <= 23) {
            return `${Math.abs(Math.round(diff))} h`
        }// hours
        else {
            diff /= 24;
            return `${Math.abs(Math.round(diff))} d`
        }
    }

    _parseDate = () => {
        let time = new Date(this.props.card.addedDate);
        let time_now = new Date();
        this.setState({time: this.diff_days(time_now, time)});
    }

    _parseDistance = () => {
        //TODO: Correct this function
        let distance = Math.sqrt(Math.pow((this.props.latitude - this.props.card.location.lat), 2)
            + Math.pow((this.props.longitude - this.props.card.location.lng), 2))
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
        if (!this.state.upvote) {
            fetch(`http://${Config.BASE_URL}:3000/resident/upvoteIssue/:${this.props.card._id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.props.token
                }
            })
                .then(response => response.json())
                .then((resjson) => {
                    // console.log(resjson);
                    this.setState({'upvote': true, 'total_upvote': this.state.total_upvote + 1});
                })
                .catch(err => (console.log('Error', err)));
        } else {
            this.setState({'upvote': false, 'total_upvote': this.state.total_upvote - 1});
        }
    }

    _deletePost = (postId) => {
        fetch(`http://${Config.BASE_URL}:3000/resident/deleteIssue/:${postId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
        this.setState({'total_upvote': this.props.card.upvotes.length})
    }

// PostDetail
    render() {
        let BUTTONS = [
            {text: "Remove from feed", icon: "trash", iconColor: "#606060"},
            // { text: "Share", icon: "analytics", iconColor: "#f42ced" },
            // { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
            {text: "Cancel", icon: "close", iconColor: "#25de5b"}
        ]

        // console.log(this.state.userId)
        //TODO:Can't perform delete

        if (this.props.card.addedBy === this.state.userId) {
            BUTTONS.push({text: "Delete", icon: "trash", iconColor: "#fa213b"})
        }

        var DESTRUCTIVE_INDEX = 3;
        var CANCEL_INDEX = 4;

        return (
            <View style={styles.card}>
                <Card>
                    <CardItem cardBody>
                        <Image source={{uri: uri}} style={styles.image}/>
                    </CardItem>
                    <CardItem cardBody style={{paddingHorizontal:8, marginBottom:15}}>
                        <View>
                            <Text style={styles.caption} onPress={() => this.props.postpage(this.props.card._id)}>{this.props.card.title}</Text>
                            <Text note style={styles.subCaption}><Icon type="Feather" name="map-pin" style={{color:'#808080', fontSize:14}}></Icon> {this.state.distance} Km</Text>
                            <Text note style={styles.subCaption}>1hr | Anuj Aggarwal</Text>
                            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur dignissimos
                                doloremque ea iure molestias necessitatibus neque quibusdam saepe unde?</Text>
                        </View>
                    </CardItem>
                    <CardItem bordered footer>
                        <Left>
                            <TouchableOpacity onPress={() => this._upvote()}>
                                <Text><Icon active name="thumbs-up"/> {this.state.total_upvote}</Text>
                            </TouchableOpacity>
                        </Left>
                        <Body />
                        <Right>
                            <TouchableOpacity
                                onPress={() => {
                                    ActionSheet.show(
                                        {
                                            options: BUTTONS,
                                            cancelButtonIndex: CANCEL_INDEX,
                                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                            title: "Select an option"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex == 0) {
                                                this.props._removeFromFeed(this.props.card._id)
                                            } else if (BUTTONS[buttonIndex] !== undefined && BUTTONS[buttonIndex]['text'] === 'Delete') {
                                                this._deletePost(this.props.card.id);
                                                this.props._removeFromFeed(this.props.card.id);
                                            }
                                        }
                                    )
                                }
                                }>
                                <Icon style={styles.icon} type="Feather" name="more-vertical"></Icon>
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
                </Card>
                <View style={styles.hr}/>
            </View>
        );
    }
}

export default Item;
