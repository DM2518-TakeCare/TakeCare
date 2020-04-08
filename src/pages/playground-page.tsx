import React, { Props } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {
    return (
        <View style={styles.container}>
            <Text>Test</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});