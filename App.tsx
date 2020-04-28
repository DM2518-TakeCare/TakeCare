import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { RootStack } from './src/router';
import HomePage from './src/pages/home-page';
import PlaygroundPage from './src/pages/playground-page';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from './src/theme/paper-theme';
import { AppBar } from './src/components/app-bar';
import Settings from './src/pages/settings';
import CreateTask from './src/pages/create-task';
import TasksPage from './src/pages/tasks-page';
import TaskCompleted from './src/pages/task-completed';
import TaskAccepted from './src/pages/task-accepted';

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
          >
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
              name='Home' 
              component={HomePage} />
            <RootStack.Screen 
              name='Playground'
              options={{
                // Custom header with actionIcon
                header: (headerProps) => (
                  <AppBar headerProps={headerProps} actionIcon={'hospital'}/>
                ),
              }}
              component={PlaygroundPage} />
            <RootStack.Screen 
              name='CreateTask'
              options={{
                title: 'Receive Help',
                header: (headerProps) => (
                  <AppBar headerProps={headerProps} actionIcon={'send'} onActionClick={() => {} /*TODO*/}/>
                ),
              }}
              component={CreateTask} />
            <RootStack.Screen 
              name='Tasks'
              options={{
                title: 'Tasks',
                header: (headerProps) => (
                  <AppBar headerProps={headerProps}/>
                ),
              }}
              component={TasksPage} />
            <RootStack.Screen 
              name="TaskCompleted"
              options={{
                title: '',
                header: (headerProps) => (
                  <AppBar blendIn disableBackAction headerProps={headerProps}  actionIcon={'window-close'} onActionClick={() => {} /*TODO*/}/>
                ),
              }}
              component={TaskCompleted} />
            <RootStack.Screen 
              name="Settings"
              options={{
                title: "Settings",
                header: (headerProps) => (
                  <AppBar headerProps={headerProps}/>
                ),
              }}
              component={Settings} />
            <RootStack.Screen 
              name="TaskAccepted"
              options={{
                title: "Your task",
                header: (headerProps) => (
                  <AppBar headerProps={headerProps}/>
                ),
              }}
              component={TaskAccepted} />
          </RootStack.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </PaperProvider>
  );
}