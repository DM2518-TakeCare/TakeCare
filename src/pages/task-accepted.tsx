import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import StatusHeader from '../components/status-header';
import { ContentPadding } from '../components/content-padding';
import UserInfo from '../components/user-info/user-info';
import { TaskDetails } from '../components/task-details';
import { Button } from '../components/button';

const styles = StyleSheet.create({
    textStyle: {
        paddingLeft: 10,
    },
    userCont: {
        padding: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    taskCont: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonCont: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});

export default function TaskAccepted({navigation, route}:RoutePropsHelper<'TaskAccepted'>) {
    const testHelper = {id: '', name: 'Annica Olofsson', phone: '0738189621', address: 'Testgatan 3', coordinates: {latitude: 59.347647, longitude: 18.072340}, extraInfo: 'Portkod'}

    const testUser = {user: { id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
    task: { id: '', ownerId: '', desc: 'I need help getting my mail and some groceries', coordinates: {latitude: 59.347647, longitude: 18.072340}, tags: ['Mail', 'Groceries'],shoppingList: [['Milk', '2'], ['Pasta', '500g'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'],] }}

    return (    
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
            <ContentPadding>
                <ContentPadding>
                    <StatusHeader type='accepted'/>
                </ContentPadding>
                <Caption style={styles.textStyle}>Helper</Caption>
                <View style={styles.userCont}>
                    <UserInfo type='name' user={testHelper}/>
                    <UserInfo type='phone' user={testHelper}/>
                </View>
                <View style={styles.taskCont}>
                    <TaskDetails detailsHeader user={testUser.user} task={testUser.task}></TaskDetails>
                </View>
                <View style={styles.buttonCont}>
                    <Button onPress={() => {}} size='big'>Task Completed</Button>
                </View>
            </ContentPadding>
        </ScrollView>    
    );
}