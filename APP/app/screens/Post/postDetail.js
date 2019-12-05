import React from 'react';
import {AsyncStorage, View, Text, FlatList} from 'react-native';
import axios from 'axios';

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        // console.log('yay');
        // console.log(this.props.navigation.getParam('post'))
        this.state = {
            post: []
        }
    }
    // _fetchPost = async (userToken) => {
    //     const postid =  this.props.navigation.getParam('postid')
    //     axios.get(`http://172.18.0.1:3000/common/viewIssue/${postid}`, {
    //         headers: {
    //             'x-access-token': userToken,
    //         }
    //     })
    //     .then(res => {
    //         console.log(res.data)
    //         this.setState({'post': Array(res.data)})
    //     })
    //     .catch(err => {console.log(err)})
    // }

    // componentDidMount =  async () => {
    //     const userToken = await AsyncStorage.getItem('userToken')
    //     await this._fetchPost(userToken);
    // }

    render() {
        return( 
            <Text>Post Detail</Text>
        );
    }
}

export default PostDetail;

