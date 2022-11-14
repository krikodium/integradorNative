import { View, Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {Component} from "react";
import Login from "../screens/Login/Login";
import Register from '../screens/Register/Register'
import Posts from "../screens/Posts/Posts";
import TabNavigation from './TabNavigation'
import { auth } from "../firebase/config";
import Comments from '../screens/Comments/Comments'
import Home from "../screens/Home/Home";

const Stack = createNativeStackNavigator()

class MainNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            estadoInicial:'Login'
        }
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.state.estadoInicial}>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>
                    <Stack.Screen name="Comments" component={Comments}/>
                    <Stack.Screen name="Home" component={Home}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default MainNavigation