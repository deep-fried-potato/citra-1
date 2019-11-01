import React from "react";
import AppContainer from "./config/route";
import {Root} from "native-base";
import FooterNav from "./components/footerNav";
import SideNav from "./components/sideNav";

export default () =>
    <Root>
        {/*<SideNav/>*/}
        <AppContainer/>
        <FooterNav/>
    </Root>
