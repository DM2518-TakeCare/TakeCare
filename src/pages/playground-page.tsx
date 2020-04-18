import React from 'react';
import { Text } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { Spinner } from '../components/loading-spinner';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {
    return (
        <Center>
            <Text>Hello</Text>
            <Spinner />
        </Center>
    );
}