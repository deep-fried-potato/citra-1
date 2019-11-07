import React, {Component} from 'react';
import {View, Text} from "react-native";
import {Container} from "native-base";
import Ionicon from "react-native-vector-icons/Ionicons";
import Banner from "../components/banner";

class Search extends Component {
    static navigationOptions = {
        title:'Citra',
        tabBarLabel:"Search",
        tabBarIcon:({tintColor})=>(
            <Ionicon color={tintColor} size={30} name="md-search"></Ionicon>
        )
    }
    render() {
        return (
            <Container>
                <Banner name="Search" />
                <View>
                    <Text>Search here !!!</Text>
                </View>
            </Container>
        );
    }
}

export default Search;
