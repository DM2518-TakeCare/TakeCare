import React from 'react';
import { StyleSheet, View , TextInput, SafeAreaView} from 'react-native';
import { } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import DividedView from '../components/divided-view/divided-view';

import { ContentPadding } from '../components/content-padding';
import SvgIcon from '../components/svg-icon';
import { Center } from '../components/center';
import { Button } from '../components/button';
import { paperTheme } from '../theme/paper-theme'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    upperCont: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonContainer: {
    },
    bottomCont: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    textInputCont: {
        zIndex: 1,
        paddingBottom: 10
    },
    textInput: {  
        textAlign: 'center',  
        height: 40,  
        borderRadius: 10,  
        borderWidth: 2,  
        borderColor: paperTheme.colors.background,  
        marginBottom: 10,
        color: paperTheme.colors.background,
        fontSize: 20,
        
    }  
});

export default function Register({navigation, route}:RoutePropsHelper<'Register'>) {

    const upper = (
        <ContentPadding>
            <View style={styles.upperCont}>
                <SvgIcon name='take-care' height={250} width={250}></SvgIcon>
            </View>
        </ContentPadding>
    )

    const lower = (
        <View style={styles.container}>
            <View style={styles.bottomCont}>
                <View style={styles.textInputCont}>
                    <TextInput placeholder="Enter Your Mobile Number"  
                    keyboardType='phone-pad'
                    placeholderTextColor= {paperTheme.colors.background}
                    maxLength={10}
                
                    style={styles.textInput}/>
                </View>
                <Button onPress={() => {}} color={paperTheme.colors.onPrimary}>Send regristation code</Button>
            </View>
        </View>
    )

    return (
            <DividedView upper={upper} lower={lower}/>
    );
}