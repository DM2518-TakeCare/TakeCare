import React, { FC, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet} from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import DividedView from '../components/divided-view/divided-view';
import StatusHeader from '../components/status-header';
import { paperTheme } from '../theme/paper-theme';
import { setAppBarAction } from '../model/redux/appBarState';
import { Dispatch, AppState } from '../model/redux/store';
import { connect } from 'react-redux';

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
}

interface HomePageActions {
    setAppBarAction: (action: Function) => void,
}

const HomePage: FC<HomePageProps & HomePageActions> = (props) => {
    useEffect(() => {
        props.setAppBarAction(() => {
            props.route.navigation.navigate('Settings');
        });
    })

    return (
        <DividedView
            onPressUpper={() => props.route.navigation.navigate('CreateTask') /*TODO Navigate to taks-created, accepted or completed depending on state*/}
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
    }),
    (dispatch: Dispatch): HomePageActions => ({
        setAppBarAction: (action: Function) => dispatch(setAppBarAction(action))
    })
)(HomePage);
