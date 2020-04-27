import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { paperTheme } from '../../theme/paper-theme';
import { transform } from '@babel/core';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dividedCont: {
        width: '100%',
    },
    upperCont: {
        flex: 0.7,
        padding: 25,
    },
    lowerCont: {
        flex: 1,
        padding: 25,
    }
});

type DividedViewProps = {
    upper: ReactNode,
    lower: ReactNode,
    reverse?: Boolean
}

const DividedView: FC<DividedViewProps> = (props) => {
    return (
        <View style={{ 
                ...styles.container, 
                backgroundColor: props.reverse ? paperTheme.colors.background : paperTheme.colors.primary 
            }}>
            <View style={{ 
                    ...styles.upperCont, 
                    backgroundColor: props.reverse ? paperTheme.colors.primary : paperTheme.colors.background 
                }}>
                {props.upper}
            </View>
            <View style={styles.dividedCont}>
                <Svg preserveAspectRatio="none" width={'100%'} height={130} viewBox='0 0 359.57 122.05' fill='none'>
                    <Path
                        d='M360,234.6l-88.42,85.18a132,132,0,0,1-183.16,0L.36,234.54Z'
                        fill={props.reverse ? paperTheme.colors.primary : paperTheme.colors.background}
                        transform='translate(-0.21 -234.67)'
                    />
                </Svg>
            </View>
            <View style={styles.lowerCont}>
                {props.lower}
            </View>
        </View>
    )
}

export default DividedView
