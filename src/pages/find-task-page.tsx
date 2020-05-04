import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RoutePropsHelper } from '../router';
import { LatLng } from 'react-native-maps';
import TakeCareMap, { TakeCareMapMarker, TakeCareMapHandles } from '../components/map';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import { MaterialIcons } from '@expo/vector-icons';
import { SnappingScroll } from '../components/snapping-scroll';
import { Card } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { Task } from '../model/shared/task-interface';

const findTaskStyle = StyleSheet.create({
    mapContainer: {
        position: 'relative'
    },
    mapControls: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    taskCard: {
        width: '100%',
        marginVertical: 5,
        flex: 1,
    },
    taskCardContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

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
    
    useEffect(() => {
        setTasks(searchForNewTasks());
        getLocationPermission().then(
            permission=> {
                setFollowUserLocation(permission)
            }
        );
    }, []);

    const searchForNewTasks = () : Task[] => {
        return [
            {   
                id: '',
                coordinates: {latitude: 59.347647, longitude: 18.072340},
                owner: {id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
                tags: ['Mail', 'Groceries'],
                desc: '',
            },
            {
                id: '',
                coordinates: {latitude: 59.347747, longitude: 18.072640},
                owner: {id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
                tags: ['Mail'],
                desc: '',
            },
            {   
                id: '',
                coordinates: {latitude: 59.347447, longitude: 18.072340},
                owner: {id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
                tags: ['Mail'],
                desc: '',
            },
            {   
                id: '',
                coordinates: {latitude: 59.347847, longitude: 18.073640},
                owner: {id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
                tags: ['Mail'],
                desc: '',
            },
            {   
                id: '',
                coordinates: {latitude: 59.347247, longitude: 18.076540},
                owner: {id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3'},
                tags: ['Mail'],
                desc: '',
            },
        ]
    }

    const generateTasksCards = () => {
        return tasks.map(task => {
            return (
                <Card style={findTaskStyle.taskCard}>
                    <View style={findTaskStyle.taskCardContent}>
                        <Text>
                            {task.tags.join(', ')}
                        </Text>
                    </View>
                </Card>
            );
        });
    }

    const generateMarkers = (): TakeCareMapMarker[] => {
        return tasks.map(task => {
            return {
                coordinates: task.coordinates
            }
        })
    }

    return (
        <View style={{flex: 2}}>
            <View style={{flex: 1}}>
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
                        setActiveTaskIndex(taskIndex);
                    }}
                />
                <View style={findTaskStyle.mapControls}>
                    <ContentPadding>
                        <Button
                            forceForegroundStyle='light'
                            expandHorizontal={false} 
                            toggleOff={!followUserLocation} 
                            onPress={() => setFollowUserLocation(!followUserLocation)}>
                            <MaterialIcons size={25} name='my-location'/>
                        </Button>
                    </ContentPadding>
                </View>
            </View>

            {/* Placeholder for snapping sheet */}
            <View style={{flex: 0.5}}>
                <SnappingScroll
                    activeScrollItem={activeTaskIndex}
                    onScrollItemSnap={index => {
                        setActiveTaskIndex(index);
                        if (index !== null) {
                            setFollowUserLocation(false);
                            mapRef.current?.goToMarker(index);
                        }
                    }}
                    scrollItemsHeight={80}
                    scrollItems={
                        generateTasksCards()
                    }
                    />
            </View>
        </View>
    );
}
