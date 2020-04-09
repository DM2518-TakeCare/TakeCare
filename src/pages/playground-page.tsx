import React, { Props } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import UserInfo from '../components/user-info/user-info';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {
    const testUser = {name: 'Test Testsson', address: 'Testvägen 8, 133 89, Testersund', phone:'076-3865637'}
    return (
        <Center>
            <UserInfo type={'name'} user={testUser}/>
            <UserInfo type={'address'} user={testUser}/>
            <UserInfo type={'phone'} user={testUser}/>
        </Center>
    );
}