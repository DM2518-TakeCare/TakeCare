import React, { Props } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { Button } from 'react-native-paper';

export default function FindTaskPage({navigation, route}:RoutePropsHelper<'FindTask'>) {
    return (
        <Center>
            <Text>Find task</Text>
        </Center>
    );
}