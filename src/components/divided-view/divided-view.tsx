import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { paperTheme } from '../../theme/paper-theme';
import { transform } from '@babel/core';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dividedCont: {
        width: '100%',
        zIndex: -1
    },
    upperCont: {
        flex: 1,
        padding: 25,
    },
    lowerCont: {
        flex: 1,
        padding: 25,
    }
});

type DividedViewProps = {
    upper: ReactNode,
    onPressUpper?: () => void,
    lower: ReactNode,
    onPressLower?: () => void,
    reverse?: boolean,
    noBottomPadding?: boolean,
}

const DividedView: FC<DividedViewProps> = (props) => {
    const noBottomPadding = props.noBottomPadding ? { paddingBottom: 0 } : {}
    return (
        <View style={{ 
                ...styles.container, 
                backgroundColor: props.reverse ? paperTheme.colors.background : paperTheme.colors.primary 
            }}>

            <TouchableWithoutFeedback onPress={() => props.onPressUpper ? props.onPressUpper() : {}}>
                <View style={{ 
                    ...styles.upperCont, 
                    backgroundColor: props.reverse ? paperTheme.colors.primary : paperTheme.colors.background,
                    ...noBottomPadding
                }}>
                    {props.upper}
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.dividedCont}>
                <Svg onPress={() => props.onPressUpper ? props.onPressUpper() : {}} preserveAspectRatio="none" width={'100%'} height={100} viewBox='0 0 359.57 122.05' fill='none'>
                    <Path
                        d='M360,234.6l-88.42,85.18a132,132,0,0,1-183.16,0L.36,234.54Z'
                        fill={props.reverse ? paperTheme.colors.primary : paperTheme.colors.background}
                        transform='translate(-0.21 -234.67)'
                    />
                </Svg>
            </View>

            <TouchableWithoutFeedback onPress={() => props.onPressLower ? props.onPressLower() : {}}>
                <View style={{...styles.lowerCont, ...noBottomPadding}}>
                    {props.lower}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default DividedView
