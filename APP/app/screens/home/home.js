import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Container, Button, Content} from "native-base";
import Ionicon from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Banner from '../../components/banner'

const styles = StyleSheet.create({
    container: {
        flex:3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
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
});

const icons = [
        {name:'Fire', icon:'md-flame'},
        {name:'Garbage', icon:'md-pint'},
        {name:'Water', icon:'md-water'},
        {name:'Pests', icon:'md-bug'}
    ];

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region:null,
            markers:null,
            error:null
        }
    }

    componentDidMount(): void {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                region:{
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    latitudeDelta:0.0922,
                    longitudeDelta:0.0421
                },
                error:null
            });
        },
            (error) => this.setState({error:error.message})),
            {enableHighAccuracy: true, timeout: 200000, maximumAge: 0}
    }

    render() {
        return (
            <Container>
                <Banner name="Home"/>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        region={this.state.region}
                    >
                    </MapView>
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
