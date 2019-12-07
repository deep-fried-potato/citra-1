import React, {Component} from 'react';
import axios from "axios";
import {View, SafeAreaView, Image, TouchableOpacity, ScrollView} from "react-native";
import {
    Container,
    Textarea,
    Form,
    Footer,
    Grid,
    Col,
    Item,
    Input,
    Left,
    Body,
    Right,
    Button,
    Text,
    Header
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Banner from "../../components/banner";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Config from "react-native-config";
import Geolocation from '@react-native-community/geolocation';
import ImageCropPicker from 'react-native-image-crop-picker';
import {styles, multiSelect} from "./styles";
import post from "../../api/post"

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
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            description: null,
            media: [],
            mediaType: null,
            selectedItems: [],
            location: null,
        };
        this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
    }

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


    onSelectedItemsChange(selectedItems) {
        this.setState({selectedItems});
    }

    handleCamera() {
        ImageCropPicker.openCamera({cropping: true})
            .then(image => {
                this.setState({
                    media: [...this.state.media, image.path],
                    mediaType: 'image/jpeg'
                })
            });
    };

    handleChoosePhoto = () => {
        ImageCropPicker.openPicker({
            multiple: true
        }).then(images => {
            this.setState({
                media: [...this.state.media, ...images.map(image => image.path)],
                mediaType: 'image/jpeg'
            })
        });
    };

    handlePost = () => post.createIssue(...this.state);

    render() {
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
                                <Input
                                    value={this.state.title}
                                    onChangeText={(title) => this.setState({title})}
                                    placeholder="Title"
                                    autoFocus/>
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
                                    styles={multiSelect}/>
                            </View>

                            <Textarea
                                value={this.state.description}
                                onChangeText={(description)=>this.setState({description})}
                                style={styles.description}
                                rowSpan={10}
                                placeholder="What issue are you facing?"/>
                        </Form>
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
