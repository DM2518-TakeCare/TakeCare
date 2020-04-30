import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import DividedView from '../components/divided-view/divided-view';
import StatusHeader from '../components/status-header';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import SvgIcon from '../components/svg-icon';
import { Center } from '../components/center';
import { Button } from '../components/button';
import { paperTheme } from '../theme/paper-theme';

const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        flex: 1,
    },
    taskCont: {
        marginTop: 25,
        flex: 1,
        alignItems: 'center'
    },
    taskTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    taskDetails: {
        flex: 1
    },
    userCont: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    editButton: {
        color: 'white',
    },
});

export default function TaskCreated({navigation, route}:RoutePropsHelper<'TaskCreated'>) {

    const testUser = {name: 'Annica Olofsson', address: 'Götgatan 78', phone: '0738189621', type: 'Groceries'}

    return <View style={styles.cont}>
        <ContentPadding>
            <StatusHeader type='sent'/>

            <View style={styles.taskCont}>

                <Text style={styles.taskTitle}>
                    {testUser.type}
                </Text>

                <View style={styles.userCont}>
                    <UserInfo type='name' user={testUser}/>
                    <UserInfo type='address' user={testUser}/>
                    <UserInfo type='phone' user={testUser}/>
                </View>

                <View style={styles.taskDetails}>
                    <Center>
                        <Text>Task details placeholder</Text>
                    </Center>
                </View>

                <View>
                    <View>
                        <Button size='small' forceForegroundStyle='light' color={paperTheme.colors.important} onPress={() => {}}>
                            EDIT TASK
                        </Button>
                    </View>
                    <View>
                        <Center>
                            <SvgIcon name='take-care'/>
                        </Center>
                    </View>
                </View>
            </View>
            
        </ContentPadding>
    </View>
}
