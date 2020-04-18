import React, { ReactNode, ReactElement, useState } from 'react';
import { StyleSheet, View, Text, Button, Animated, Easing, LayoutChangeEvent } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { paperTheme } from '../theme/paper-theme';

const dropDownCardStyleSheet = StyleSheet.create({
    card: {
        width: '100%',
        padding: 15,
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 10,
    },
    dropDownDivider: {
        marginTop: 15,
        marginBottom: 15,
    }
});

interface DropDownCardProps {
    leading: ReactElement,
    title: string,
    subtitle?: string,
    /** The content must be static, after rendered */
    dropDownContent: ReactElement
}

export const DropDownCard: React.FC<DropDownCardProps> = (props) => {

    const [arrowRotateAnimation] = useState(new Animated.Value(0));
    const [dropDownHeightAnimation] = useState(new Animated.Value(0));
    const [contentOpacityAnimation] = useState(new Animated.Value(0));
    const [dropDownHeight, setDropDownHeight] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleExpanded = () => {
        startAnimations(!isOpen);
        setIsOpen(!isOpen);
    };

    const startAnimations = (open: boolean) => {
        const opacityDuration = 200;

        Animated.timing(
            arrowRotateAnimation,
            {
                toValue: open ? Math.PI : 0,
                duration: 250,
                isInteraction: true,
                useNativeDriver: true
            }
        ).start()
        
        Animated.timing(
            contentOpacityAnimation,
            {
                toValue: open ? 1 : 0,
                duration: opacityDuration,
                isInteraction: true,
            }
        ).start()

        Animated.timing(
            dropDownHeightAnimation,
            {
                toValue: open ? (dropDownHeight ?? 0) : 0,
                duration: 500,
                easing: Easing.elastic(open ? 1 : 0),
                isInteraction: true,
            }
        ).start()
    };

    return (
        <Card onPress={() => toggleExpanded()} style={dropDownCardStyleSheet.card}>
            <View style={dropDownCardStyleSheet.listContainer}>
                <View>
                    {props.leading}
                </View>
                <View style={dropDownCardStyleSheet.titleContainer}>
                    <View>
                        <Text style={paperTheme.fonts.medium}>
                            {props.title}
                        </Text>
                    </View>
                    {
                        props.subtitle
                        ? 
                            <View>
                                <Text style={paperTheme.fonts.light}>
                                    {props.subtitle}
                                </Text>
                            </View>
                        :
                            null
                    }
                </View>
                <Animated.View style={{
                    transform: [{rotate: arrowRotateAnimation}]
                }}>
                    <MaterialCommunityIcons name="chevron-down" size={25} color={paperTheme.colors.accent} />
                </Animated.View>
            </View>
            <Animated.View 
                style={{
                    overflow: 'hidden',
                    height: dropDownHeight === null ? null : dropDownHeightAnimation,
                    opacity: contentOpacityAnimation,
                }} 
                onLayout={(event: LayoutChangeEvent) => {
                    if(dropDownHeight === null) {
                        setDropDownHeight(event.nativeEvent.layout.height);
                    }
                }}>
                <Divider style={dropDownCardStyleSheet.dropDownDivider} />
                {props.dropDownContent}
            </Animated.View>
        </Card>
    );
}
