import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import DividedView from '../components/divided-view/divided-view';
import StatusHeader from '../components/status-header';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import SvgIcon from '../components/svg-icon';
import { Center } from '../components/center';
import { TaskDetails } from '../components/task-details';
import { Tag } from '../model/shared/task-interface';

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
        paddingTop: 20,
    },
    bottomCont: {
        flex: 1,
    },
});

export default function TaskCompleted({navigation, route}:RoutePropsHelper<'CreateTask'>) {

    const testHelper = {id: '', name: 'Annica Olofsson', phone: '0738189621', address: 'Testgatan 3', coordinates: {latitude: 59.347647, longitude: 18.072340}, extraInfo: 'Portkod'}

    const testUser = {user: { id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
    task: { id: '', owner: {id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'}, desc: 'I need help getting my mail and some groceries', coordinates: {latitude: 59.347647, longitude: 18.072340}, tags: ['Mail', 'Groceries'] as Tag[], shoppingList: [['Milk', '2'], ['Pasta', '500g'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'],] }}

    const upper = (
        <ContentPadding>
            <StatusHeader type='completed' onPrimary/>
        </ContentPadding>
    )

    const lower = (
        <ScrollView style={styles.cont}>
            <ContentPadding>
                <View style={styles.userCont}>
                    <UserInfo type='name' user={testHelper}/>
                    <UserInfo type='phone' user={testHelper}/>
                </View>
                <View style={styles.taskCont}>
                    <TaskDetails detailsHeader user={testUser.user} task={testUser.task}/>
                </View>
                <View style={styles.bottomCont}>
                    <Center>
                        <SvgIcon name='take-care'/>
                    </Center>
                </View>
            </ContentPadding>
        </ScrollView>
    )

    return (
        <DividedView reverse noBottomPadding upper={upper} lower={lower}/>
    );
}