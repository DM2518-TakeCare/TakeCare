import React from 'react';
import { StyleSheet, View} from 'react-native';

interface HeaderBottomSheetProps {
    headerColor: string,
    headerHeight?: number | string,
    headerWidth?: number | string
}
export const HeaderBottomSheet :React.FC<HeaderBottomSheetProps> = (props) => {
    const style = StyleSheet.create({
        headerContainer: {
            alignItems: 'center',
            paddingTop: 15,
            width: props.headerWidth,
            height: props.headerHeight,
            backgroundColor: props.headerColor,
            borderTopLeftRadius: 10,  
            borderTopRightRadius: 10, 
        },
        pullItem: {
            width: 60,
            height: 5,
            borderRadius: 20,
            opacity: 0.25,
            backgroundColor: '#000'
        }
    });
    return (
        <View style={style.headerContainer}>
            <View style={style.pullItem}></View>
            {props.children}
        </View>
    );
}