import React, { FC, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { paperTheme } from '../../theme/paper-theme'
import { Center } from '../center'

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
        flex: 1,
        padding: 25
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
            <Svg width={'100%'} height={'50%'} viewBox='0 0 360 351' fill='none' {...props}>
                <Path
                    d='M271.58 313.777C220.458 363.025 139.542 363.025 88.4202 313.777L-38.9611 191.064C-124.512 108.648 -66.1723 -36 52.6188 -36L307.381 -36C426.172 -36 484.512 108.648 398.961 191.064L271.58 313.777Z'
                    fill={props.reverse? paperTheme.colors.primary : paperTheme.colors.background}
                />
            </Svg>
        </View>
        <View style={styles.childrenCont}>
            {props.upper}
        </View>
        <View style={styles.childrenCont}>
            {props.lower}
        </View>
    </View>
  )
}

export default DividedView
