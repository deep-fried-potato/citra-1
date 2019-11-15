import React, {Component} from 'react';
import {Platform, Keyboard} from 'react-native';
import {BottomTabBar} from "react-navigation-tabs";

class TabBarComponent extends Component{
    state = {
        visible:true
    }

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        if(Platform.OS === 'android'){
            this.keyboardEventListeners = [
                Keyboard.addListener('keyboardDidShow', this.visible(false)),
                Keyboard.addListener('keyboardDidHide', this.visible(true))
            ];
        }
    }

    componentWillUnmount(): void {
        this.keyboardEventListeners && this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
    }

    visible = visible => () => this.setState({visible});

    render(){
        if(!this.state.visible){
            return null;
        }else{
            return(
                <BottomTabBar {...this.props} />
            )
        }
    }
}

export default TabBarComponent;
