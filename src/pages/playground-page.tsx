import React from 'react';
import { Text } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {
    return (
        <Center>
            <Text>Hello</Text>
        </Center>
    );
}