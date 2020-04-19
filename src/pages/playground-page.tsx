import React from 'react';
import { Text, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';

export default function PlaygroundPage({ navigation, route }: RoutePropsHelper<'Playground'>) {
    return (
        <ContentPadding>
            <Center>
               <Text>Hello</Text>
            </Center>
        </ContentPadding>
    );
}