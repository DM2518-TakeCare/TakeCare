import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar as PaperAppbar } from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme';
import { StackHeaderProps } from '@react-navigation/stack';

export const AppBar: FC<{headerProps: StackHeaderProps}> = (props) => {
    const title =props.headerProps.scene.descriptor.options.headerTitle !== undefined
      ? props.headerProps.scene.descriptor.options.headerTitle
      : props.headerProps.scene.descriptor.options.title !== undefined
      ? props.headerProps.scene.descriptor.options.title
      : props.headerProps.scene.route.name;

    return (
        <PaperAppbar.Header>
            <PaperAppbar.BackAction
                disabled={!props.headerProps.navigation.canGoBack()}
                onPress={() => {
                    props.headerProps.navigation.goBack();
                }}
            />
            <PaperAppbar.Content
                title={title}
            />
        </PaperAppbar.Header>
    );
}
