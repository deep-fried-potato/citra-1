import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Container, Button, Content} from "native-base";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Banner from '../components/banner'

const styles = StyleSheet.create({
    text: {fontSize: 16, color: 'blue', paddingLeft: 10, paddingTop: 5, fontWeight: 'bold'},
    circleShapeView: {
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        backgroundColor: '#00BCD4',
        margin: 10,
        justifyContent: 'center'
    },
})

const icons = ['md-flame', 'md-pint', 'md-water', 'md-bug']

class Home extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Citra',
        tabBarLabel: "Home",
        tabBarIcon: ({tintColor}) => (
            <Entypo color={tintColor} size={30} name="home"></Entypo>
        )
    }

    render() {
        return (
            <Container>
                <Banner name="Home" />
                <View style={{flex: 3, backgroundColor: 'white' +
                        ''}}>
                    <Text>Home here ....</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>Filter By Category</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {
                            icons.map((object, i) => (
                                <Button key={i} style={styles.circleShapeView}>
                                    <Ionicon color="#fff" size={35} name={object}></Ionicon>
                                </Button>)
                            )
                        }
                    </ScrollView>
                </View>

            </Container>
        );
    }
}

export default Home;
