import React, {Component} from 'react'
import {Text, AsyncStorage} from 'react-native'
import Config from 'react-native-config';

export default class Sosinfo extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    fetchSOS = async (sosId) => {
        let userToken = AsyncStorage.getItem('userToken');
        fetch(`http://'+Config.BASE_URL+':3000/auth/residentLogin/${sosId}`, {
            method:'GET',
            headers:{
                'x-access-token': userToken,
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.err)
    }

    componentDidMount = async () => {
        let sosId = this.props.navigation.getParam('id')
        await this.fetchSOS(sosId);
    }

    render(){
        
        return (
            <Text>Sos</Text>
        )
    }
}