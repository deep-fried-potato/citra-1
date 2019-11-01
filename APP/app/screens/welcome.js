import React from 'react';
import {Text} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Button,
    Title,
} from 'native-base'
import styles from './styles.js';

class WelcomeScreen extends React.Component{
    render(){
        return(
            <Container>
                <Header>
                    <Title> Citra </Title>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Text>Track your issues with Citra</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Join Now</Text>
                        </CardItem>
                    </Card>   
                    <Button bordered
                        onPress = {() => {this.props.navigation.navigate('loginscreen')}}>
                        <Text>Login</Text>
                    </Button>
                    <Button bordered
                        onPress = {() => {this.props.navigation.navigate('signupscreen')}}>
                        <Text>SignUp</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
} 

export default WelcomeScreen;