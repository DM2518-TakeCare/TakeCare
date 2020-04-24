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
            <Svg width={'100%'} height={'133'} viewBox='0 0 359.57 122.05' fill='none' {...props}>
                        <Path
                            d='M359.79,234.67l-88.35,85.11a132,132,0,0,1-183.16,0L.21,234.94Z'
                            fill={props.reverse? paperTheme.colors.primary : paperTheme.colors.background}
                            transform='translate(-0.21 -234.67)'
                        />
            </Svg>
            <View style={styles.lowerCont}>
                {props.lower}
            </View>       
        </View>
    </View>
  )
}

export default DividedView
