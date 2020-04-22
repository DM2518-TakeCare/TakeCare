import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { StyleSheet, View, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface SnappingScrollProps {
    scrollItems: ReactNode[],
    scrollItemsHeight: number,
    activeScrollItem?: number | null,
    onScrollItemSnap: (index: number | null) => void,
}

const snappingScrollStyle = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: '50%',
        paddingHorizontal: 10
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export const SnappingScroll: React.FC<SnappingScrollProps> = (props) => {

    let currentScroll: number = 0;
    const snappingAnimationMaxShrink = 0.95;
    const snappingAnimationMaxOpacity = 0.6;
    const snappingAnimationFade = 80;

    const [animatedScrollValue] = useState(new Animated.Value(0));
    const [scrollByUser, setScrollByUser] = useState(true);
    const scrollRef = useRef<typeof Animated.ScrollView>(null);

    useEffect(() => {
        const activeScrollItem = props.activeScrollItem;
        if (activeScrollItem !== null && activeScrollItem !== undefined) {
            setScrollByUser(false);
            scrollRef.current?.getNode().scrollTo({
                y: activeScrollItem * props.scrollItemsHeight
            });
        }
    }, [props.activeScrollItem])

    const getItemScrollPos = (elementIndex: number) => {
        return elementIndex * props.scrollItemsHeight;
    }

    const getItemIndexFromScrollPos = (scrollPos: number) => {
        for (let i = 0; i < props.scrollItems.length; i++) {
            if (getItemScrollPos(i) === scrollPos) {
                return i;
            }
        }
        return null;
    }

    return (
        <View>
            <Animated.ScrollView
                // Seem to be an error in the type definitions, works but throws an error.
                // We can not currently control the scroll view without getting an error :(
                // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42806
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                decelerationRate={0}
                snapToInterval={props.scrollItemsHeight}
                snapToAlignment={"start"}
                contentContainerStyle={{
                    ...snappingScrollStyle.scrollViewContainer,
                    paddingTop: props.scrollItemsHeight * 0.5,
                }}
                scrollEventThrottle={16}
                onScroll={
                    // Some weird React Native stuff to get the scroll value correctly
                    // Documentation can be found here: https://reactnative.dev/docs/animated#event
                    Animated.event(
                        [{nativeEvent: { 
                                contentOffset: { 
                                    y: animatedScrollValue
                                } 
                            } 
                        }],{
                            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                                currentScroll = event.nativeEvent.contentOffset.y;
                            },
                            useNativeDriver: true,
                        },
                    )
                }
                onTouchMove={() => {
                    setScrollByUser(true);
                }}
                onMomentumScrollEnd={() => {
                    if (scrollByUser) {
                        const itemIndex = getItemIndexFromScrollPos(currentScroll);
                        props.onScrollItemSnap(itemIndex);
                    }
                }}
                >
                    {
                        props.scrollItems.map((item, index) => {

                            // Creating a base intervall for the scroll animations
                            const scrollPos = getItemScrollPos(index);
                            const snappingAnimationBase = Animated.subtract(animatedScrollValue, scrollPos).interpolate({
                                inputRange: [-snappingAnimationFade, 0, snappingAnimationFade],
                                outputRange: [0, 1, 0],
                                extrapolate: 'clamp',
                            });

                            const scaleAnimation = snappingAnimationBase.interpolate({
                                inputRange: [0, 1],
                                outputRange: [snappingAnimationMaxShrink, 1],
                            });

                            const opacityAnimation = snappingAnimationBase.interpolate({
                                inputRange: [0, 1],
                                outputRange: [snappingAnimationMaxOpacity, 1],
                            });

                            return (
                                <Animated.View key={index} style={{
                                    ...snappingScrollStyle.itemContainer,
                                    transform: [
                                        {scale: scaleAnimation}
                                    ],
                                    opacity: opacityAnimation,
                                    height: props.scrollItemsHeight, 
                                }}>
                                    {item}
                                </Animated.View>
                            )
                        })
                    }
            </Animated.ScrollView>
        </View>
    );
}
