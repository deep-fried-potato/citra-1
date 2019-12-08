import React from 'react';
import {AsyncStorage, View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {styles} from "../create/styles";
import {Body, Header, Left, Right} from "native-base";
import Icon from "react-native-vector-icons/Feather";

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
        const {goBack} = this.props.navigation;
        return(
            <Header style={styles.banner}>
                <Left>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon color="#000" size={20} name="arrow-left"></Icon>
                    </TouchableOpacity>
                </Left>
                <Body/>
                <Right/>
            </Header>
        );
    }
}

export default PostDetail;

