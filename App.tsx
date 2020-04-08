import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { RootStack } from './src/router';
import HomePage from './src/pages/home-page';
import PlaygroundPage from './src/pages/playground-page';

export default function App() {
  return (
    <NavigationContainer>
      {/* If you want to add a new page, you must first add the page name in router.tsx */}
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomePage} />
        <RootStack.Screen name="Playground" component={PlaygroundPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}