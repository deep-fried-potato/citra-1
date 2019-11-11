import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import {Container, Card, CardItem, Thumbnail, Left, Body} from "native-base";
import Banner from "../components/banner";

const styles = StyleSheet.create({
    card:{flex:0,  marginTop: 0, marginBottom:0},
    cardItem:{backgroundColor:'rgb(255,255,255)', marginVertical: 5},
    image:{paddingTop: 12, paddingBottom: 12},
    content:{flex:2},
    notificationHeading:{fontSize:16, fontWeight:'bold', color:'rgb(70,70,70)', paddingBottom:0, paddingTop:0},
    notificationSubHeading:{fontSize:12, color:'rgb(150,150,150)', paddingBottom:0},
    hr:{borderBottomColor: 'rgb(200,200,200)', borderBottomWidth: 1}
});

const notifications = [
    {
        'uri':'https://facebook.github.io/react-native/docs/assets/favicon.png',
        'timestamp':'7:30PM',
        'notificationHeading':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, rerum?',
        'notificationSubHeading':'Municipal Corporation Commented on your post'
    },
    {
        'uri':'https://facebook.github.io/react-native/docs/assets/favicon.png',
        'timestamp':'7:30PM',
        'notificationHeading':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, rerum?',
        'notificationSubHeading':'Municipal Corporation Commented on your post'
    },
    {
        'uri':'https://facebook.github.io/react-native/docs/assets/favicon.png',
        'timestamp':'7:30PM',
        'notificationHeading':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, rerum?',
        'notificationSubHeading':'Municipal Corporation Commented on your post'
    },
    {
        'uri':'https://facebook.github.io/react-native/docs/assets/favicon.png',
        'timestamp':'7:30PM',
        'notificationHeading':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, rerum?',
        'notificationSubHeading':'Municipal Corporation Commented on your post'
    }
]

class Notifications extends Component {
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Container>
                        <Banner name="Notification"></Banner>
                        {
                            notifications.map((object, i)=>(
                                <Card key={i} transparent style={styles.card}>
                                    <CardItem style={styles.cardItem}>
                                        <Left>
                                            <Thumbnail source={{uri: object.uri}} style={styles.image} />
                                            <Body>
                                                <Text style={styles.notificationSubHeading}>{object.timestamp}</Text>
                                                <Text numberOfLines={2} style={styles.notificationHeading}>{object.notificationHeading}</Text>
                                                <Text style={styles.notificationSubHeading}>{object.notificationSubHeading}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <View style={styles.hr}/>
                                </Card>
                            ))
                        }
                    </Container>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Notifications;
