import React, { useState } from 'react';
import { StyleSheet, View , SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {TextInput, Text } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import DividedView from '../components/divided-view/divided-view';

import { ContentPadding } from '../components/content-padding';
import SvgIcon from '../components/svg-icon';
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
        zIndex: 1
    },
    buttonContainer: {
        paddingTop: 10
    },
    bottomCont: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    textInputCont:{
        justifyContent: 'center',
    },
    textInput: {  
        height: 40,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontSize: 20      
    },
    styleErrorText: {
        color: paperTheme.colors.error
    }
});

export default function Register({navigation, route}:RoutePropsHelper<'Register'>) {
    const [numberInput, setNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('0000000000');
    const [showError, setError] = useState(false);

    const tryPhoneNumber = () => {              //placeholder for actual function when using phone number to identify user
        setPhoneNumber(numberInput)
        numberInput.length !=10 ? setError(true) : setError(false)
    }

    const upper = (
        <ContentPadding>    
            <View style={styles.upperCont}>
                <SvgIcon name='take-care' height={250} width={250}></SvgIcon>
            </View>
        </ContentPadding>
        
    )

    const lower = (
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.bottomCont}>
                        <View style={styles.textInputCont}>
                            <TextInput
                            theme={{colors: {text: paperTheme.colors.onPrimary, placeholder: paperTheme.colors.onPrimary, primary: paperTheme.colors.onPrimary}}}
                            mode='outlined'
                            label='Enter Your Phone Number'
                            maxLength={10}
                            selectionColor={paperTheme.colors.onPrimary}
                            keyboardType='phone-pad'
                            value={numberInput}
                            onChangeText={text => setNumber(text)}
                            error={phoneNumber.length != 10 ? true : false}
                            style={styles.textInput}/>
                            {showError ? <Text  style={styles.styleErrorText}>You need to enter 10 digits.</Text> : <></>}
                            <View style={styles.buttonContainer}>
                                <Button onPress={() => {tryPhoneNumber()}} color={paperTheme.colors.onPrimary}>Send regristation code</Button>
                            </View>
                        </View> 
                    </View>
                </View> 
        </SafeAreaView>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <DividedView upper={upper} lower={lower}/>
        </TouchableWithoutFeedback>
    );
}