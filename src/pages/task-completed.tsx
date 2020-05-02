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

const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        flex: 1,
    },
    userCont: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
    },
    taskCont: {
        flexGrow: 8,
    },
    bottomCont: {
        flex: 1,
    },
});

export default function TaskCompleted({navigation, route}:RoutePropsHelper<'CreateTask'>) {

    const testUser = {id: '111', name: 'Annica Olofsson', phone: '0738189621', address: 'testgatan 1', coordinates: {latitude: 59.347647, longitude: 18.072340},  }

    const upper = (
        <ContentPadding>
            <StatusHeader type='completed' onPrimary/>
        </ContentPadding>
    )

    const lower = (
        <View style={styles.cont}>
            <ContentPadding>
                <View style={styles.userCont}>
                    <UserInfo type='name' user={testUser}/>
                    <UserInfo type='phone' user={testUser}/>
                </View>
                <View style={styles.taskCont}>
                    <Center>
                        <Text>Task details placeholder</Text>
                    </Center>
                </View>
                <View style={styles.bottomCont}>
                    <Center>
                        <SvgIcon name='take-care'/>
                    </Center>
                </View>
            </ContentPadding>
        </View>
    )

    return (
        <DividedView reverse upper={upper} lower={lower}/>
    );
}