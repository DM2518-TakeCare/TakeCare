import React, { Props, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';
import {Surface, Divider } from 'react-native-paper';
import { Button } from '../components/button';
import DividedView from '../components/divided-view/divided-view';
import { paperTheme } from '../theme/paper-theme';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {

    const [toggleOff, setToggleOff] = useState(true);

    return (
        <Center>
            <Text>Hello</Text>
        </Center>
    );
}