import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, AsyncStorage} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {styles} from "../create/styles";
import {Body, Header, Left, Right, Button, Toast} from "native-base";
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/Feather";
import {RNS3} from 'react-native-aws3';
import session from "../../../api/session";
import Config from "react-native-config";
import AwesomeAlert from "react-native-awesome-alerts";

const options = {
    keyPrefix: Config.AWS_S3_FOLDER,
    bucket: Config.AWS_S3_BUCKET,
    region: Config.AWS_REGION,
    accessKey: Config.AWS_ACCESS_KEY,
    secretKey: Config.AWS_SECRET_KEY,
    successActionStatus: 201
}

var radio_props = [
    {label: 'No', value: 0},
    {label: 'Yes', value: 1}
];

class VerifyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positive: 0,
            media: [],
            showAlert:false
        }
    };

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    handleCamera() {
        console.log("camera called")
        ImageCropPicker.openCamera({cropping: true})
            .then(image => {
                this.setState({
                    media: [...this.state.media, image.path],
                    mediaType: 'image/jpeg'
                })
            });
    };

    handleVerificationSubmit(){
        var mediaUrls = []
        this.showAlert()
        this.state.media.map(
            async file => await RNS3.put({
                uri: file,
                name: file.replace(/^.*[\\\/]/, ''),
                type: this.state.mediaType
            }, options)
                .then(response => {
                    mediaUrls.push(response.body.postResponse.location)
                })
                .then(() => {
                    this.setState({media: mediaUrls})
                    console.log("metrics are ", this.state)
                })
                .then(async () => {
                    const headers = {
                        'Content-Type': 'application/json',
                        'x-access-token': await AsyncStorage.getItem('userToken')
                    };
                    const {showAlert, ...verifyIssue} = this.state
                    await session.post('/verifyIssue', {...this.state}, {headers: headers})
                        .then(()=>{
                            this.hideAlert()
                            this.props.navigation.navigate()
                        })
                        .catch((error)=>{
                            this.hideAlert()
                            Toast.show({
                                text:'Something Went Wrong',
                                type:'danger'
                            })
                            console.log(error)
                        })
                })
                .catch(error =>{
                    Toast.show({
                        text:'Something Went Wrong',
                        type:'danger'
                    })
                    console.log("error is ", error)
                })
        );
    }

    render() {
        const {goBack} = this.props.navigation;
        const imageBlock = (this.state.media.length == 0)?(
            <TouchableOpacity onPress={() => this.handleCamera()} style={{
                padding: 10,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderRadius: 10,
                borderColor: '#d6d7da'
            }}>
                <Text style={{
                    marginVertical: 10,
                    textAlign: 'center',
                    fontSize: 17,
                    letterSpacing: 1,
                    color: '#808080'
                }}>Click Here To Capture The Image of Resolved Issue</Text>
                <Icon name="camera" size={40} color="#808080"
                      style={{alignSelf: 'center'}}></Icon>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={true}
                    title="All Set"
                    message="Almost Done"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={true}
                />
            </TouchableOpacity>
        ):(
            this.state.media.map((media, key) => (
                <Image
                    key={key}
                    source={{uri: media}}
                    style={styles.media}
                />)
        ))

        return (
            <SafeAreaView>
                <ScrollView>
                    <Header style={styles.banner}>
                        <Left>
                            <TouchableOpacity onPress={() => goBack()}>
                                <Icon color="#000" size={20} name="arrow-left"></Icon>
                            </TouchableOpacity>
                        </Left>
                        <Body/>
                        <Right/>
                    </Header>
                    <View style={{marginHorizontal: 20, marginVertical: 40,}}>
                        <View style={{
                            marginVertical: 20,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: '#d6d7da',
                        }}>
                            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Is this issue
                                resolved?</Text>
                            <RadioForm
                                style={{marginVertical: 20, flex: 0, justifyContent: 'space-around'}}
                                formHorizontal={true}
                                animation={true}
                                radio_props={radio_props}
                                initial={0}
                                onPress={(positive) => {
                                    this.setState({positive: positive});
                                    console.log("positive is ", this.state.positive);
                                }}
                            />
                        </View>
                        {
                            imageBlock
                        }
                        <View>
                            <Button rounded block onPress={()=>this.handleVerificationSubmit()} style={{marginVertical: 50, backgroundColor: 'blue'}}>
                                <Text style={{color:  'white'}}>Submit</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default VerifyPost;
