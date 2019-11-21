<<<<<<< HEAD
import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./screens/auth/LoginScreen"
import SignupScreen from "./screens/auth/SignupScreen"
import Authloadingscreen from "./screens/Authloading"
import ForgotauthScreen from "./screens/forgotauth"
import Homescreen from './screens/home'
import Feedscreen from './screens/feed'
import Postscreen from './screens/postDetail'


const appStack = createStackNavigator({
    homescreen : {screen: Homescreen},
    feedscreen: {screen: Feedscreen},
    postscreen: {screen: Postscreen},
},{
    headerMode : 'none'
})


const authStack = createSwitchNavigator({
    loginscreen: {screen: LoginScreen},
    signupscreen: {screen: SignupScreen},
    forgotauth: {screen: ForgotauthScreen},
},{
    initialRouteName: 'loginscreen',
    headerMode : 'none'
})

export default createAppContainer(createSwitchNavigator({
    Authloading : Authloadingscreen,
    Auth: authStack,
    App : appStack,
},{
    initialRouteName: 'Authloading',
}
));

=======
import React from "react";

import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import {Root} from "native-base";


export default () =>
    <Root>
        <Footer/>
    </Root>
>>>>>>> 5df52166c1cf53b963f76c35663b37b80bbb956b
