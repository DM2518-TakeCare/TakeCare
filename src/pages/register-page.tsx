import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import { StyleSheet, View , SafeAreaView, TouchableWithoutFeedback, Keyboard, AsyncStorage, InteractionManager} from 'react-native';
import {TextInput, Text } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import DividedView from '../components/divided-view/divided-view';

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { ContentPadding } from '../components/content-padding';
import SvgIcon from '../components/svg-icon';
import { Button } from '../components/button';
import { paperTheme } from '../theme/paper-theme'
import { firebaseApp } from '../model/firebase';
import firebase from 'firebase';

import * as UserModel from '../model/user-model';
import { User } from '../model/shared/user-interface';
import { Dispatch } from '../model/redux/store';
import { setUserData, addUserData } from '../model/redux/userState';
import { connect } from 'react-redux';
import { Spinner } from '../components/loading-spinner';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Center } from '../components/center';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const styles = StyleSheet.create({
    upperCont: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1
    },
    buttonContainer: {
        paddingTop: 10,
        flexDirection: 'row',
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

const inputTheme = {
    colors: {
        text: paperTheme.colors.onPrimary, 
        placeholder: paperTheme.colors.onPrimary, 
        primary: paperTheme.colors.onPrimary
    }
}

interface RegisterActions {
    setUserData: (user: User) => void,
    addNewUser: (user: User) => void,
}

interface RegisterProps {
    router: RoutePropsHelper<'Register'>
}

export const Register: FC<RegisterActions & RegisterProps> = (props) => {
    const numberLength = 12;
    const userAuthIDAsyncStorageName = "@userAuthID";
    const [inputValue, setInputValue] = useState('');
    const [loginLoading, setLoginLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationID, setVerificationID] = useState<string | null>(null);
    const [authenticationError, setAuthenticationError] = useState(false);
    const [showError, setError] = useState(false);
    const recaptchaVerifier = React.useRef<FirebaseRecaptchaVerifierModal | null>(null);

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            // Start login only when the screen is focused
            if (props.router.navigation.isFocused()) {
                // First we check if this this devices has already logged in before
                AsyncStorage.getItem(userAuthIDAsyncStorageName).then(data => {
                    if (data) {
                        startLogin(data);
                    }
                    else {
                        setLoginLoading(false);
                    }
                })
            }
          });
      
          return () => task.cancel();
        }, [])
      );

    const checkPhoneNumber = () => {
        setPhoneNumber(inputValue)
        if (inputValue.length === numberLength) {
            sendVerificationCode(inputValue);
            setError(false);
        }
        else {
            setError(true);
        }
    }

    const sendVerificationCode = async (number: string) => {
        if (recaptchaVerifier.current) {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            setInputValue('');
            const verificationId = await phoneProvider.verifyPhoneNumber(
                    inputValue,
                    recaptchaVerifier.current
            );
            setVerificationID(verificationId);
        }
    }

    const requestCredentials = async (verificationCode: string, verificationID: string) => {
        setLoginLoading(true);
        try {
            // Try to verify the credentials
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationID,
                verificationCode
            );

            // Get a auth user
            const userAuth = await firebase.auth().signInWithCredential(credential);
            const userID = userAuth.user?.uid;

            // Saving the user and continue to login
            if (userID) {
                await AsyncStorage.setItem(userAuthIDAsyncStorageName, userID);
                await startLogin(userID);
                setAuthenticationError(false);
            }
        } catch (err) {
            setAuthenticationError(true);
        }
        setLoginLoading(false);
    }

    const startLogin = async (userAuthID: string) => {

        // First we need to check if this user exist
        const user = await UserModel.getUserByAuth(userAuthID);
        if (user) {
            props.setUserData(user);
            props.router.navigation.replace('Home');
            return;
        }

        // No user found, need to create a new one
        const newUser: User = {
            authID: userAuthID,
            address: null,
            name: null,
            phone: phoneNumber,
        }

        // We go directly to the setting page as this is a new user
        props.addNewUser(newUser);
        props.router.navigation.replace('Settings');
    }

    const goBackToPhoneNumberInput = () => {
        setVerificationID(null);
    }

    const renderForm = (
        placeholder: string, 
        errorText: string, 
        errorActive: boolean, 
        buttonText: string, 
        onButtonClick: () => void, 
        canGoBack: boolean,
        onBackPressed: () => void, 
        maxLength?: number) => {
        return <>
            <TextInput
                theme={inputTheme}
                mode='outlined'
                placeholder={placeholder}
                maxLength={maxLength}
                selectionColor={paperTheme.colors.onPrimary}
                keyboardType='phone-pad'
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                error={showError}
                style={styles.textInput}/>
            {
                errorActive ? 
                    <Text style={styles.styleErrorText}>{errorText}</Text> 
                : 
                    <></>
            }
            <View style={styles.buttonContainer}>
                {
                    canGoBack
                    ?
                        <View style={{marginRight: 10}}>
                            <Button color={paperTheme.colors.onPrimary} onPress={onBackPressed}>
                                <MaterialCommunityIcons  name='chevron-left' size={35} />
                            </Button>
                        </View>
                    :
                        <></>
                }
                <Button
                    expandHorizontal={true}
                    size='big' 
                    onPress={onButtonClick} 
                    color={paperTheme.colors.onPrimary}>{buttonText}</Button>
            </View>
        </>
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
                {
                    loginLoading
                    ?
                        <Center>
                            <Spinner onPrimary={true} isLoading={true}/>
                        </Center>
                    :
                        <View style={styles.textInputCont}>
                            {
                                verificationID
                                ?
                                    renderForm(
                                        'Enter the code sent to you',
                                        'An error occurred, try again',
                                        authenticationError,
                                        'Login',
                                        () => requestCredentials(inputValue, verificationID),
                                        true,
                                        () => goBackToPhoneNumberInput(),
                                        numberLength
                                    )
                                :
                                    renderForm(
                                        'Enter Your Phone Number (+46)',
                                        `You need to enter ${numberLength} digits.`,
                                        showError,
                                        'Send registration code',
                                        () => checkPhoneNumber(),
                                        false,
                                        () => {},
                                        numberLength
                                    )
                            }
                        </View> 
                }
            </View>
        </SafeAreaView>
    )

    return (
        <>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseApp.options as any} />
                <View style={{flex: 1, backgroundColor: 'red'}}>
                    <DividedView onPressUpper={Keyboard.dismiss} onPressLower={Keyboard.dismiss} upper={upper} lower={lower }/>
                </View>
        </>
    );
}

export default connect(
    (state, router: RoutePropsHelper<'Register'>): RegisterProps => ({
        router: router
    }),
    (dispatch: Dispatch): RegisterActions => ({
        setUserData: user => dispatch(setUserData(user)),
        addNewUser: user => dispatch(addUserData(user))
    })
)(Register);
