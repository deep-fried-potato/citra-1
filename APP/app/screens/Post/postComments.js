import React from 'react';
import {AsyncStorage, View, Text, FlatList} from 'react-native';
import { Container, Header, Content, Item, Icon, Input, Button, Footer,Form, Picker } from 'native-base';
import Comment from './comment'

class PostComments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            resComments : [],
            autComments : [],
            comment: '',
            selected: 'key0',
            data: [],
            post : []
        }
    }

    componentDidMount = () => {
        let post =  this.props.navigation.getParam('post')
        let resComments = post[0].residentComments
        let autComments = post[0].authorityComments
        this.setState({resComments, autComments, post, 'data':resComments})
    }

    onValueChange = (value) => {
        this.setState({selected: value});
        if (value === 'key0'){
            this.setState({data:this.state.resComments})
        }
        else{
            this.setState({data:this.state.autComments})
        }
    }

    _addComment = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.info(this.state.post[0]._id);
        fetch(`http://localhost:3000/common/commentIssue/${this.state.post[0]._id}`, {
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
                if (response){
                    this.setState({'selected':'key0','data':response.residentComments})
                    this.setState({'comment':''})
                }
            })
            .catch(err => (console.log('Error', err)));
    }

    render() {
        return(
        <Container style={{backgroundColor:'#596ca6'}}>
            <Header style={{backgroundColor:'#4d66b3'}}>
            <Content>
            <Form>
                <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange}
                    >
                    <Picker.Item label="Resident Comments" value="key0" />
                    <Picker.Item label="Authority Comments" value="key1" />
                </Picker>
            </Form>
            </Content>
            </Header>
            <FlatList
                data = {this.state.data}
                renderItem = {(item) => <Comment comment={item}/>}
                keyExtractor = {item => item._id}
            />

        <Footer >
            <Content style={{backgroundColor:'#ffffff'}}>
            <Item rounded style={{flex:1}}>
                <Input placeholder='Add Comment'
                    onChangeText = {text => this.setState({'comment':text})}
                    value = {this.state.comment}
                />
                <Button  onPress = {() => this._addComment()}>
                    <Icon active name='paper-plane' />
                </Button>
            </Item> 
            </Content>
          </Footer>
      </Container>
        );
    }
}

export default PostComments;

