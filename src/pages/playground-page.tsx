import React from 'react';
import { Text, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';
import BottomSheet from 'reanimated-bottom-sheet'
import { HeaderBottomSheet } from '../components/header-bottom-sheet';

export default function PlaygroundPage({ navigation, route }: RoutePropsHelper<'Playground'>) {
    return (
        <ContentPadding>
            <Center>
               <Text>Hello</Text>
               <BottomSheet
                snapPoints = {[450, 300, 0]}
                renderContent = {() => <Text>Hej</Text>}
                renderHeader = {() => <HeaderBottomSheet><Text>Hej</Text></HeaderBottomSheet>}></BottomSheet>
            </Center>
        </ContentPadding>
    );
}