import React, { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Subheading, Text } from 'react-native-paper';
import { ContentPadding } from '../components/content-padding';
import { ScrollView } from 'react-native-gesture-handler';
import { TaskDetails } from '../components/task-details';
import { Center } from '../components/center';
import StatusHeader from '../components/status-header';
import { Task } from '../model/shared/task-interface';
import { AppState, Dispatch } from '../model/redux/store';
import { connect } from 'react-redux';
import { listenToHelperTasks, unsubscribeFromHelperTasks, completeTask } from '../model/redux/giveHelpState';
import { useFocusEffect } from '@react-navigation/native';
import { Spinner } from '../components/loading-spinner';

const styles = StyleSheet.create({
    tasksContainer: {
        paddingBottom: 15
    },
});

interface TasksPageActions {
    subscribe: () => void,
    unsubscribe: () => void,
    completeTask: (task: Task) => void,
}

interface TasksPageProps {
    route: RoutePropsHelper<'Tasks'>,
    activeTasks: Task[],
    taskLoading: Task | null,
    initialLoading: boolean,
    completedTasks: Task[],
    acceptedTask?: Task,
}

const TasksPage: FC<TasksPageActions & TasksPageProps> = (props) => {

    useFocusEffect(
        useCallback(() => {
            props.subscribe();
            return () => {
                props.unsubscribe();
            }
        }, [])
    )

    const renderTasks = (tasks: Task[], noTaskText: string) => {
        return (
            tasks.length > 0 
            ?   
                tasks.map(task =>                             
                    <View key={task.id} style={styles.tasksContainer}>
                        <TaskDetails
                            initOpen={props.acceptedTask?.id === task.id}
                            completeLoading={props.taskLoading === task}
                            onComplete={() => props.completeTask(task)}
                            user={task.owner}
                            task={task}
                        />     
                    </View>
                )
            : 
                <Text>{noTaskText}</Text>
        );
    }

    return (<>
        <ScrollView>
            <ContentPadding>
                <ContentPadding>
                    <StatusHeader type='give-help'/>
                </ContentPadding>
                {
                    props.initialLoading
                    ?
                        <Spinner isLoading={true} />
                    :
                        <>
                            <Subheading>Accepted Tasks</Subheading>
                            {renderTasks(props.activeTasks, 'You do not have any active tasks yet.')}
                            <Subheading>Completed Tasks</Subheading>
                            {renderTasks(props.completedTasks, 'You have not completed any tasks yet.')}
                        </>
                }
            </ContentPadding>
        </ScrollView>
    </>);
}

export default connect(
    (state: AppState, router: RoutePropsHelper<'Tasks'> ): TasksPageProps => ({
        route: router,
        activeTasks: state.giveHelpState.activeTasks,
        acceptedTask: state.giveHelpState.viewedTask,
        completedTasks: state.giveHelpState.completedTasks,
        taskLoading: state.giveHelpState.taskLoading,
        initialLoading: state.giveHelpState.initialSubscribeLoading
    }),
    (dispatch: Dispatch): TasksPageActions => ({
        subscribe: () => dispatch(listenToHelperTasks()),
        unsubscribe: () => dispatch(unsubscribeFromHelperTasks()),
        completeTask: (task: Task) => dispatch(completeTask(task)),
    })
)(TasksPage);
