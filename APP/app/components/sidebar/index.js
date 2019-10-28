import React, {Component} from 'react';
import {Content, Text, List, ListItem, Icon, Container, Left, Thumbnail} from "native-base";
import styles from './style'

const data = [
    {
        name: "Bookmarks",
        route: "userbookmarks",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
    {
        name: "Posts",
        route: "posts",
        icon: "arrow-up",
        bg: "#477EEA",
    },
    {
        name: "Activity",
        route: "activity",
        icon: "arrow-down",
        bg: "#DA4437",
    },
    {
        name: "Settings",
        route: "settings",
        icon: "repeat",
        bg: "#C5F442",
    },
]

const profileImage = require("../../assets/profile.png")

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        }
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{flex: 1, backgroundColor: '#fff', top: -1}}>
                    <Thumbnail large source={{uri: profileImage}}/>
                    <Text style={{fontSize:12}} >Vineet Sharma</Text>
                    <Text style={{fontSize:6}}>Edit Profile</Text>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    />
                    <List
                        dataArray={data}
                        renderRow={data => <ListItem
                            button
                            noBorder
                            onPress={() => this.props.navigation.navigate(data.route)}>
                            <Left>
                                <Icon
                                    active
                                    name={data.icon}
                                    style={{color: '#777', fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>{data.name}</Text>
                            </Left>
                        </ListItem>}
                    />
                </Content>
            </Container>
        );
    }
}

export default Sidebar;
