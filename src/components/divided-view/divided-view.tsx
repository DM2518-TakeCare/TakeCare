import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { paperTheme } from '../../theme/paper-theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    dividedCont: {
       zIndex: -1
    },
    upperCont: {
        flex: 0.7,
        padding: 25,
    },
    lowerCont: {
        flex: 1,
        padding: 25
    }
});

type DividedViewProps = {
    upper: ReactNode,
    lower: ReactNode,
    reverse?: Boolean
}

const  DividedView: FC<DividedViewProps> = (props) => {
  return (
    <View style={{...styles.container,  backgroundColor: props.reverse? paperTheme.colors.background : paperTheme.colors.primary}}>
        <View style={styles.background}>
            <View style={{...styles.upperCont, backgroundColor: props.reverse? paperTheme.colors.primary : paperTheme.colors.background}}>
                {props.upper}     
            </View>
            <View style={styles.dividedCont}>
            <Svg width={'100%'} height={'133'} preserveAspectRatio='xMinYMin' viewBox='0 0 359.57 122.05' fill='none' {...props}>
                        <Path
                            d='M360,234.6l-88.42,85.18a132,132,0,0,1-183.16,0L.36,234.54Z'
                            fill={props.reverse? paperTheme.colors.primary : paperTheme.colors.background}
                            transform='translate(-0.21 -234.67)'
                        />
            </Svg>
            </View>
            <View style={styles.lowerCont}>
                {props.lower}
            </View>       
        </View>
    </View>
  )
}

export default DividedView
