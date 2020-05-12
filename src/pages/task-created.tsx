import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import StatusHeader from '../components/status-header';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import { paperTheme } from '../theme/paper-theme';
import { Table } from '../components/table'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, View, StyleSheet, PickerIOSComponent, InteractionManager } from 'react-native';
import { Task } from '../model/shared/task-interface';
import { useFocusEffect } from '@react-navigation/native';
import { AppState, Dispatch } from '../model/redux/store';
import { subscribeActiveViewTask, unsubscribeActiveViewTask } from '../model/redux/receiveHelpState';
import { connect } from 'react-redux';
import { Spinner } from '../components/loading-spinner';
import { Center } from '../components/center';

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
        borderBottomWidth: 1, 
        borderTopWidth: 1, 
        borderColor: "#ccc"
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
    route: RoutePropsHelper<'TaskCreated'>,
    task: Task | null,
    taskLoading: boolean,
}

const TaskCreated: FC<TaskCreatedActions & TaskCreatedProps> = (props) => {
    useFocusEffect(
        React.useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                if(props.task) {
                    props.subscribe(props.task.id!);
                }
            });
            return () => {
                task.cancel();
                props.unsubscribe();
            }
        }, [])
    );
    
    useEffect(() => {
        if(props.task) {
            if(props.task!.helper) {
                props.route.navigation.replace('TaskAccepted')
            }
        }
    }, [props.task]);


    return (
        <SafeAreaView style={styles.cont}>
            <ContentPadding>
                <StatusHeader type='sent' />
                {
                    props.task
                    ?
                    <>
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
                            {
                                props.task.shoppingList === undefined || props.task.shoppingList.length === 0
                                ? 
                                    <></> 
                                :
                                    <View style={styles.shoppingListContainer}>
                                        <ScrollView>
                                            <Table tableTitles={[{ data: 'Item' }, { data: 'Amount' }]} tableData={props.task.shoppingList!.map(item =>[item.productName, item.amount])} />
                                        </ScrollView>
                                    </View>
                            }
                            
                        </View>

                        <View>
                            <Button size='small' forceForegroundStyle='light' color={paperTheme.colors.important} onPress={() => { }}>
                                EDIT TASK
                            </Button>
                        </View>
                    </View>
                </>
                    :
                    <Center>
                        <Spinner isLoading={true} />
                    </Center>
                       
                }
            </ContentPadding>
        </SafeAreaView>
    )
}

export default connect(
    (state: AppState, router: RoutePropsHelper<'TaskCreated'> ): TaskCreatedProps => ({
        route: router,
        task: state.receiveHelpState.activeTaskView,
        taskLoading: state.receiveHelpState.taskLoading,
    }),
    (dispatch: Dispatch): TaskCreatedActions => ({
        subscribe: (id: string ) => dispatch(subscribeActiveViewTask(id)),
        unsubscribe: () => dispatch(unsubscribeActiveViewTask()),
    })
)(TaskCreated);
