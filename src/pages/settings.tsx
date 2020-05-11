import React, { FC, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { RoutePropsHelper } from '../router';
import { TextInput } from 'react-native-paper';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import { AppState, Dispatch } from '../model/redux/store';
import { connect } from 'react-redux';
import { updateUserData } from '../model/redux/userState';
import { User } from '../model/shared/user-interface';
import { paperTheme } from '../theme/paper-theme';

const styles = StyleSheet.create({
    input: {
        flex: 9,
        padding: 5,
    },
    inputField: {
        marginBottom: 10,
    },
    row: {
        padding: 10,
        flexDirection: 'row',
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        color: paperTheme.colors.error
    },
});

interface SettingsPageProps {
    user: User,
    router: RoutePropsHelper<'Settings'>,
}

interface SettingsPageActions {
    update: (user: User) => void,
}

const SettingsPage: FC<SettingsPageProps & SettingsPageActions> = (props) => {
    const [name, setName] = useState(props.user.name ?? '');
    const [address, setAddress] = useState(props.user.address ?? '');
    const [phoneNumber, setPhoneNumber] = useState(props.user.phone ?? '');
    const [extraInfo, setExtraInfo] = useState(props.user.extraInfo ?? '');
    const [errorText, setErrorText] = useState<string | null>(null);

    const requestSave = () => {
        if (name === '' || address === '') {
            if (name === '') {
                setErrorText('Please insert your name.')
            }
            if (address === '') {
                setErrorText('Please insert your address.')
            }
            return;
        }

        const newUser: User = {
            ...props.user,
            name: name,
            address: address,
            extraInfo: extraInfo,
        }
        props.update(newUser);
        props.router.navigation.replace('Home');
    }

    return (<ContentPadding>
        <View style={styles.input}>
            <ScrollView>
                <TextInput
                    mode='outlined'
                    style={styles.inputField}
                    value={name} 
                    onChangeText={text => setName(text)}
                    label='Full Name'/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField} 
                    value={address} 
                    onChangeText={text => setAddress(text)}
                    label='Address'/>
                <TextInput
                    mode='outlined'
                    disabled
                    style={styles.inputField} 
                    value={phoneNumber} 
                    onChangeText={text => setPhoneNumber(text)}
                    label='Phone Number'/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField}
                    multiline
                    numberOfLines={5}
                    value={extraInfo} 
                    onChangeText={text => setExtraInfo(text)}
                    label='Extra Information'
                    placeholder='Extra Information (Door code, disabilities, special instructions etc)'/> 
            </ScrollView>                                                      
        </View>
        {
            errorText
            ?
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
            :
                <></>
        }
        <Button size="big" onPress={requestSave}>
            Save
        </Button>

    </ContentPadding>);
}

export default connect(
    (state: AppState, router: RoutePropsHelper<'Settings'> ): SettingsPageProps => ({
        user: state.userState.user!,
        router: router,
    }),
    (dispatch: Dispatch): SettingsPageActions => ({
        update: (user) => dispatch(updateUserData(user)),
    })
)(SettingsPage);
