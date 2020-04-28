import React, { FC, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, StatusBar, StatusBarStyle, Easing } from 'react-native';
import { Appbar as PaperAppbar} from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme';
import { StackHeaderProps } from '@react-navigation/stack';

const AppBarStyle = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1
    },
    title: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    leftContainer: {
        minWidth: 50
    },
    rightContainer: {
        minWidth: 50
    },
});

export enum AppBarBackgroundColor {
    PRIMARY = 0,
    CANVAS = 1,
    TRANSPARENT = 2
}

interface AppBarProps {
    headerProps: StackHeaderProps
    /** See available icons here https://materialdesignicons.com/ */
    backgroundColor?: AppBarBackgroundColor,
    actionIcon?: string,
    onActionClick?: () => void,
    disableBackAction?: boolean,
}

export const AppBar: FC<AppBarProps> = (props) => {
    const title = props.headerProps.scene.descriptor.options.headerTitle !== undefined
      ? props.headerProps.scene.descriptor.options.headerTitle
      : props.headerProps.scene.descriptor.options.title !== undefined
      ? props.headerProps.scene.descriptor.options.title
      : props.headerProps.scene.route.name;

    const appBarHeight = 100;

    const navigationProgress = props.headerProps.scene.progress;

    useEffect(() => {
        props.headerProps.navigation.addListener('focus', () => {
            changeStatusBarColor();
        });
        return () => {
            props.headerProps.navigation.removeListener('focus', () => {});
        }
    }, []);

    const changeStatusBarColor = () => {
        let statusBarStyle: StatusBarStyle;
        switch (props.backgroundColor) {
            case AppBarBackgroundColor.PRIMARY:
                statusBarStyle = 'light-content';
                break;
            case AppBarBackgroundColor.CANVAS:
                statusBarStyle = 'dark-content';
                break;
            default:
                statusBarStyle = 'light-content';
        }
        StatusBar.setBarStyle(statusBarStyle, true);
    }

    const backgroundColor =  () => {
        switch (props.backgroundColor) {
            case AppBarBackgroundColor.PRIMARY:
                return paperTheme.colors.primary
            case AppBarBackgroundColor.CANVAS:
                return paperTheme.colors.background
            default:
                return paperTheme.colors.primary
        }
    }

    const foregroundColor =  () => {
        switch (props.backgroundColor) {
            case AppBarBackgroundColor.PRIMARY:
                return paperTheme.colors.onPrimary
            case AppBarBackgroundColor.CANVAS:
                return paperTheme.colors.primary
            default:
                return paperTheme.colors.onPrimary
        }
    }

    const titleOffsetAnimation = navigationProgress.next?.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -appBarHeight],
    }) ?? navigationProgress.current?.interpolate({
        inputRange: [0, 1],
        outputRange: [appBarHeight, 0],
    });

    return (
        <View style={{
                height: appBarHeight, 
                backgroundColor: backgroundColor(),
            }}>
            <SafeAreaView style={{flex: 1}}>
                <View style={AppBarStyle.contentContainer}>
                        
                    {/* Left container */}
                    <View style={AppBarStyle.leftContainer}>
                        { 
                        props.disableBackAction 
                            ? 
                                <></> 
                            : 
                                <PaperAppbar.BackAction
                                    disabled={!props.headerProps.navigation.canGoBack()}
                                    color={foregroundColor()}
                                    onPress={() => {
                                        props.headerProps.navigation.goBack();
                                    }}/> 
                        }
                    </View>

                    {/* Title */}
                    <Animated.View style={{...AppBarStyle.titleContainer, transform: [{translateX: titleOffsetAnimation ?? 0}]}}>
                        <PaperAppbar.Content
                            style={AppBarStyle.title}
                            color={foregroundColor()}
                            title={title}
                        />
                    </Animated.View>

                    {/* Right Content */}
                    <View style={AppBarStyle.rightContainer}>
                        {
                            props.actionIcon === undefined
                            ? 
                                null
                            : 
                                <PaperAppbar.Action
                                    color={foregroundColor()}
                                    icon={props.actionIcon ?? {}} 
                                    onPress={props.onActionClick}/>
                        }
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
