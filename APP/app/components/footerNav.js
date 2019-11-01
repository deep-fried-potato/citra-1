import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Text, Badge} from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    icon: {position: 'relative', marginTop: -16}
});

class FooterNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false,
            tab5: false
        }
    }

    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false,
            tab5: false
        });
    }

    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false,
            tab5: false
        });
    }

    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            tab5: false
        });
    }

    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true,
            tab5: false,
        });
    }

    toggleTab5() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: false,
            tab5: true,
        });
    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => this.toggleTab1()}
                        active={this.state.tab1}
                        vertical>
                        <Icon color="#fff" size={30} active={this.state.tab1} name="home"></Icon>

                    </Button>
                    <Button
                        onPress={() => this.toggleTab2()}
                        active={this.state.tab2}
                        vertical>
                        <Icon color="#fff" size={30} active={this.state.tab2} name="search1"></Icon>

                    </Button>
                    <Button
                        onPress={() => this.toggleTab3()}
                        active={this.state.tab3}
                        vertical>
                        <Icon color="#fff" size={30} active={this.state.tab3} name="pluscircle"></Icon>

                    </Button>
                    <Button
                        onPress={() => this.toggleTab4()}
                        active={this.state.tab4}
                        badge vertical>
                        <Badge><Text>51</Text></Badge>
                        <Icon style={styles.icon} color="#fff" size={30} active={this.state.tab4} name="bells"></Icon>
                    </Button>
                    <Button
                        onPress={() => this.toggleTab5()}
                        active={this.state.tab5}
                        vertical>
                        <Icon color="#fff" size={30} active={this.state.tab5} name="warning"></Icon>

                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default FooterNav;
