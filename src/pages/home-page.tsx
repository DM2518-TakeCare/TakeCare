import React, { FC, useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View} from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import DividedView from '../components/divided-view/divided-view';
import StatusHeader from '../components/status-header';
import { paperTheme } from '../theme/paper-theme';
import { setAppBarAction } from '../model/redux/appBarState';
import { Dispatch, AppState } from '../model/redux/store';
import { connect } from 'react-redux';
import { getOwnedTask } from '../model/task-model';
import { Spinner } from '../components/loading-spinner';
import { User } from '../model/shared/user-interface';
import { Task } from '../model/shared/task-interface';
import { setActiveViewTask } from '../model/redux/receiveHelpState';
import { useFocusEffect } from '@react-navigation/native';

const helpStyle = StyleSheet.create({
    title: {
        ...paperTheme.fonts.medium,
        fontSize: 20
    },
    giveHelpTitle: {
        color: paperTheme.colors.onPrimary
    },
    receiveHelpTitle: {
        color: paperTheme.colors.primary
    }
});

interface HomePageProps {
    route: RoutePropsHelper<'Home'>,
    user: User | null
}

interface HomePageActions {
    setAppBarAction: (action: Function) => void,
    setActiveTask:(task: Task) => void,
}

const HomePage: FC<HomePageProps & HomePageActions> = (props) => {
    useFocusEffect(() => {
        props.setAppBarAction(() => {
            props.route.navigation.navigate('Settings');
        });
    })

    const [taskLoading, setTaskLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            setTaskLoading(false)
        },[])
    )

    const goToCorrectStatusPage = async () => {
        setTaskLoading(true)
        const task = await getOwnedTask(props.user!.id!)
        if(task) {
            props.setActiveTask(task)
            if(task.helper && !task.completed){
                props.route.navigation.navigate('TaskAccepted')
            }
            else if(!task.helper){
                props.route.navigation.navigate('TaskCreated')
            }
        }
        else {
            props.route.navigation.navigate('CreateTask')
        }
    }

    return (
        taskLoading ? 
            <Center>
                <Spinner isLoading={true} />
            </Center> 
        :
            <DividedView
                onPressUpper={goToCorrectStatusPage} 
                upper={
                    <SafeAreaView style={{flex: 1}}>
                        <Center>
                            <StatusHeader type='receive-help' hideStatusText={false}/>
                            <Text style={{...helpStyle.title, ...helpStyle.receiveHelpTitle}}>
                                Receive Help
                            </Text>
                        </Center>
                    </SafeAreaView>
                }
                onPressLower={() => props.route.navigation.navigate('FindTask')}
                lower={
                    <SafeAreaView style={{flex: 1}}>
                        <Center>
                            <StatusHeader type='give-help' hideStatusText={false} onPrimary/>
                            <Text style={{...helpStyle.title, ...helpStyle.giveHelpTitle}}>
                                Give Help
                            </Text>
                        </Center>
                    </SafeAreaView>
                }
            />
    );
}


export default connect(
    (state: AppState, router: RoutePropsHelper<'Home'>): HomePageProps => ({
        route: router, 
        user: state.userState.user
    }),
    (dispatch: Dispatch): HomePageActions => ({
        setAppBarAction: (action: Function) => dispatch(setAppBarAction(action)),
        setActiveTask: (task: Task) => dispatch(setActiveViewTask(task))
    })
)(HomePage);