import React from 'react';
import { Text, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { ContentPadding } from '../components/content-padding';
import TaskCard from '../components/task-card';

export default function PlaygroundPage({ navigation, route }: RoutePropsHelper<'Playground'>) {
    return (
        <ContentPadding>
            <Center>
                <View style={{height: 80}}>
                    <TaskCard
                        distance={123}
                        iconName="email"
                        owner="Göran Sjögren"
                        tag="Mail"
                        onPress={() => {}}
                    />
                </View>
            </Center>
        </ContentPadding>
    );
}