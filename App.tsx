import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { RootStack } from './src/router';
import HomePage from './src/pages/home-page';
import PlaygroundPage from './src/pages/playground-page';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/theme/paper-theme';
import { AppBar } from './src/components/app-bar';
import FindTaskPage from './src/pages/find-task-page';

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        {/* If you want to add a new page, you must first add the page name in router.tsx */}
        <RootStack.Navigator 
          initialRouteName='Home'
          headerMode='screen'
          screenOptions={{
            header: (headerProps) => (
              <AppBar headerProps={headerProps}/>
            ),
          }}>
          <RootStack.Screen
            name="Home" 
            component={HomePage} />
          <RootStack.Screen
            name="FindTask" 
            options={{
              headerTitle: "Find task"
            }}
            component={FindTaskPage} />
          <RootStack.Screen 
            name="Playground"
            options={{
              // Custom header with actionIcon
              header: (headerProps) => (
                <AppBar headerProps={headerProps} actionIcon={"hospital"}/>
              ),
            }}
            component={PlaygroundPage} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}