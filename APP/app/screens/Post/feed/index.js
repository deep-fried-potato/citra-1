import React from 'react';
import {FlatList, AsyncStorage, PermissionsAndroid, SafeAreaView, ScrollView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Config from "react-native-config"
import Banner from "../../../components/banner";
import Item from './feedpost'

class feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            lat: null,
            lng: null,
            rad: 5,
            refreshing: true,
            userToken: null,
        }
    }

    _postpage = (id) => {
        const postDetail = this.state.feed.filter((item) => item._id === id)
        // console.log(postDetail);
        this.props.navigation.navigate('postDetailNavigator', {post: postDetail});
    }

    _fetchfeed = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.setState({userToken});
        axios.get('http://' + Config.BASE_URL + ':3000/common/getIssues', {
            params: {
                // lat: this.state.lat ,
                // lng: this.state.lng ,
                lat: 17.399320,
                lng: 78.521402,
                rad: this.state.rad,
            },
            headers: {
                'x-access-token': userToken,
            }
        })
            .then(resjson => {
                // ["tags", "addedDate", "upvotes", "assignedAuthority", "_id", "positiveVerifiers", "negativeVerifiers", "title", "description", "photo",
                //  "typeOfIssue", "location", "plusCode", "addedBy", "residentComments", "authorityComments", "__v", "completionStatus", "verifications"]
                // console.log(resjson['data'])
                this.setState({feed: Object.values(resjson.data), refreshing: false})
            })
            .catch((err, res) => {
                // console.error(err)
                this.setState({refreshing: false})
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

    _setCurrentLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You are accessing the location');
                let position = await this._getCurrentPositionAsync();
                this.setState({'lat': position.coords.latitude, 'lng': position.coords.longitude})
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }


    _feedByType = (issueType) => {
        let filterByType = (post) => {
            if (post.typeOfIssue === issueType) {
                return post
            }
        }
        let data = this.state.feed.filter(filterByType);
        this.setState({'feed': data});
    }

    _removeFromFeed = (issueId) => {
        let removePostById = (post) => {
            if (post._id !== issueId) {
                return post
            }
        }
        let data = this.state.feed.filter(removePostById);
        this.setState({'feed': data});
    }


    handlerefresh = () => {
        this.setState({refreshing: true}, async () => {
            await this._setCurrentLocation();
            await this._fetchfeed()
        })
    }


    componentDidMount = async () => {
        await this._setCurrentLocation();
        await this._fetchfeed();
    }


    render() {
        // console.log(this.state.feed);
        return (
            <SafeAreaView>
                <Banner name="Feed"/>
                <FlatList
                    data={this.state.feed}
                    renderItem={({item}) => <Item card={item} postpage={this._postpage}
                                                  latitude={this.state.lat} longitude={this.state.lng}
                                                  token={this.state.userToken}
                                                  _feedByType={this._feedByType}
                                                  _removeFromFeed={this._removeFromFeed}/>}
                    keyExtractor={item => item._id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handlerefresh}
                />
            </SafeAreaView>
        );
    }
}

export default feed;


