import React, { Props } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';

export default function HomePage({navigation, route}:RoutePropsHelper<'Home'>) {
    return (
        <View style={styles.container}>
            <Text>TakeCare</Text>
            <Button title='To playground' onPress={() => {
                navigation.navigate('Playground');
            }}/>
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