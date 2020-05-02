import React from 'react';
import { Text, SafeAreaView, StyleSheet} from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import DividedView from '../components/divided-view/divided-view';
import StatusHeader from '../components/status-header';
import { paperTheme } from '../theme/paper-theme';

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


export default function HomePage({ navigation, route }: RoutePropsHelper<'Home'>) {
    return (
        <DividedView
            onPressUpper={() => navigation.navigate('CreateTask')}
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
            onPressLower={() => navigation.navigate('FindTask')}
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