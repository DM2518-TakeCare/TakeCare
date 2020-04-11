import React from 'react';
import { StyleSheet, View } from 'react-native';

const contentPaddingStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
});

export const ContentPadding: React.FC = (props) => {
    return (
        <View style={contentPaddingStyle.container}>
            {props.children}
        </View>
    );
}
