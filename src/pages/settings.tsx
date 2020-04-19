import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { Divider, Switch, Paragraph, Chip, Text } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import { paperTheme } from '../theme/paper-theme';
import { Button, TextInput } from 'react-native-paper';
import { initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { ContentPadding } from '../components/content-padding';

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
});

export default function Settings({navigation, route}:RoutePropsHelper<'Settings'>) {
    let initialTagState: Record<string, boolean> = {}
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [extraInfo, setExtraInfo] = useState('');

    return (<ContentPadding>
        <View style={styles.input}>
            <ScrollView>
                <TextInput
                    mode='outlined'
                    style={styles.inputField}
                    value={firstName} 
                    onChangeText={text => setFirstName(text)}
                    label='First Name'/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField} 
                    value={lastName} 
                    onChangeText={text => setLastName(text)}
                    label='Last name'/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField} 
                    value={idNumber} 
                    onChangeText={text => setIdNumber(text)}
                    placeholder=''
                    label="ID number"/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField} 
                    value={address} 
                    onChangeText={text => setAddress(text)}
                    placeholder='Address'/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField} 
                    value={phoneNumber} 
                    onChangeText={text => setPhoneNumber(text)}
                    placeholder='Phone Number'/>
                <TextInput
                    mode='outlined'
                    style={styles.inputField}
                    multiline
                    numberOfLines={5} 
                    value={extraInfo} 
                    onChangeText={text => setExtraInfo(text)}
                    placeholder='Extra Information'/> 
            </ScrollView>                                                      
        </View>
        <Button mode="contained" onPress={() => {
               
        }}>
            Save
        </Button>

    </ContentPadding>);
}