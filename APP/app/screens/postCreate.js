import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {Container, Textarea, Form, Footer, Grid, Col} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Banner from "../components/banner";
import ImagePicker from "react-native-image-picker";

const styles = StyleSheet.create({
    footer: {position: 'absolute', bottom: 0, backgroundColor: 'white'},
    icon: {justifyContent: 'center'},
    iconStyle: {alignSelf: 'center'}
});

class PostCreate extends Component {
    state = {
        media:null
    };

    handleCamera = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchCamera(options,(response => {
            if(response.uri){
                console.log("Image is ", response);
                this.setState({media:response});
            }
        }))
    };

    handleVideo = () => {
        const options = {
            mediaType: 'video',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchCamera(options,(response => {
            if(response.uri){
                this.setState({media:response});
            }
        }))
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                console.log("Gallery image is ", response);
                this.setState({media: response});
            }
        });
    };

    render() {
        const {media} = this.state;
        return (
            <Container>
                <ScrollView contentContainerStyle={{flex:1}}>
                    <Form>
                        <Textarea bordered autoFocus style={{marginHorizontal:10}} rowSpan={15}
                                  placeholder="What issue are you facing?"/>
                    </Form>
                </ScrollView>
                <View style={{flex:0.4}}>
                    {media && (
                        <Image
                            source={{uri: media.uri}}
                            style={{width: 64, height: 64}}
                        />
                    )}
                    <Footer style={styles.footer}>
                        <Grid>
                            <Col style={styles.icon}>
                                <TouchableOpacity onPress={() => this.handleCamera()}>
                                    <Icon style={styles.iconStyle} size={30} color="#000" name='camera'></Icon>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.icon}>
                                <TouchableOpacity onPress={() => this.handleVideo()}>
                                    <Icon style={styles.iconStyle} size={30} color="#000" name='video'></Icon>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.icon}>
                                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                    <Icon style={styles.iconStyle} size={30} color="#000" name='image'></Icon>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </Footer>
                </View>
            </Container>
        );
    }
}

export default PostCreate;
