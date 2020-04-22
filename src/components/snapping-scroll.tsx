import React, { useState, useRef, ReactNode, Component, createRef } from 'react';
import {View, Text, Animated, NativeSyntheticEvent, NativeScrollEvent, ScrollView, TextInput } from 'react-native';

interface SnappingScrollProps {
    scrollItems: ReactNode[],
    scrollItemsHeight: number,
    onScrollItemSnap: (index: number | null) => void,
}

export class SnappingScroll extends Component<SnappingScrollProps, {animatedScrollValue: Animated.Value}> {

    currentScroll: number = 0;
    scrollController: React.RefObject<typeof Animated.ScrollView> = createRef();

    constructor(props: SnappingScrollProps) {
        super(props)
        this.state = {
            animatedScrollValue: new Animated.Value(0)
        }
    }

    getItemScrollPos(elementIndex: number) {
        return elementIndex * this.props.scrollItemsHeight;
    }

    getItemIndexFromScrollPos(scrollPos: number) {
        for (let i = 0; i < this.props.scrollItems.length; i++) {
            if (this.getItemScrollPos(i) === scrollPos) {
                return i;
            }
        }
        return null;
    }

    render() {
        const snappingAnimationMaxShrink = 0.95;
        const snappingAnimationMaxOpacity = 0.6;
        const snappingAnimationFade = 80;
        
        return (
            <View>
                <Animated.ScrollView
                    // Seem to be an error in the type definitions, works but throws an error.
                    // We can not currently control the scroll view without getting an error :(
                    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42806
                    ref={this.scrollController}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={0}
                    snapToInterval={this.props.scrollItemsHeight}
                    snapToAlignment={"start"}
                    contentContainerStyle={{
                        paddingBottom: '50%',
                        paddingTop: this.props.scrollItemsHeight * 0.5
                    }}
                    scrollEventThrottle={16}
                    onScroll={
                        // Some weird React Native stuff to get the scroll value correctly
                        // Documentation can be found here: https://reactnative.dev/docs/animated#event
                        Animated.event(
                            [{nativeEvent: { 
                                    contentOffset: { 
                                        y: this.state.animatedScrollValue
                                    } 
                                } 
                            }],{
                                listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                                    this.currentScroll = event.nativeEvent.contentOffset.y;
                                },
                                useNativeDriver: true,
                            },
                        )
                    }
                    onMomentumScrollEnd={() => {
                        const itemIndex = this.getItemIndexFromScrollPos(this.currentScroll);
                        this.props.onScrollItemSnap(itemIndex);
                    }}
                    >
                        {
                            this.props.scrollItems.map((item, index) => {

                                // Creating a base intervall for the scroll animations
                                const scrollPos = this.getItemScrollPos(index);
                                const snappingAnimationBase = Animated.subtract(this.state.animatedScrollValue, scrollPos).interpolate({
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
                                        transform: [
                                            {scale: scaleAnimation}
                                        ],
                                        opacity: opacityAnimation,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: this.props.scrollItemsHeight, 
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
}
