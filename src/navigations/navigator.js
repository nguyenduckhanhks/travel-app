import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from './bottomTabNavigator';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import PostsDetail from '../screens/PostsDetail';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Signup'}
        >
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="PostsDetail" component={PostsDetail} />
        </Stack.Navigator>
    )
}

export default StackNavigator;