import React, {Component} from 'react';
import {Drawer} from "native-base";
import Sidebar from "./sidebar";

class sideNav extends Component {

    render() {
        return (
            <Drawer
                ref={(ref) => {this.drawer = ref;}}
                content={<Sidebar navigator={this.navigator}/>}
                onClose={() => this.closeDrawer()}
            />
        );
    }
}

export default sideNav;
