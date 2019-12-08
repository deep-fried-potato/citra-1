import React from 'react';
import {AsyncStorage, View, Text, Image, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import axios from 'axios';
import {styles} from "../create/styles";
import {Body, Header, Left, Right} from "native-base";
import Icon from "react-native-vector-icons/Feather";

class PostDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            media: []
        }
    }

    _getMdeia = async () => {
        await console.log(this.state.post[0].photo)
    }
    componentDidMount = async () => {
        let media = this.props.navigation.getParam('post')[0]['photo']
        this.setState({media})
    }

    render() {
        const {goBack} = this.props.navigation;
        return(
            <SafeAreaView>
                <Header style={styles.banner}>
                <Left>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon color="#000" size={20} name="arrow-left"></Icon>
                    </TouchableOpacity>
                </Left>
                <Body/>
                <Right/>
            </Header>
                {
                            (this.state.media.length != 0) && (
                                this.state.media.map((media, key) => (
                                    <Image
                                        key={key}
                                        source={{uri: media}}
                                        style={{alignSelf:'center', width: "90%", height: '60%', borderRadius: 10, margin: 10}}
                                    />)
                                )
                            )
                        }
            </SafeAreaView>
        
        );
    }
}

export default PostDetail;

