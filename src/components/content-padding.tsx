import React from 'react';
import { StyleSheet, View } from 'react-native';

const contentPaddingStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        padding: '5%',
    },
});

export const ContentPadding: React.FC = (props) => {
    return (
        <View style={contentPaddingStyle.container}>
            {props.children}
        </View>
    );
}
