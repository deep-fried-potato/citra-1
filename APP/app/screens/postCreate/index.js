import React, {Component} from 'react';
import axios from "axios";
import {View, SafeAreaView, Image, TouchableOpacity, ScrollView} from "react-native";
import {Container, Textarea, Form, Footer, Grid, Col, Item, Input, Left, Body, Right, Button, Text, Header} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Banner from "../../components/banner";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Config from "react-native-config";
import Geolocation from '@react-native-community/geolocation';
import { RNS3 } from 'react-native-aws3';
import ImageCropPicker from 'react-native-image-crop-picker';
import {styles, multiSelect} from "./styles";

const items = [
    // this is the parent or 'item'
    {
        name: 'Garbage',
        id: 1,
        // these are the children or 'sub items'
        children: [
            {
                name: 'No Dustbin',
                id: 10,
            },
            {
                name: 'Litter',
                id: 11,
            },
        ],
    },
    {
        name: 'Water',
        id: 2,
        // these are the children or 'sub items'
        children: [
            {
                name: 'Sewage Leakage',
                id: 20,
            },
            {
                name: 'Leaking Taps',
                id: 21,
            },
        ],
    }
];


class PostCreate extends Component {

    componentDidMount(): void {
        Geolocation.watchPosition(position => {
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    error: null
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 200000, maximumAge: 0});
    }

    constructor(props) {
        super(props)
        this.state = {
            title: null,
            description: null,
            media: [],
            mediaType: null,
            inputRows: 20,
            selectedItems: [],
            location: null,
            token: null
        };
        this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
    }


    onSelectedItemsChange(selectedItems) {
        this.setState({selectedItems});
    }

    handleCamera() {
        ImageCropPicker.openCamera({cropping: true})
        .then(image => {
            this.setState({
                media: [...this.state.media, image.path],
            })
        });
    };

    handleChoosePhoto = () => {
        ImageCropPicker.openPicker({
            multiple: true
        }).then(images => {
            this.setState({
                media: [...this.state.media, ...images.map(image => image.path)]
            })
        });
    };

    handlePost = () => {
        const options = {
            keyPrefix: Config.AWS_S3_FOLDER,
            bucket: Config.AWS_S3_BUCKET,
            region: Config.AWS_REGION,
            accessKey: Config.AWS_ACCESS_KEY,
            secretKey: Config.AWS_SECRET_KEY,
            successActionStatus: 201
        }
        console.log("options are ", options)
        // var mediaUrls = []
        // this.state.media.map(
        //     image =>{
        //         console.log("image is ", image, " and file name is ", image.replace(/^.*[\\\/]/, ''))
        //         RNS3.put({uri:image, name:image.replace(/^.*[\\\/]/, ''), type: "image/jpeg"}, options)
        //             .then((response)=> (mediaUrls.push(response.body.postResponse.location)))
        //     }
        // )

        console.log("state is ", this.state)

        // axios.post('localhost:3000/resident/addIssue',
        //     {
        //         'title': this.state.title,
        //         'description': this.state.description,
        //         'photos': this.state.media,
        //         'typeOfIssue': this.state.selectedItems,
        //         'location': this.state.location
        //     },
        //     {
        //         'headers': {
        //             'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDA3NDkzNTE5ZDQzMmZjNDA2NGI4MyIsImlhdCI6MTU3Mzk2NjQ0NywiZXhwIjoxNTc0MDUyODQ3fQ.81aRz3CmkFRfH65CqpDPtI_F-tIPuEp5OAqCxm3UOMs'
        //         }
        //     })
    };

    render() {
        const {media} = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <Container>
                    <Header style={styles.banner}>
                        <Left>
                            <Icon color="#000" size={20} name="arrow-left"></Icon>
                        </Left>
                        <Body/>
                        <Right>
                            <Button onPress={() => this.handlePost()} style={styles.btn} rounded small><Text>Post</Text></Button>
                        </Right>
                    </Header>
                    <ScrollView>
                        <Form>
                            <Item>
                                <Input placeholder="Title" autoFocus/>
                            </Item>
                            <View style={styles.category}>
                                <SectionedMultiSelect
                                    items={items}
                                    modalWithTouchable
                                    modalWithSafeAreaView
                                    uniqueKey="id"
                                    subKey="children"
                                    selectText="Choose Issues..."
                                    showDropDowns={true}
                                    readOnlyHeadings={true}
                                    onSelectedItemsChange={this.onSelectedItemsChange}
                                    selectedItems={this.state.selectedItems}
                                    itemNumberOfLines={1}
                                    selectLabelNumberOfLines={1}
                                    styles={multiSelect} />
                            </View>

                            <Textarea onChangeT style={styles.description} rowSpan={10}
                                      placeholder="What issue are you facing?"/>
                        </Form>
                        {
                            (media.length != 0) && (
                                media.map((media, key) => (
                                    <Image
                                        key={key}
                                        source={{uri: media}}
                                        style={styles.media}
                                    />)
                                )
                            )
                        }
                    </ScrollView>
                    <Footer style={styles.footer}>
                        <Grid>
                            <Col style={styles.icon}>
                                <TouchableOpacity onPress={() => this.handleCamera()}>
                                    <Icon style={styles.iconStyle} size={30} color="#000" name='camera'></Icon>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.icon}>
                                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                    <Icon style={styles.iconStyle} size={30} color="#000" name='image'></Icon>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </Footer>
                </Container>
            </SafeAreaView>
        );
    }
}

export default PostCreate;
