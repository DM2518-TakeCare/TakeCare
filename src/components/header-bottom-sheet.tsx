import React, { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import { paperTheme } from '../theme/paper-theme';

interface HeaderBottomSheetProps {
    color?: string,
    height?: number | string,
    width?: number | string
}
export const HeaderBottomSheet: FC<HeaderBottomSheetProps> = (props) => {
    const style = StyleSheet.create({
        headerContainer: {
            alignItems: 'center',
            padding: 15,
            width: props.width,
            height: props.height,
            backgroundColor: props.color ?? paperTheme.colors.surface,
            borderTopLeftRadius: paperTheme.roundness,  
            borderTopRightRadius: paperTheme.roundness, 
        },
        pullItem: {
            width: 60,
            height: 5,
            borderRadius: paperTheme.roundness,
            opacity: 0.25,
            backgroundColor: paperTheme.colors.text
        }
    });
    return (
        <View style={style.headerContainer}>
            <View style={style.pullItem}></View>
        </View>
    );
}
