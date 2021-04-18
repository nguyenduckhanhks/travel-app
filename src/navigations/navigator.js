import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from './bottomTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
        >
            <Stack.Screen name="Home" component={BottomTabNavigator} />
        </Stack.Navigator>
    )
}

export default StackNavigator;