import React, {Component} from 'react';
import {Container, Footer, FooterTab, Button, Icon, Text, Badge} from "native-base";
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';

class Footer extends Component {
    render() {
        return (
            <Container>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <MaterialIcons name={'home'}></MaterialIcons>
                            <Text>Home</Text>
                        </Button>
                        <Button vertical>
                            <MaterialIcons name={'search'}></MaterialIcons>
                            <Text>Search</Text>
                        </Button>
                        <Button badge vertical>
                            <Badge><Text>2</Text></Badge>
                            <MaterialIcons name={'add_circle'}></MaterialIcons>
                            <Text>Post</Text>
                        </Button>
                        <Button active badge vertical>
                            <Badge><Text>51</Text></Badge>
                            <Icon active name="notifications"></Icon>
                            <Text>Notifications</Text>
                        </Button>
                        <Button vertical>
                            <MaterialIcons name={'warning'}></MaterialIcons>
                            <Text>SOS</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Footer;
