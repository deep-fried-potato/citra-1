import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {Container, Textarea, Form, Footer, Grid, Col, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Banner from "../components/banner";
import ImagePicker from "react-native-image-picker";

const styles = StyleSheet.create({
    contentContainerStyle:{flex:1},
    footer: {position: 'absolute', bottom: 0, backgroundColor: 'white'},
    icon: {justifyContent: 'center'},
    iconStyle: {alignSelf: 'center'},
    media:{position:'absolute',display:'flex',width: "95%", height: 200, borderRadius:10, margin:10}
});

class PostCreate extends Component {
    state = {
        media:null,
        mediaType:null,
        inputRows:20
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
                this.setState({
                    media:response,
                    mediaType:'image'
                });
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
                this.setState({
                    media:response,
                    mediaType:'video'
                });
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
                this.setState({
                    media: response,
                    mediaType:'image'
                });
            }
        });
    };

    render() {
        const {media} = this.state;
        return (
            <Container>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    <Form>
                        <Item stackedLabel>
                            <Label>Issue Title</Label>
                            <Input />
                        </Item>
                        <Textarea autoFocus style={{marginHorizontal:10}} rowSpan={this.state.media? 13:this.state.inputRows}
                                  placeholder="What issue are you facing?"/>
                    </Form>
                    {this.state.media && (
                        <View>
                            <Image
                                source={{uri: media.uri}}
                                style={styles.media}
                            />
                        </View>
                    )}
                </ScrollView>
                <View>
                    <Footer style={styles.footer}>
                        <Grid>
                            <Col style={styles.icon}>
                                <TouchableOpacity onPress={() => this.handleCamera()}>
                                    <Icon style={styles.iconStyle} size={30} color="#000" name='camera'></Icon>
                                </TouchableOpacity>
                            </Col>
                            {/*<Col style={styles.icon}>*/}
                            {/*    <TouchableOpacity onPress={() => this.handleVideo()}>*/}
                            {/*        <Icon style={styles.iconStyle} size={30} color="#000" name='video'></Icon>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</Col>*/}
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
