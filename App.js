import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import { View } from 'react-native';

import StackNavigator from './src/navigations/navigator';

const customFonts = {
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
};


export default function App() {
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
      return (
        <View></View>
      )
  }

  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  );
}
