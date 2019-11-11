import React from 'react';
import {} from 'react-native';
import {Text, Container} from 'native-base';

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postid: this.props.navigation.getParam('postid'),
        }
    }
    render() {
        return( 
            <Container>
                <Text>Post screen</Text>
                <Text>{this.state.postid}</Text>
            </Container>
        );
    }
}

export default PostDetail;

