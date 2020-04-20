import React, { Props } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
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
                navigation.navigate('CreateTask');
            }}>
                To Create Task
            </Button>
        </Center>
    );
}