import React, { FC } from 'react';
import { StyleSheet, View} from 'react-native';
import { paperTheme } from '../theme/paper-theme';
import { Divider } from 'react-native-paper';

interface HeaderBottomSheetProps {
    color?: string,
    height?: number | string,
    width?: number | string
}
export const HeaderBottomSheet: FC<HeaderBottomSheetProps> = (props) => {
    const style = StyleSheet.create({
        headerContainer: {
            width: props.width,
            height: props.height,
            backgroundColor: props.color ?? paperTheme.colors.surface,
            borderTopLeftRadius: paperTheme.roundness * 2,  
            borderTopRightRadius: paperTheme.roundness * 2, 
            zIndex: -1,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: -5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        pullContainer: {
            alignItems: 'center',
            padding: 20,
        },
        pullItem: {
            width: 60,
            height: 5,
            borderRadius: paperTheme.roundness,
            opacity: 0.25,
            backgroundColor: paperTheme.colors.text
        },
        headerDivider: {
            marginHorizontal: 10,
            flex: 1,
            height: 2,
            backgroundColor: "#eee"
        }
    });
    return (
        <View style={style.headerContainer}>
            <View style={style.pullContainer}>
                <View style={style.pullItem}></View>
            </View>
            <View style={style.headerDivider}/>
        </View>
    );
}
