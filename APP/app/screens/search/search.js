import React, {Component} from 'react';
import {View, Text} from "react-native";
import {Container} from "native-base";
import SearchInput from "./searchInput";

class Search extends Component {
    render() {
        return (
            <Container>
                <SearchInput></SearchInput>
                <View>
                    <Text>Search here !!!</Text>
                </View>
            </Container>
        );
    }
}

export default Search;
