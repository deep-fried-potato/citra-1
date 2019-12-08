import React from "react";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Appcontainer from './config/route'
import {Linking} from 'react-native'
import {Root, Text} from "native-base";

export default class App extends React.Component{
    render(){
        return(
        <Root>
            <Appcontainer />
        </Root>
        )
    }
}  