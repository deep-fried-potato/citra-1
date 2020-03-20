import React from 'react';
import {AsyncStorage, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Item,
    Input,
    Footer,
    Form,
    Picker,
    Left,
    Body,
    Right
} from 'native-base';
import Icon from "react-native-vector-icons/Feather";
import Comment from './comment'
import Config from "react-native-config";
import {styles} from "../create/styles";
import localStyles from "./styles"

class PostComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: '',
            resComments: [],
            autComments: [],
            comment: '',
            selected: 'key0',
            data: [],
            post: []
        }
    }


    getUser = (id, userToken) => {
        fetch(`http://${Config.BASE_URL}:3000/common/profileById/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': userToken
            },
        })
            .then(res => res.json())
            .then(res => res.name)
            .catch(err => {
                console.log(err)
            })
    }

    mapComments = (comment, userToken) => {
        console.log(comment)
        let usr = this.getUser(comment.user, userToken)
        comment.user = usr
        return comment
    }

    componentDidMount = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let post = this.props.navigation.getParam('post')
        let resComments = post[0].residentComments
        let autComments = post[0].authorityComments
        console.log(resComments)
        this.setState({resComments, autComments, post, 'data': resComments})
    }

    onValueChange = (value) => {
        this.setState({selected: value});
        if (value === 'key0') {
            this.setState({data: this.state.resComments})
        } else {
            this.setState({data: this.state.autComments})
        }
    }

    _addComment = async () => {
        if (this.state.comment == '') {
            return
        }
        const userToken = await AsyncStorage.getItem('userToken');
        console.info(this.state.post[0]._id);
        fetch(`http://${Config.BASE_URL}:3000/common/commentIssue/${this.state.post[0]._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userToken,
            },
            body: JSON.stringify({
                text: this.state.comment,
            }),
        })
            .then(res => res.json())
            .then((response) => {
                if (response) {
                    this.setState({
                        'selected': 'key0',
                        'data': response.residentComments.map(this.mapComments),
                        'resComments': response.residentComments
                    })
                    this.setState({'comment': ''})
                }
            })
            .catch(err => (console.log('Error', err)));
    }

    render() {
        const {goBack} = this.props.navigation;
        return (
            <Container>
                <Header style={styles.banner}>
                    <Left>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Icon color="#000" size={20} name="arrow-left"></Icon>
                        </TouchableOpacity>
                    </Left>
                    <Body/>
                    <Right>
                        <Form>
                            <Picker
                                note
                                mode="dropdown"
                                style={{width: 120}}
                                iosIcon={<Icon name="chevron-down" style={{color: "#007aff", fontSize: 25}}/>}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange}
                            >
                                <Picker.Item label="Resident Comments" value="key0"/>
                                <Picker.Item label="Authority Comments" value="key1"/>
                            </Picker>
                        </Form>
                    </Right>
                </Header>
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => <Comment comment={item} userToken={this.state.userToken}/>}
                    keyExtractor={item => item._id}/>

                <Footer style={localStyles.postDetailFooter}>
                    <View style={localStyles.commentBox}>
                        <Item rounded style={localStyles.commentInput}>
                            <Input
                                placeholder='Add Comment'
                                onChangeText={text => this.setState({'comment': text})}
                                value={this.state.comment}/>
                        </Item>
                    </View>
                    <View style={localStyles.commentButton}>
                        <TouchableOpacity onPress={() => this._addComment()}>
                            <Icon size={30} color="blue" style={{alignSelf: 'center'}} name='arrow-right-circle'/>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>
        );
    }
}

export default PostComments;

