import React, {Component} from 'react';
import { View, StyleSheet, AsyncStorage,TouchableOpacity, Image} from "react-native";
import {Container, CardItem, Left,Input, Button, Body, Right, Icon, Card, Item, Text, ActionSheet,Content} from 'native-base';
import Banner from '../../components/banner';
import Config from "react-native-config"
import axios from 'axios'
import Modal from 'react-native-modal'


var BUTTONS = [
    // { text: "Email", icon: "analytics", iconColor: "#f42ced" },
    { text: "Contact number", icon: "aperture", iconColor: "#ea943b" },
    { text: "Emergency Contact", icon: "analytics", iconColor: "#f42ced" },
    { text: "Blood Group", icon: "aperture", iconColor: "#ea943b" },
    { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
  ];


var DESTRUCTIVE_INDEX = 5;
var CANCEL_INDEX = 6;
class EditProfile extends Component {
    static navigationOptions = {
        title:'Profile',
        drawerLabel:"editProfile",
    }

    constructor(props){
        super(props)
        this.state={
            profile:{},
            isModalVisible: false,
            text:'',
            selected: 9,
            userToken:''
        }
    }

    toggleDrawer = async () => {
        await this.props.navigation.toggleDrawer();
    }

    getUser = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        this.setState({userToken})
        axios.get('http://'+Config.BASE_URL+':3000/resident/profile', {
            headers: {
                'x-access-token': userToken,
            }
        })
        .then(resjson => {
            this.setState({profile: resjson.data})
            // console.log(resjson.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    _updateProfile = () => {
        if (this.state.text === '' || this.state.selected > 5){
            this.toggleModal()
        }
        else{
            let key = BUTTONS[this.state.selected]['text']

            fetch('http://'+Config.BASE_URL+':3000/resident/updateProfile', {
                method: 'PUT',
                headers:{
                    Accept: 'application/json',
                    'x-access-token': this.state.userToken,
                    'Content-Type': 'application/json'  
                },
                body:{
                    key: this.state.text
                }
            })
            .then(res=>res)
            .then(res=>{
                console.log(res.json())
                this.toggleModal()
                alert('Information Updated')
                return
            })
            .catch(err => console.log(err))
        }
    }

    componentDidMount = () => {
        this.getUser()
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        console.log('state', this.state.profile.name)
        return (
            <Container>
            <Banner name="Home" _toggledrawer={this.toggleDrawer}/>
            <Content style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                    <Text style={styles.name}>{this.state.profile.name}</Text>
                    <Text style={styles.info}>Reward Credits {this.state.profile.rewardCredits}</Text>
                    

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                        ActionSheet.show(
                            {
                              options: BUTTONS,
                              cancelButtonIndex: CANCEL_INDEX,
                              destructiveButtonIndex: DESTRUCTIVE_INDEX,
                              title: "Update"
                            },
                            buttonIndex => {
                                console.log(buttonIndex)
                                if (buttonIndex === 6){
                                    return
                                }
                                else{       
                                // if(BUTTONS[buttonIndex]['text'] === 'Email'){
                                //     this.setState({selected:0})
                                //     this.toggleModal()
                                // }
                                if(BUTTONS[buttonIndex]['text'] === 'Contact number'){
                                    this.setState({selected:1})
                                    this.toggleModal()
                                }
                                else if(BUTTONS[buttonIndex]['text'] === 'Emergency Contact'){
                                    this.setState({selected:2})
                                    this.toggleModal()
                                }
                                else if(BUTTONS[buttonIndex]['text'] === 'Blood Group'){
                                    this.setState({selected:3})
                                    this.toggleModal()
                                }
                                else if(BUTTONS[buttonIndex]['text'] === 'Delete'){
                                    alert()
                                }
                                else { return }
                            }
                            }
                          )}
                    }>
                    <Text>Update Profile</Text>  
                </TouchableOpacity> 
                    </View>
                </View>
        
                <View style={{ flex: 1 }}>
                        <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1 }}>
                        <Card >
                            <CardItem >
                            <Item regular>
                                <Input 
                                placeholder='Enter'
                                onChangeText={text => this.setState({text})}
                                value={this.state.text}
                                />
                            </Item>
                            </CardItem>
                            <CardItem>
                                <TouchableOpacity style={styles.submitbuttonContainer} onPress={this._updateProfile}>
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitbuttonContainer} onPress={this.toggleModal}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </CardItem>
                        </Card>
                        </View>
                        </Modal>
                </View>
        </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    submitbuttonContainer: {
        marginTop:10,
        height:35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
  });

export default EditProfile;
