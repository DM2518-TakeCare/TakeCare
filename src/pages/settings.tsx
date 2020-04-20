import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import { TextInput } from 'react-native-paper';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';

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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
                    value={address} 
                    onChangeText={text => setAddress(text)}
                    placeholder='Address'/>
                <TextInput
                    mode='outlined'
                    disabled
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
                    placeholder='Extra Information (Door code, disabilities, special instructions etc)'/> 
            </ScrollView>                                                      
        </View>
        <Button size="big" onPress={() => {
               
        }}>
            Save
        </Button>

    </ContentPadding>);
}