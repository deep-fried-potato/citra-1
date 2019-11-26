import React from 'react';
import {AsyncStorage, View, FlatList} from 'react-native';
import axios from 'axios';
import PostView from './postView';

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post: []
        }
    }

    _fetchPost = async (userToken) => {
        const postid =  this.props.navigation.getParam('postid')
        axios.get(`http://172.18.0.1:3000/common/viewIssue/${postid}`, {
            headers: {
                'x-access-token': userToken,
            }
        })
        .then(res => {
            console.log('asas', res.data)
            this.setState({'post': Array(res.data)})
        })
        .catch(err => {console.log(err)})
    }

    componentDidMount =  async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        await this._fetchPost(userToken);
    }

    render() {
        return( 
            <FlatList 
                data = {this.state.post}
                renderItem = {({item}) => <PostView post = {item} token={this.state.userToken} />}
                keyExtractor = {item => item._id}
                refreshing = {this.state.refreshing}
                onRefresh = {this.handlerefresh}
            /> 
        );
    }
}

export default PostDetail;

