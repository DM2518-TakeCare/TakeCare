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
    onActionClick?: () => void,
    blendIn?: boolean,
    disableBackAction?: boolean,
    color?: string
}

export const AppBar: FC<AppBarProps> = (props) => {
    const title = props.headerProps.scene.descriptor.options.headerTitle !== undefined
      ? props.headerProps.scene.descriptor.options.headerTitle
      : props.headerProps.scene.descriptor.options.title !== undefined
      ? props.headerProps.scene.descriptor.options.title
      : props.headerProps.scene.route.name;
    
    const headerStyle = {
        backgroundColor: props.color,
        elevation: props.blendIn ? 0 : 1
    }

    return (
        <PaperAppbar.Header style={headerStyle}>
            { props.disableBackAction ? <></> : <PaperAppbar.BackAction
                disabled={!props.headerProps.navigation.canGoBack()}
                onPress={() => {
                    props.headerProps.navigation.goBack();
                }}
            /> }
            <PaperAppbar.Content
                title={title}
            />
            {
                props.actionIcon === undefined
                ? null
                : <PaperAppbar.Action 
                    icon={props.actionIcon ?? {}} 
                    onPress={props.onActionClick}/>
            }
        </PaperAppbar.Header>
    );
}
