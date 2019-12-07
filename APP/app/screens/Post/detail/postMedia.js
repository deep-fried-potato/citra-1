import React from 'react';
import {AsyncStorage, View, Text, FlatList} from 'react-native';
import axios from 'axios';

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post: []
        }
    }
    
    _getMdeia = async () => {
        await console.log(this.state.post[0].photo)
    }
    componentDidMount = async () => {
        await this.setState({'post': this.props.navigation.getParam('post')})
        await this._getMdeia();
    }

    render() {
        return( 
            <Text>{this.state.post.photo}</Text>
        );
    }
}

export default PostDetail;

