import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const centerStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const Center: React.FC = (props) => {
    return (
        <View style={centerStyle.container}>
            {props.children}
        </View>
    );
}
