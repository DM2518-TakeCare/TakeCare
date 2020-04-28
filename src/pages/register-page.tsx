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
        fontSize: 16      
    },
    styleErrorText: {
        color: paperTheme.colors.error
    }
});

export default function Register({navigation, route}:RoutePropsHelper<'Register'>) {
    const [numberInput, setNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showError, setError] = useState(false);

    const checkPhoneNumber = () => {              //placeholder for actual function when using phone number to identify user
        if (numberInput.length === 10) {
            setPhoneNumber(numberInput)
        }
        setError(numberInput.length !== 10)
    }

    const upper = (
        <ContentPadding>    
            <View style={styles.upperCont}>
                <SvgIcon name='take-care' height={250} width={250}/>
            </View>
        </ContentPadding>    
    )

    const lower = (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.bottomCont}>
                <View style={styles.textInputCont}>
                    <TextInput
                        theme={{colors: {text: paperTheme.colors.onPrimary, placeholder: paperTheme.colors.onPrimary, primary: paperTheme.colors.onPrimary}}}
                        mode='outlined'
                        placeholder='Enter Your Phone Number'
                        maxLength={10}
                        selectionColor={paperTheme.colors.onPrimary}
                        keyboardType='phone-pad'
                        value={numberInput}
                        onChangeText={text => setNumber(text)}
                        error={showError}
                        style={styles.textInput}/>
                    {showError ? <Text style={styles.styleErrorText}>You need to enter 10 digits.</Text> : <></>}
                    <View style={styles.buttonContainer}>
                        <Button size='big' onPress={checkPhoneNumber} color={paperTheme.colors.onPrimary}>Send registration code</Button>
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
