import React, {Component} from 'react';
import {Container, Footer, FooterTab, Button, Icon, Text, Badge} from "native-base";
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';

class Footer extends Component {

    constructor(props){
        super(props);
        super();
        this.state = {
            tab1:true,
            tab2:false,
            tab3:false,
            tab4:false,
            tab5:false
        }
    }

    toggleTab1(){
        this.setState({
            tab1:true,
            tab2:false,
            tab3:false,
            tab4:false,
            tab5:false
        });
    }

    toggleTab2(){
        this.setState({
            tab1:false,
            tab2:true,
            tab3:false,
            tab4:false,
            tab5:false
        });
    }

    toggleTab3(){
        this.setState({
            tab1:false,
            tab2:false,
            tab3:true,
            tab4:false,
            tab5:false
        });
    }

    toggleTab4(){
        this.setState({
            tab1:false,
            tab2:false,
            tab3:false,
            tab4:true,
            tab5:false,
        });
    }

    toggleTab5(){
        this.setState({
            tab1:false,
            tab2:false,
            tab3:false,
            tab4:false,
            tab5:true,
        });
    }

    render() {
        return (
            <Container>
                <Footer>
                    <FooterTab>
                        <Button
                            onPress={()=>this.toggleTab1()}
                            active={this.state.tab1}
                            vertical>
                            <MaterialIcons active={tihs.state.tab1} name={'home'}></MaterialIcons>
                            <Text>Home</Text>
                        </Button>
                        <Button
                            onPress={()=>this.toggleTab2()}
                            active={this.state.tab2}
                            vertical>
                            <MaterialIcons active={this.state.tab2} name={'search'}></MaterialIcons>
                            <Text>Search</Text>
                        </Button>
                        <Button
                            onPress={()=>this.toggleTab3()}
                            active={this.state.tab3}
                            vertical>
                            <MaterialIcons active={this.state.tab3} name={'add_circle'}></MaterialIcons>
                            <Text>Post</Text>
                        </Button>
                        <Button
                            onPress={()=>this.toggleTab4()}
                            active={this.state.tab4}
                            badge vertical>
                            <Badge><Text>51</Text></Badge>
                            <Icon active={this.state.tab4} name="notifications"></Icon>
                            <Text>Notifications</Text>
                        </Button>
                        <Button
                            onPress={()=>this.toggleTab5()}
                            active={this.state.tab5}
                            vertical>
                            <MaterialIcons active={this.state.tab5} name={'warning'}></MaterialIcons>
                            <Text>SOS</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Footer;
