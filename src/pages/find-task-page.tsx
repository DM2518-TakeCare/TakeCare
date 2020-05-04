import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { RoutePropsHelper } from '../router';
import { LatLng } from 'react-native-maps';
import TakeCareMap, { TakeCareMapMarker, TakeCareMapHandles } from '../components/map';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import { MaterialIcons } from '@expo/vector-icons';
import { SnappingScroll } from '../components/snapping-scroll';
import { Card } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet'
import * as Permissions from 'expo-permissions';
import { paperTheme } from '../theme/paper-theme';
import { HeaderBottomSheet } from '../components/header-bottom-sheet';
import { useSafeArea } from 'react-native-safe-area-context';
import Animated, { call, useCode } from 'react-native-reanimated';
import { distance } from '../model/math/geolocation';
import TaskCard from '../components/task-card';

const findTaskStyle = StyleSheet.create({
    mapContainer: {
        position: 'relative',
    },
    mapControls: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
});

interface Task {
    owner: string,
    tag: string,
    icon: string,
    coordinates: LatLng 
}

const getLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    return (status === 'granted')
}

export default function FindTaskPage({navigation, route}:RoutePropsHelper<'FindTask'>) {
    const [radius, setRadius] = useState(100);
    const [followUserLocation, setFollowUserLocation] = useState(false);
    const [userLocation, setUserLocation] = useState<LatLng | null>(null)
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(0);
    const mapRef = useRef<TakeCareMapHandles>(null);

    // Bottom sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomBarPos = useRef(new Animated.Value(0));
    const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
    
    // Layout
    const insets = useSafeArea();
    const windowHeight = Dimensions.get('window').height;
    const bottomSheetMaxHeight = windowHeight * 0.5;
    const bottomSheetMinHeight = 50 + insets.bottom;

    useCode(() => {
        return call([bottomBarPos.current], (event) => {
            // console.log(event)
        });
    }, [bottomBarPos.current]);
    
    useEffect(() => {
        setTasks(searchForNewTasks());
        getLocationPermission().then(
            permission=> {
                setFollowUserLocation(permission)
            }
        );
    }, []);

    const searchForNewTasks = (): Task[] => {
        return [
            {
                owner: 'Maja Holmström',
                tag: 'Medicine',
                icon: 'medical-bag',
                coordinates: {latitude: 59.347647, longitude: 18.072340}
            },
            {
                owner: "Maja Andersson",
                tag: 'Food',
                icon: 'shopping',
                coordinates: {latitude: 59.347747, longitude: 18.072640}
            },
            {
                owner: 'Gunnar Gunnarson',
                tag: 'Mail',
                icon: 'email',
                coordinates: {latitude: 59.347447, longitude: 18.072340}
            },
            {
                owner: 'Adam Jonsson',
                tag: 'Medicine',
                icon: 'medical-bag',
                coordinates: {latitude: 59.347847, longitude: 18.073640}
            },
            {
                owner: 'Markus Söderberg',
                tag: 'Mail',
                icon: 'email',
                coordinates: {latitude: 59.347247, longitude: 18.076540}
            },
        ]
    }

    const generateMarkers = (): TakeCareMapMarker[] => {
        return tasks.map(task => {
            return {
                coordinates: task.coordinates
            }
        })
    }
    
    const calculateDistance = (taskCoordinate: LatLng) => {
        if (userLocation) {
            return Math.round(distance(
                userLocation?.latitude, 
                userLocation?.longitude, 
                taskCoordinate.latitude, 
                taskCoordinate.longitude
            ));
        }
        return null;
    }

    return (
        <View style={{flex: 1}}>
            <Animated.View style={{flex: 1}}>
                <TakeCareMap
                    ref={mapRef}
                    // TODO: This should be changed to an overview of Sweden / The Earth
                    // until we get the users geolocation. Is currently KTH for testing
                    initialMapRegion={{
                        latitude: 59.347647,
                        longitude: 18.072440,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    mapPadding={{left: 0, right: 0, top: 0, bottom: bottomSheetIsOpen ? bottomSheetMaxHeight -  bottomSheetMinHeight : 0}}
                    activeMarkerIndex={activeTaskIndex}
                    markers={generateMarkers()}
                    followUser={followUserLocation}
                    circle={{
                        coordinates: userLocation ?? {
                            latitude: 59.347647,
                            longitude: 18.072440,
                        },
                        radius: radius,
                    }}
                    onPanDrag={() => {
                        if (followUserLocation) {
                            setFollowUserLocation(false);
                        }
                    }}
                    onUserLocationChange={(location) => {
                        setUserLocation(location);
                    }}
                    onMarkerPressed={taskIndex => {
                        bottomSheetRef.current?.snapTo(0);
                        setActiveTaskIndex(taskIndex);
                    }}
                />
                <Animated.View  style={{...findTaskStyle.mapControls, transform: [{translateY: Animated.add(-bottomSheetMaxHeight, bottomBarPos.current)}]}}>
                    <ContentPadding>
                        <Button
                            forceForegroundStyle='light'
                            expandHorizontal={false} 
                            toggleOff={!followUserLocation} 
                            onPress={() => setFollowUserLocation(!followUserLocation)}>
                            <MaterialIcons size={25} name='my-location'/>
                        </Button>
                    </ContentPadding>
                </Animated.View>
            </Animated.View>

            {/* Placeholder for snapping sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                onOpenEnd={() => setBottomSheetIsOpen(true)}
                onCloseEnd={() => setBottomSheetIsOpen(false)}
                headerPosition={bottomBarPos.current} 
                snapPoints={[bottomSheetMaxHeight, bottomSheetMinHeight]} 
                enabledContentGestureInteraction={false}
                renderHeader={() => <HeaderBottomSheet/>} 
                renderContent={() =>
                    <View style={{backgroundColor: paperTheme.colors.surface}}>
                        <SnappingScroll
                            activeScrollItem={activeTaskIndex}
                            onScrollItemSnap={index => {
                                setActiveTaskIndex(index);
                                if (index !== null) {
                                    setFollowUserLocation(false);
                                    mapRef.current?.goToMarker(index);
                                }
                            }}
                            scrollItemsHeight={90}
                            scrollItems={
                                tasks.map(task => {
                                    return <TaskCard
                                        onPress={() => {/** TODO */}}
                                        owner={task.owner}
                                        iconName={task.icon}
                                        tag={task.tag}
                                        distance={calculateDistance(task.coordinates)}
                                    />
                                })
                            }
                            />
                    </View>
                } 
            />
        </View>
    );
}
