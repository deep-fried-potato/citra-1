import React, {Component} from 'react'
import {Text, AsyncStorage} from 'react-native'
import Config from 'react-native-config';

export default class Sosinfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            info: []
        }
    }

    fetchSOS = async (sosId) => {
        let userToken = await AsyncStorage.getItem('userToken');
        fetch(`http://`+Config.BASE_URL+`:3000/common/viewSOS/${sosId}`, {
            method:'GET',
            headers:{
                'x-access-token': userToken,
            }
        })
        .then(res => {
            console.log('OOOOO');
            console.log(res)
            return res.text();
        })
        .then(res => {
            console.log(res)
            this.setState({info: res})
        })
        .catch(err => console.err)
    }

    componentDidMount = async () => {
        let sosId = this.props.navigation.getParam('id')
        await this.fetchSOS(sosId);
    }

    render(){
        console.info(this.state.info)
        return (
            <Text>Sos</Text>
        )
    }
}