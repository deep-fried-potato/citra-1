import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from "react-native";
import {Container, Button, Grid, Row, Col} from "native-base";
import Icon from "react-native-vector-icons/Fontisto";
import Banner from "../components/banner";

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

const categories = ['ambulance', 'pulse', 'injection-syringe', 'stethoscope', 'test-tube', 'paralysis-disability']

class Sos extends Component {


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
  
    render() {
        return (
            <Container>
                <Banner name="SOS" _toggledrawer={this.toggleDrawer} userName={'Siddhant'}></Banner>
                <ScrollView>
                    <View style={styles.container}>
                        {
                            categories.map((category, index)=>(
                                <TouchableOpacity key={index} style={styles.item} onPress={()=>{}}>
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
