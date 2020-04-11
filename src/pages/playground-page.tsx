import React, { Props, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';
import {Surface, Divider } from 'react-native-paper';
import { Button } from '../components/button';
import DividedView from '../components/divided-view/divided-view';
import { paperTheme } from '../theme/paper-theme';

export default function PlaygroundPage({navigation, route}:RoutePropsHelper<'Playground'>) {

    const [toggleOff, setToggleOff] = useState(true);

    return (
        <DividedView 
            upper={
                <Center>
                    <View>
                        <Button onPress={() => {}}>
                            I am a normal button
                        </Button>
                        <Divider style={{margin: 10}} />
                        <Button disabled={true} onPress={() => {}}>
                            I am a disabled button
                        </Button>
                        <Divider style={{margin: 10}} />
                        <Button color={paperTheme.colors.error} onPress={() => {}}>
                            I am a different color
                        </Button>
                        <Divider style={{margin: 10}} />
                        <Button size='big' onPress={() => {}}>
                            I am a big button
                        </Button>
                        <Divider style={{margin: 10}} />
                        <Button toggleOff={toggleOff} onPress={() => {setToggleOff(!toggleOff)}}>
                            Toggle me
                        </Button>
                    </View>
                </Center>
            }
            lower={
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    }}>
                    <Button 
                        expandHorizontal={false} 
                        size='big' 
                        disabled={false} 
                        onPress={() => {}}
                        color={paperTheme.colors.background}>
                        Not expanded
                    </Button>
                    <Divider style={{margin: 10}} />
                    <Button 
                        expandHorizontal={true} 
                        size='big' 
                        disabled={false} 
                        onPress={() => {}}
                        color={paperTheme.colors.background}>
                        Expanded
                    </Button>
                </View>
            }/>
    );
}