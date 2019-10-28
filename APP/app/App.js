import React from "react"
import AppContainer from "./config/route"
import {Root} from "native-base";
import Footer from "./components/footer";
import Drawer from "./components/drawer"

export default () =>
    <Root>
        <Drawer/>
        <AppContainer/>
        <Footer/>
    </Root>
