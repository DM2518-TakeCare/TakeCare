import React, { useState, useEffect, useRef, FC } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { RoutePropsHelper } from '../router';
import { LatLng, Region } from 'react-native-maps';
import TakeCareMap, { TakeCareMapMarker, TakeCareMapHandles } from '../components/map';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import { MaterialIcons } from '@expo/vector-icons';
import { SnappingScroll } from '../components/snapping-scroll';
import { Card } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet'
import * as Permissions from 'expo-permissions';
import { Task } from '../model/shared/task-interface';
import { paperTheme } from '../theme/paper-theme';
import { HeaderBottomSheet } from '../components/header-bottom-sheet';
import { useSafeArea } from 'react-native-safe-area-context';
import Animated, { call, useCode } from 'react-native-reanimated';
import { distance } from '../model/math/geolocation';
import TaskCard from '../components/task-card';
import { AppState, AppActions, Dispatch } from '../model/redux/store';
import { connect } from 'react-redux';
import { SearchTaskQuery, searchTaskAction } from '../model/redux/searchTaskState';
import { getLogoFromTag } from '../helper/task-tag-logo';
import { Spinner } from '../components/loading-spinner';
import { Center } from '../components/center';

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

const getLocationPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    return (status === 'granted')
}

interface FindTaskPageProps {
    route: RoutePropsHelper<'FindTask'>,
    tasks: Task[],
    tasksLoading: boolean,
    lastSearchQuery: SearchTaskQuery | null
}

interface FindTaskActions {
    searchForNearbyTasks: (query: SearchTaskQuery) => void,
}

const FindTaskPage: FC<FindTaskPageProps & FindTaskActions> = (props) => {
    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(0);
    const [overSearchZoom, setOverSearchZoom] = useState(true);

    /** How near the map must be before searching tasks */
    const minLatDeltaForSearch = 0.5;

    /** Kilometers */
    const distanceForNewSearch = 500;
    /** Kilometers */
    const searchDistance = 1000;
    
    // Map
    const mapRef = useRef<TakeCareMapHandles>(null);
    const [userLocation, setUserLocation] = useState<LatLng | null>(null)
    const [followUserLocation, setFollowUserLocation] = useState(false);
    const overviewRegion = {
        latitude: 59.347647,
        longitude: 18.072440,
        latitudeDelta: 5,
        longitudeDelta: 5,
    }
    
    // Bottom sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomBarPos = useRef(new Animated.Value(0));
    const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
    
    // Layout
    const insets = useSafeArea();
    const windowHeight = Dimensions.get('window').height;
    const bottomSheetMaxHeight = windowHeight * 0.5;
    const bottomSheetMinHeight = 50 + insets.bottom;

    useEffect(() => {
        getLocationPermission().then(
            permission => {
                setFollowUserLocation(permission)
            }
        );
    }, []);

    const checkSearchNeeded = (region: Region) => {
        
        // Check that we are zoomed in enough
        if (region.latitudeDelta > minLatDeltaForSearch) {
            setOverSearchZoom(true);
            return;
        }
        
        setOverSearchZoom(false);

        // Check that we are not already loading
        // TODO IF TIME, discard the old loading and start a new one
        if (props.tasksLoading) {
            return;
        }

        // Check that we have moved enough from the last search
        let distanceFromLastSearch = distanceForNewSearch;
        if (props.lastSearchQuery) {
            distanceFromLastSearch = Math.round(distance(
                props.lastSearchQuery?.coordinate.latitude, 
                props.lastSearchQuery?.coordinate.longitude, 
                region.latitude, 
                region.longitude
            ) / 1000);
        }
        
        if (distanceFromLastSearch < distanceForNewSearch) {
            return;
        }

        props.searchForNearbyTasks({
            coordinate: {latitude: region.latitude, longitude: region.longitude},
            radius: searchDistance
        });
    }

    const generateMarkers = (): TakeCareMapMarker[] => {
        return props.tasks.map(task => {
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
            <View style={{flex: 1}}>
                <TakeCareMap
                    ref={mapRef}
                    // TODO: This should be changed to an overview of Sweden / The Earth
                    // until we get the users geolocation. Is currently KTH for testing
                    initialMapRegion={overviewRegion}
                    mapPadding={{left: 0, right: 0, top: 0, bottom: bottomSheetIsOpen ? bottomSheetMaxHeight -  bottomSheetMinHeight : 0}}
                    activeMarkerIndex={activeTaskIndex}
                    markers={generateMarkers()}
                    followUser={followUserLocation}
                    onPanDrag={() => {
                        if (followUserLocation) {
                            setFollowUserLocation(false);
                        }
                    }}
                    onRegionChange={(region) => {
                        checkSearchNeeded(region);
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
            </View>

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
                        {
                        props.tasksLoading || overSearchZoom
                            ?
                                <View style={{height: '100%', paddingBottom: 75}}>
                                    <Center>
                                        {
                                            props.tasksLoading 
                                            ?
                                                <Spinner isLoading={true}/>
                                            :
                                                <Text>Zoom in to a region to see tasks</Text>
                                        }
                                    </Center>
                                </View>
                            :
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
                                        props.tasks.map(task => {
                                            return <TaskCard
                                                onPress={() => props.route.navigation.navigate('HelpDetails')}
                                                owner={task.owner.name}
                                                iconName={getLogoFromTag(task.tags[0])}
                                                tag={task.tags.join(',')}
                                                distance={calculateDistance(task.coordinates)}
                                            />
                                        })
                                    }
                                />
                        }
                    </View>
                } 
            />
        </View>
    );
}

export default connect(
    (state: AppState, router: RoutePropsHelper<'FindTask'> ): FindTaskPageProps => ({
        route: router,
        tasks: state.searchTaskState.searchResults,
        tasksLoading: state.searchTaskState.loading,
        lastSearchQuery: state.searchTaskState.lastSearchQuery
    }),
    (dispatch: Dispatch): FindTaskActions => ({
        searchForNearbyTasks: query => dispatch(searchTaskAction(query))
    })
)(FindTaskPage);
