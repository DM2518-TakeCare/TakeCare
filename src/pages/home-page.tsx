import React, { Props } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';

export default function HomePage({navigation, route}:RoutePropsHelper<'Home'>) {
    return (
        <Center>
            <Text>TakeCare</Text>
            <Button title='To playground' onPress={() => {
                navigation.navigate('Playground');
            }}/>
        </Center>
    );
}