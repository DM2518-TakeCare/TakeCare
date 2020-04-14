import React, { FC, useEffect, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar as PaperAppbar} from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme';
import { StackHeaderProps } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface AppBarProps {
    headerProps: StackHeaderProps
    /** See available icons here https://materialdesignicons.com/ */
    actionIcon?: string,
    onActionClick?: () => void
}

export const AppBar: FC<AppBarProps> = (props) => {
    const title = props.headerProps.scene.descriptor.options.headerTitle !== undefined
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
            {
                props.actionIcon === undefined
                ? <></>
                : <PaperAppbar.Action 
                    icon={props.actionIcon ?? {}} 
                    onPress={props.onActionClick}/>
            }
        </PaperAppbar.Header>
    );
}
