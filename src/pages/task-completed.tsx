import React, { useState, FC, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import DividedView from '../components/divided-view/divided-view';
import StatusHeader from '../components/status-header';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import SvgIcon from '../components/svg-icon';
import { Center } from '../components/center';
import { TaskDetails } from '../components/task-details';
import { Tag, Task } from '../model/shared/task-interface';
import { connect } from 'react-redux';
import { AppState, Dispatch } from '../model/redux/store';
import { unsubscribeActiveViewTask, subscribeActiveViewTask } from '../model/redux/receiveHelpState';
import { setAppBarAction } from '../model/redux/appBarState';
import { StackActions } from '@react-navigation/native';

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

interface TaskCompletedActions {
    unsubscribe: () => void,
    setAppBarAction: (action: Function) => void,
}

interface TaskCompletedProps {
    route: RoutePropsHelper<'TaskCompleted'>,
    task: Task | null,
    taskLoading: boolean,
}

const TaskCompleted: FC<TaskCompletedActions & TaskCompletedProps> = (props) => {

    useEffect(() => {
        props.setAppBarAction(() => {
            props.unsubscribe()
            props.route.navigation.dispatch(StackActions.replace('Home'))
        })
    }, [props.route])

    const upper = (
        <ContentPadding>
            <StatusHeader type='completed' onPrimary/>
        </ContentPadding>
    )

    const lower = (
        <ScrollView style={styles.cont}>
            <ContentPadding>
                <View style={styles.userCont}>
                    <UserInfo type='name' user={props.task!.helper!}/>
                    <UserInfo type='phone' user={props.task!.helper!}/>
                </View>
                <View style={styles.taskCont}>
                    <TaskDetails 
                        detailsHeader
                        completeLoading={props.taskLoading}
                        user={props.task!.owner} 
                        task={props.task!}/>
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

export default connect(
    (state: AppState, router: RoutePropsHelper<'TaskCompleted'> ): TaskCompletedProps => ({
        route: router,
        task: state.receiveHelpState.activeTaskView,
        taskLoading: state.receiveHelpState.taskLoading,
    }),
    (dispatch: Dispatch): TaskCompletedActions => ({
        unsubscribe: () => dispatch(unsubscribeActiveViewTask()),
        setAppBarAction: (action: Function) => dispatch(setAppBarAction(action))
    })
)(TaskCompleted);