import React, {Component} from 'react';
import axios from "axios";
import {View, StyleSheet, Image, TouchableOpacity, ScrollView} from "react-native";
import {
    Container,
    Textarea,
    Form,
    Footer,
    Grid,
    Col,
    Item,
    Input,
    Label,
    Picker,
    Left,
    Body,
    Right,
    Button, Text, Header
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Banner from "../components/banner";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import ImagePicker from "react-native-image-picker";

const styles = StyleSheet.create({
    banner:{backgroundColor:'white'},
    contentContainerStyle:{flex:1},
    footer: {position: 'absolute', bottom: 0, backgroundColor: 'white'},
    icon: {justifyContent: 'center'},
    iconStyle: {alignSelf: 'center'},
    media:{position:'absolute',display:'flex',width: "95%", height: 200, borderRadius:10, margin:10},
    multiSelect:{
        chipContainer:{
            backgroundColor:'blue', borderWidth:0
        },
        chipIcon:{
            color: 'white'
        },
        chipText:{
            color:'white'
        },
        item: {
            paddingHorizontal: 10,
        },
        subItem: {
            paddingHorizontal: 10,
        },
        selectedItem: {
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        selectedSubItem: {
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        scrollView: { paddingHorizontal: 0 },
    }
});

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
    constructor(props){
        super(props)
        this.state = {
            title:null,
            description:null,
            media:null,
            mediaType:null,
            inputRows:20,
            selectedItems: [],
            location:null,
            token:null
        };
        this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
    }


    onSelectedItemsChange(selectedItems) {
        this.setState({selectedItems});
    }

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
                    media:response.data,
                    mediaType:'image',
                    location:{
                        lat:response.latitude,
                        lng:response.longitude
                    }
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
                    media:response.data,
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
                    media: response.data,
                    mediaType:'image',
                    location:{
                        lat:response.latitude,
                        lng:response.longitude
                    }
                });
            }
        });
    };

    handlePost = () => {
        axios.post('http://139.59.75.22:3000/resident/addIssues',
            {
                'title':this.state.title,
                'description':this.state.description,
                'photo':this.state.media,
                'typeOfIssue':this.state.selected2,
                'location':this.state.location
            },
            {
                'headers':{
                    'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDA3NDkzNTE5ZDQzMmZjNDA2NGI4MyIsImlhdCI6MTU3Mzk2NjQ0NywiZXhwIjoxNTc0MDUyODQ3fQ.81aRz3CmkFRfH65CqpDPtI_F-tIPuEp5OAqCxm3UOMs'
                }
            })
    }

    render() {
        const {media} = this.state;
        return (
            <Container>
                <Header style={styles.banner}>
                    <Left>
                        {/*<Icon color="#000" size={20} name="arrow-left"></Icon>*/}
                    </Left>
                    <Body/>
                    <Right>
                        <Button onPress={()=>this.handlePost()} style={styles.btn} rounded small>
                            <Text>Post</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    <Form>
                        <Item stackedLabel>
                            <Label>Issue Title</Label>
                            <Input autoFocus />
                        </Item>
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
                            styles={styles.multiSelect}
                        />

                        <Textarea bordered style={{marginHorizontal:10}} rowSpan={5}
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
