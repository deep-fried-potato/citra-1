import React, {Component} from 'react';
import axios from "axios";
import {View, SafeAreaView, Image, TouchableOpacity, ScrollView, PermissionsAndroid, AsyncStorage} from "react-native";
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
    Header,
    Toast
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import AwesomeAlert from 'react-native-awesome-alerts';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Config from "react-native-config";
import Geolocation from '@react-native-community/geolocation';
import ImageCropPicker from 'react-native-image-crop-picker';
import {styles, multiSelect} from "./styles";
import session from '../../../api/session'
import {RNS3} from 'react-native-aws3';

const options = {
    keyPrefix: Config.AWS_S3_FOLDER,
    bucket: Config.AWS_S3_BUCKET,
    region: Config.AWS_REGION,
    accessKey: Config.AWS_ACCESS_KEY,
    secretKey: Config.AWS_SECRET_KEY,
    successActionStatus: 201
}

const items = [
    // this is the parent or 'item'
    {
        name: 'Garbage',
        id: 1,
    },
    {
        name: 'Water',
        id: 2,
    },
    {
        name: 'Pest',
        id: 3,
    },
    {
        name: 'Infrastructure',
        id: 4,
    },
    {
        name: 'Other',
        id: 5,
    },
];


class PostCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            description: null,
            media: [],
            mediaType: null,
            typeOfIssue: [],
            location: null,
            showAlert: false
        };
        this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
    }

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

    _getCurrentPositionAsync = () => {
        return new Promise(function (resolve, reject) {
            Geolocation.getCurrentPosition(resolve, reject);
        }).then((position) => {
            return position;
        })
            .catch((err) => {
                console.log(err);
            });
    }

    _setCurrentLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You are accessing the location');
                let position = await this._getCurrentPositionAsync();
                console.log(position)
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                })
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    async componentDidMount(): void {
        await this._setCurrentLocation();
    }


    onSelectedItemsChange(typeOfIssue) {
        this.setState({typeOfIssue});
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

    handlePost = () => {
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

                    await session.post('/resident/addIssue', {
                        'title':this.state.title,
                        'location':{'lat':this.state.location.latitude, 'lng':this.state.location.longitude},
                        'description':this.state.description,
                        'photo':this.state.media,
                        'typeOfIssue':'Civic Issue',
                        'tags':this.state.typeOfIssue
                    }, {headers: headers})
                        .then(()=>{
                            console.log("url data ", {
                                'title':this.state.title,
                                'location':{'lat':this.state.location.latitude, 'lng':this.state.location.longitude},
                                'description':this.state.description,
                                'photo':this.state.media,
                                'typeOfIssue':'Civic Issue',
                                'tags':this.state.typeOfIssue
                            })
                            this.hideAlert()
                            this.props.navigation.navigate('Home')
                        })
                        .catch((error)=>{
                            console.log("url data ", {
                                'title':this.state.title,
                                'location':{'lat':this.state.location.latitude, 'lng':this.state.location.longitude},
                                'description':this.state.description,
                                'photo':this.state.media,
                                'typeOfIssue':'Civic Issue',
                                'tags':this.state.typeOfIssue
                            })
                            this.hideAlert()
                            Toast.show({
                                text:'Something Went Wrong',
                                type:'danger'
                            })
                            console.log(error.response)
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
    };

    render() {
        const {goBack} = this.props.navigation;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <Container>
                    <Header style={styles.banner}>
                        <Left>
                            <TouchableOpacity onPress={() => goBack()}>
                                <Icon color="#000" size={20} name="arrow-left"></Icon>
                            </TouchableOpacity>
                        </Left>
                        <Body/>
                        <Right>
                            <Button onPress={() => this.handlePost()} style={styles.btn} rounded small><Text>Post</Text></Button>
                        </Right>
                    </Header>
                    <ScrollView>
                        <AwesomeAlert
                            show={this.state.showAlert}
                            showProgress={true}
                            title="Loading Images"
                            message="Almost Done!"
                            closeOnTouchOutside={false}
                            closeOnHardwareBackPress={true}
                        />
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
                                    uniqueKey="name"
                                    subKey="children"
                                    selectText="Choose Issues..."
                                    showDropDowns={true}
                                    readOnlyHeadings={false}
                                    onSelectedItemsChange={this.onSelectedItemsChange}
                                    selectedItems={this.state.typeOfIssue}
                                    itemNumberOfLines={1}
                                    selectLabelNumberOfLines={1}
                                    styles={multiSelect}/>
                            </View>

                            <Textarea
                                value={this.state.description}
                                onChangeText={(description) => this.setState({description})}
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
