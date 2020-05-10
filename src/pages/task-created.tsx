import React, { FC, useCallback, useEffect } from 'react';
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
import { Task } from '../model/shared/task-interface';
import { useFocusEffect } from '@react-navigation/native';
import { AppState, Dispatch } from '../model/redux/store';
import { subscribeActiveViewTask, unsubscribeActiveViewTask } from '../model/redux/receiveHelpState';
import { connect } from 'react-redux';

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

interface TaskCreatedActions {
    subscribe: (id: string) => void,
    unsubscribe: () => void,
}

interface TaskCreatedProps {
    route: RoutePropsHelper<'Tasks'>,
    task: Task | null,
    taskLoading: boolean,
}

const TaskCreated: FC<TaskCreatedActions & TaskCreatedProps> = (props) => {
    useFocusEffect(
        useCallback(() => {
            props.subscribe(props.task!.id!);
            return () => {
                props.unsubscribe();
            }
        }, [])
    )
    useEffect(() => {
            if(props.task!.helper) {
                props.route.navigation.navigate('TaskAccepted')
            }
    }, [props.task!.helper]);

    return (
        <SafeAreaView style={styles.cont}>
            <ContentPadding>
                <StatusHeader type='sent' />

                <View style={styles.taskCont}>

                    <Text style={styles.taskTitle} >
                        {
                            props.task!.tags.join(', ')
                        }
                    </Text>

                    <View style={styles.userCont}>
                        <UserInfo type='name' user={props.task!.owner} />
                        <UserInfo type='address' user={props.task!.owner} />
                        <UserInfo type='phone' user={props.task!.owner} />
                    </View>

                    <View style={styles.taskDetails}>
                        <Text>
                            {props.task!.desc}
                        </Text>
                        <View style={styles.shoppingListContainer}>
                            <ScrollView>
                                <Table tableTitles={[{ data: 'Item' }, { data: 'Amount' }]} tableData={props.task!.shoppingList} />
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

export default connect(
    (state: AppState, router: RoutePropsHelper<'Tasks'> ): TaskCreatedProps => ({
        route: router,
        task: state.receiveHelpState.activeTaskView,
        taskLoading: state.receiveHelpState.taskLoading,
    }),
    (dispatch: Dispatch): TaskCreatedActions => ({
        subscribe: (id: string ) => dispatch(subscribeActiveViewTask(id)),
        unsubscribe: () => dispatch(unsubscribeActiveViewTask()),
    })
)(TaskCreated);
