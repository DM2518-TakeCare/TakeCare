import React from 'react';
import { Text, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';
import { Button, Divider } from 'react-native-paper';
import * as TaskModel from '../model/task-model';

export default function PlaygroundPage({ navigation, route }: RoutePropsHelper<'Playground'>) {
    return (
        <ContentPadding>
            <Center>
                <View>
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
                        navigation.navigate('TaskCreated');
                    }}>To Task Created</Button>
                    <Divider style={{margin: 10}}/>
                    <Button mode="contained" onPress={() => {
                        navigation.navigate('HelpDetails');
                    }}>To Help Details</Button>
                    <Divider style={{margin: 10}}/>
                    <Button mode="contained" onPress={async () => {
                        console.log('Starting new query');
                        // await TaskModel.addNewTask(
                        //     'ownerID2', 
                        //     ['Mail'], 
                        //     'This is an description', 
                        //     {latitude: 59.219546, longitude: 17.873433},
                        //     [{productName: 'Milk', amount: '2l'}, {productName: 'Pasta', amount: '1kg'}]
                        // );
                        await TaskModel.completeTask(
                            'TwyCoAfkKV4h4dnAH5VR', 
                            // 'Some random helper'
                        );
                        console.log('Query done, selecting new data');
                        const result = await TaskModel.getNearbyTasks({latitude: 59.208335, longitude: 17.871182}, 2);
                        console.log(result);
                    }}>Firebase</Button>
                </View>
            </Center>
        </ContentPadding>
    );
}