import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { paperTheme } from '../theme/paper-theme';
import { Button } from './button';

const TaskCardStyle = StyleSheet.create({
    container: {
        width: '100%',
        elevation: 3,
        marginVertical: 7,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    iconContainer: {
        width: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    distanceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    confirmButton: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: paperTheme.colors.primary
    }
});

interface TaskCardProps {
    owner: string,
    tag: string,
    iconName: string
    distance: number | null,
    onPress: () => void
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
    return (
        <Card onPress={() => props.onPress()} style={TaskCardStyle.container}>
            <View style={{flexDirection: 'row', flex: 1, borderRadius: paperTheme.roundness, overflow: 'hidden'}}>
                <View style={TaskCardStyle.iconContainer}>
                    <MaterialCommunityIcons name={props.iconName} size={35} color={paperTheme.colors.primary} />
                </View>
                <View style={TaskCardStyle.titleContainer}>
                    <Text style={paperTheme.fonts.medium}>
                        {props.tag}
                    </Text>
                    <Text style={paperTheme.fonts.light}>
                        {props.owner}
                    </Text>
                </View>
                <View style={TaskCardStyle.distanceContainer}>
                    <MaterialCommunityIcons name='walk' size={30} color={paperTheme.colors.primary} />
                    <View>
                        <Text>
                            {props.distance}m
                        </Text>
                        <Text style={paperTheme.fonts.light}>
                            Distance
                        </Text>
                    </View>
                </View>
                <View style={TaskCardStyle.confirmButton}>
                    <MaterialCommunityIcons 
                        name='chevron-right' 
                        size={35} 
                        color={paperTheme.colors.onPrimary} />
                </View>
            </View>
        </Card>
    );
}

export default TaskCard;