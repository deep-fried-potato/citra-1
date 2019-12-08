import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {styles} from "../create/styles";
import {Body, Header, Left, Right, Button} from "native-base";
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/Feather";

var radio_props = [
    {label: 'No', value: 0},
    {label: 'Yes', value: 1}
];

class VerifyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            media: []
        }
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

    render() {
        const {goBack} = this.props.navigation;
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
                                onPress={(value) => {
                                    this.setState({value: value});
                                    console.log("value is ", this.state.value);
                                }}
                            />
                        </View>
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
                        </TouchableOpacity>
                        {
                            (this.state.media.length != 0) && (
                                this.state.media.map((media, key) => (
                                    <Image
                                        key={key}
                                        source={{uri: media}}
                                        style={styles.media}
                                    />)
                                )
                            )
                        }
                        <View>
                            <Button rounded block style={{marginVertical: 50, backgroundColor: 'blue'}}>
                                <Text style={{color: 'white'}}>Submit</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default VerifyPost;
