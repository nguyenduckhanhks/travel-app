import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './src/navigations/navigator';

export default function App() {
  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  );
}
