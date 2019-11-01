import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Container, Button} from "native-base";
import Ionicon from 'react-native-vector-icons/Ionicons';

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
    render() {
        return (
            <Container>
                <View style={{flex: 3, backgroundColor: 'red'}}></View>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>Filter By Category</Text>
                    <ScrollView horizontal={true}>
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
