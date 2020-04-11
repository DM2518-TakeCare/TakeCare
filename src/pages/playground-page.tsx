import React, { Props } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {
    return (
        <Center>
            <Text>Hello</Text>
        </Center>
    );
}