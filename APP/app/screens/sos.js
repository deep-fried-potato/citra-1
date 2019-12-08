import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, AsyncStorage} from "react-native";
import {Container, Button, Grid, Row, Col} from "native-base";
import Icon from "react-native-vector-icons/Fontisto";
import Banner from "../components/banner";
import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
import session from '../api/session'

const styles = StyleSheet.create({
    container:{flexDirection:'row', flexWrap:'wrap', alignContent: 'center'},
    item:{
        width: Dimensions.get('window').width * 0.5,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText:{color:'rgb(150,150,150)', paddingVertical:5},
    sos: {flex: 1, flexDirection:'column'},
    type:{flex:1, flexDirection: 'row', justifyContent:'center', backgroundColor:'grey', borderColor:'red', borderWidth: 2 },
    mic: {borderColor: 'blue', borderWidth: 2},
})

const categories = ['accident' , 'fire', 'injection-syringe', 'stethoscope', 'test-tube', 'paralysis-disability']

class Sos extends Component {

    constructor(props){
        super(props)
        this.state = {
            location:{
                lat:17.408623,
                lng:78.510919,
            }
        }
    }

    _getCurrentPositionAsync = () => {
        return new Promise(function (resolve, reject) {
            Geolocation.getCurrentPosition(resolve, reject);
        }).then((position) => {
            return position;
        })
            .catch((err) => {
                console.log(err);
            });
    }

    _setCurrentLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You are accessing the location');
                let position = await this._getCurrentPositionAsync();
                console.log(position)
                this.setState({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                })
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _viewfeed = async () => {
    await this.props.navigation.navigate('feedscreen');
  };

  toggleDrawer = async () => {
    await this.props.navigation.toggleDrawer();
  }

  componentDidMount = async() => {
      await this._setCurrentLocation()
    let userToken = await AsyncStorage.getItem('userToken')
    this.setState({userToken})
  }
  

  sendSOS = (key) => {
      console.log(this.state.location)
      session.post('http://'+Config.BASE_URL+':3000/resident/SaveMySoul',{
        'Content-Type': 'application/json',
        'x-access-token': this.state.userToken},{
        'alertType': categories[key],
        'location': this.state.location
      } 
    ).then((response)=>{
        console.log('data', response.data)
        alert('Request sent')
    }).catch(err => {console.log(err.response)} )
}

    render() {
        return (
            <Container>
                <Banner name="SOS" _toggledrawer={this.toggleDrawer} userName={'Siddhant'}></Banner>
                <ScrollView>
                    <View style={styles.container}>
                        {
                            categories.map((category, index)=>(
                                <TouchableOpacity key={index} style={styles.item} onPress={(index)=>this.sendSOS(index)}>
                                    <Icon color="#f00" size={30} name={category}></Icon>
                                    <Text style={styles.itemText}>{category}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

export default Sos;
