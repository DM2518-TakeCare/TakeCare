import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { paperTheme } from '../../theme/paper-theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'stretch',
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    childrenCont: {
        flex: 3.22,
        padding: 25
    },
    UpperCont: {
        flex: 1,
        padding: 25,
        backgroundColor: paperTheme.colors.background
    },
});

type DividedViewProps = {
    upper: ReactNode,
    lower: ReactNode,
    reverse?: Boolean
}

const  DividedView: FC<DividedViewProps> = (props) => {
  return (
    <View style={styles.container}>
        <View style={{...styles.background, backgroundColor: props.reverse? paperTheme.colors.background : paperTheme.colors.primary}}>
            <Svg width={'100%'} height={'80%'} viewBox='0 0 359.57 122.05' fill='none' {...props}>
                    <Path
                        d='M359.79,234.67l-88.35,85.11a132,132,0,0,1-183.16,0L.21,234.94Z'
                        fill={props.reverse? paperTheme.colors.primary : paperTheme.colors.background}
                        transform='translate(-0.21 -234.67)'
                    />
            </Svg>
        </View>
        <View style={styles.UpperCont}>
            {props.upper}
        </View>
        <View style={styles.childrenCont}>
            {props.lower}
        </View>
    </View>
  )
}

export default DividedView
