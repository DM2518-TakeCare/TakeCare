import React from 'react';
import { Text } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { Button } from 'react-native-paper';

export default function HomePage({navigation, route}:RoutePropsHelper<'Home'>) {
    return (
        <Center>
            <Text>TakeCare</Text>
            <Button mode="contained" onPress={() => {
                navigation.navigate('Playground');
            }}>
                To Playground
            </Button>
            <Button mode="contained" onPress={() => {
                navigation.navigate('TaskCreated');
            }}>
                Task Created
            </Button> 
        </Center>
    );
}