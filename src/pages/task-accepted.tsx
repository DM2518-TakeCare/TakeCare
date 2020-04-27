import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import StatusHeader from '../components/status-header';
import { ContentPadding } from '../components/content-padding';
import UserInfo from '../components/user-info/user-info';
import { TaskDetails } from '../components/task-details';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    userCont: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        paddingTop: 20
    },
    taskCont: {
       justifyContent: "space-around"
    }
});

export default function TaskAccepted({navigation, route}:RoutePropsHelper<'TaskAccepted'>) {
    const testHelper = {name: 'Annica Olofsson', phone: '0738189621'}

    const testUser = {user: { name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3', extraInfo: 'Portkod' },
    task: { desc: 'I need help getting my mail and some groceries', tags: ['Mail', 'Groceries'] }}

    return (
        <SafeAreaView style={{flex: 1}}>
        <ContentPadding>
            <View style={styles.container}>
                <StatusHeader type='accepted'></StatusHeader>
                <View style={styles.userCont}>
                    <UserInfo type='name' user={testHelper}/>
                    <UserInfo type='phone' user={testHelper}/>
                </View>
                <View style={styles.taskCont}>
                    <TaskDetails detailsHeader user={testUser.user} task={testUser.task}></TaskDetails>
                </View>
            </View>
        </ContentPadding>
        </SafeAreaView>
    );
}