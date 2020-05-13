import React, { useCallback, useEffect, FC, useState } from 'react';
import { View, StyleSheet, ScrollView, InteractionManager } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { RoutePropsHelper } from '../router';
import StatusHeader from '../components/status-header';
import { ContentPadding } from '../components/content-padding';
import UserInfo from '../components/user-info/user-info';
import { TaskDetails } from '../components/task-details';
import { Button } from '../components/button';
import { useFocusEffect } from '@react-navigation/native';
import { Task } from '../model/shared/task-interface';
import { AppState, Dispatch } from '../model/redux/store';
import { subscribeActiveViewTask, unsubscribeActiveViewTask, completeTaskAction } from '../model/redux/receiveHelpState';
import { connect } from 'react-redux';
import { Center } from '../components/center';
import { Spinner } from '../components/loading-spinner';

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

interface TaskAcceptedActions {
    completeTaskAction: (id: string) => void,
    subscribe: (id: string) => void,
    unsubscribe: () => void,
}

interface TaskAcceptedProps {
    route: RoutePropsHelper<'TaskAccepted'>,
    task: Task | null,
    completeTaskLoading: boolean,
}

const TaskAccepted: FC<TaskAcceptedActions & TaskAcceptedProps> = (props) => {

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
            if(props.task!.completed) {
                props.route.navigation.replace('TaskCompleted')
            }
        }
    }, [props.task?.completed === true]);

    const onTaskCompleted = () => {
        props.completeTaskAction(props.task!.id!)
    }
    return ( 
        props.completeTaskLoading ?
        <Center>
            <Spinner isLoading={true} />
        </Center> 
        :   
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
            <ContentPadding>
                <ContentPadding>
                    <StatusHeader type='accepted'/>
                </ContentPadding>
                {props.task
                    ?
                    <>
                        <Caption style={styles.textStyle}>Helper</Caption>
                        <View style={styles.userCont}>
                            <UserInfo type='name' user={props.task!.helper!}/>
                            <UserInfo type='phone' user={props.task!.helper!}/>
                        </View>
                        <View style={styles.taskCont}>
                            <TaskDetails 
                                hideUserAndActionInfo 
                                completeLoading={props.task ? true : false}
                                user={props.task!.owner} 
                                task={props.task!}/>
                        </View>
                        <View style={styles.buttonCont}>
                            <Button onPress={onTaskCompleted} size='big'>Task Completed</Button>
                        </View>
                    </>
                    : 
                    <Center>
                        <Spinner isLoading={true} />
                    </Center>
            }
            </ContentPadding>
        </ScrollView>    
    );
}

export default connect(
    (state: AppState, router: RoutePropsHelper<'TaskAccepted'> ): TaskAcceptedProps => ({
        route: router,
        task: state.receiveHelpState.activeTaskView,
        completeTaskLoading: state.receiveHelpState.completeTaskLoading,
    }),
    (dispatch: Dispatch): TaskAcceptedActions => ({
        subscribe: (id: string ) => dispatch(subscribeActiveViewTask(id)),
        unsubscribe: () => dispatch(unsubscribeActiveViewTask()),
        completeTaskAction: (id: string) => dispatch(completeTaskAction(id))
    })
)(TaskAccepted);