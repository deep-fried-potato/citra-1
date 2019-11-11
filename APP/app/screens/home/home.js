import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Container, Button, Content} from "native-base";
import Ionicon from 'react-native-vector-icons/Ionicons';
import Banner from '../../components/banner'

const styles = StyleSheet.create({
    text: {fontSize: 16, color: 'rgb(100,100,100)', paddingLeft: 10, paddingTop: 5},
    circleShapeView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        backgroundColor: '#00f',
        margin: 10,
    },
    iconName:{color: 'white'}
})

const icons = [
        {name:'Fire', icon:'md-flame'},
        {name:'Garbage', icon:'md-pint'},
        {name:'Water', icon:'md-water'},
        {name:'Pests', icon:'md-bug'}
    ];

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Banner name="Home"/>
                <View style={{
                    flex: 3, backgroundColor: 'white' +
                        ''
                }}>
                    <Text>Home here ....</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>Filter By Category</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {
                            icons.map((object, i) => (
                                <Button key={i} style={styles.circleShapeView}>
                                    <Ionicon color="#fff" size={35} name={object.icon}/>
                                    <Text style={styles.iconName}>{object.name}</Text>
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
