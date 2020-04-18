import React from 'react';
import { Text, View } from 'react-native';

import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { DropDownCard } from '../components/drop-down-card';
import { paperTheme } from '../theme/paper-theme';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ContentPadding } from '../components/content-padding';

const randomText = () => {
    return <View>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
        <Text>
            Hello, this is a random text
        </Text>
    </View>
}

export default function PlaygroundPage({ navigation, route }: RoutePropsHelper<'Playground'>) {
    return (
        <ContentPadding>
            <Center>
                <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
                    <View style={{ marginBottom: 10 }}>
                        <DropDownCard
                            leading={
                                <MaterialCommunityIcons name="account" size={25} color={paperTheme.colors.accent} />
                            }
                            title="Title"
                            subtitle="Sub title"
                            dropDownContent={
                                <View>
                                    {randomText()}
                                </View>
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <DropDownCard
                            leading={
                                <MaterialCommunityIcons name="account" size={25} color={paperTheme.colors.accent} />
                            }
                            title="Title"
                            subtitle="Sub title"
                            dropDownContent={
                                <View>
                                    {randomText()}
                                </View>
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <DropDownCard
                            leading={
                                <MaterialCommunityIcons name="account" size={25} color={paperTheme.colors.accent} />
                            }
                            title="Title"
                            subtitle="Sub title"
                            dropDownContent={
                                <View>
                                    {randomText()}
                                </View>
                            }
                        />
                    </View>
                </View>
            </Center>
        </ContentPadding>
    );
}