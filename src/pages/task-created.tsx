import React from 'react';
import { Text } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import StatusHeader from '../components/status-header';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import { paperTheme } from '../theme/paper-theme';
import { Table } from '../components/table'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        flex: 1,
    },
    taskCont: {
        marginTop: 15,
        flex: 1,
    },
    taskTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    taskDetails: {
        flex: 1,
        marginTop: 10
    },
    shoppingListContainer: {
        flex: 1, 
        marginVertical: 10, 
        borderBottomWidth: 2, 
        borderTopWidth: 2, 
        borderColor: "#aaa"
    },
    userCont: {
        flexDirection: 'column',
    },
    editButton: {
        color: 'white',
    },
});

export default function TaskCreated({ navigation, route }: RoutePropsHelper<'TaskCreated'>) {

    const taskDetails = {
        user: { id: 'skdlfjlskdf', name: 'Annica Olofsson', address: 'Götgatan 78', phone: '0738189621'},
        task: { desc: 'I need help getting my mail and some groceries', tags: ['Mail', 'Groceries'],coordinates: {latitude: 59.347647, longitude: 18.072340}, shoppingList: [['Milk', '2'], ['Pasta', '500g'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'], ['Butter', '1'],] }
    }

    return (
        <SafeAreaView style={styles.cont}>
            <ContentPadding>
                <StatusHeader type='sent' />

                <View style={styles.taskCont}>

                    <Text style={styles.taskTitle} >
                        {
                            taskDetails.task.tags.join(', ')
                        }
                    </Text>

                    <View style={styles.userCont}>
                        <UserInfo type='name' user={taskDetails.user} />
                        <UserInfo type='address' user={taskDetails.user} />
                        <UserInfo type='phone' user={taskDetails.user} />
                    </View>

                    <View style={styles.taskDetails}>
                        <Text>
                            {taskDetails.task.desc}
                        </Text>
                        <View style={styles.shoppingListContainer}>
                            <ScrollView>
                                <Table tableTitles={[{ data: 'Item' }, { data: 'Amount' }]} tableData={taskDetails.task.shoppingList} />
                            </ScrollView>
                        </View>

                    </View>

                    <View>
                        <Button size='small' forceForegroundStyle='light' color={paperTheme.colors.important} onPress={() => { }}>
                            EDIT TASK
                        </Button>
                    </View>
                </View>

            </ContentPadding>
        </SafeAreaView>
    )
}
