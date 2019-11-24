import React from 'react';
import {AsyncStorage} from 'react-native';
import {Text, Container} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post: null
        }
    }

    _fetchPost= async () => {
        const userToken =  await AsyncStorage.getItem('userToken')
        const postid =  this.props.navigation.getParam('postid')
       console.log(postid)
        axios.get(`http://139.59.75.22:3000/common/viewIssue/${postid}`, {
            headers: {
                'x-access-token': userToken,
            }
        })
        // .then(response => response.json())
        .then(res => {
            // console.log('lll', res.data)
            this.setState({'post': res.data})
        })
        .catch(err => {console.log(err)})
    }

    componentDidMount = async () => {
       await this._fetchPost();
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

    render() {
        return( 
            <Container>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                />
            </Container>
        );
    }
}

export default PostDetail;

