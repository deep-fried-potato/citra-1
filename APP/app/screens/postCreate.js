import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {Container, Header, Content, Textarea, Form, Footer, FooterTab, Button, Icon, Text} from 'native-base';
import Banner from "../components/banner";

const styles = StyleSheet.create({
    footer:{position:'absolute' ,bottom:0}
});

class PostCreate extends Component {
    render() {
        return (
            <Container>
                <View>
                    <Form>
                        <Textarea style={{margin:10}} bordered rowSpan={3} placeholder="What issue are you facing?"></Textarea>
                    </Form>
                </View>

                    <Footer style={styles.footer}>
                        <FooterTab style={{backgroundColor:'white'}}>
                            <Button vertical>
                                <Icon name="apps" />
                                <Text>Apps</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="camera" />
                                <Text>Camera</Text>
                            </Button>
                            <Button vertical active>
                                <Icon active name="navigate" />
                                <Text>Navigate</Text>
                            </Button>
                            <Button vertical>
                                <Icon name="person" />
                                <Text>Contact</Text>
                            </Button>
                        </FooterTab>
                    </Footer>

            </Container>
        );
    }
}

export default PostCreate;
