import React from 'react';
import { Text, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';
import { Button, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function PlaygroundPage({ navigation, route }: RoutePropsHelper<'Playground'>) {
    return (
        <ContentPadding>
            <ScrollView style={{flex: 1}}>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('CreateTask');
                }}>To Create Task</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('TaskAccepted');
                }}> To Accepted task</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('FindTask');
                }}>To Find task</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('Register');
                }}>To Register</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('Home');
                }}>To Home</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('Tasks');
                }}>To Tasks</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('TaskCompleted');
                }}>To Task completed</Button>
                <Divider style={{margin: 10}}/>
                <Button mode="contained" onPress={() => {
                    navigation.navigate('HelpDetails');
                }}>To Help Details</Button>
            </ScrollView>
        </ContentPadding>
    );
}