import React, { useRef, useState, useEffect, useImperativeHandle, RefForwardingComponent, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle, LatLng, EventUserLocation, Marker, Region } from 'react-native-maps';
import MapTheme from '../theme/map-theme.json';
import { paperTheme } from '../theme/paper-theme';
import { EdgeInsets } from 'react-native-safe-area-context';

const mapStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export interface TakeCareMapMarker {
    coordinates: LatLng
}

interface TakeCareMapProps {
    initialMapRegion?: Region
    followUser?: boolean
    markers?: TakeCareMapMarker[],
    activeMarkerIndex?: number | null,
    mapPadding?: EdgeInsets
    circle?: {
        radius: number,
        coordinates: LatLng
    },
    onPanDrag?: () => void,
    onRegionChange?:(region: Region) => void,
    onUserLocationChange?: (currentLocation: LatLng) => void
    onMarkerPressed?: (markerIndex: number) => void
}

export interface TakeCareMapHandles {
    goToMarker: (markerIndex: number) => void;
}

const TakeCareMap: RefForwardingComponent<TakeCareMapHandles, TakeCareMapProps> = (props, ref) => {

    const mapRef = useRef<MapView>(null);

    // The initial 
    const [currentRegion, setCurrentRegion] = useState(props.initialMapRegion);
    const [userLocation, setUserLocation] = useState<EventUserLocation["nativeEvent"] | null>(null);

    useEffect(() => {
        if (mapRef && userLocation && props.followUser) {
            mapRef.current?.animateCamera({
                center: userLocation?.coordinate
            });
        }
    }, [props.followUser]);

    useImperativeHandle(ref, () => ({
        goToMarker: (markerIndex: number) => {
            if (props.markers && props.markers.length > markerIndex) {
                let marker = props.markers[markerIndex];
                if (marker) {
                    mapRef.current?.getCamera().then((camera) => {
                        mapRef.current?.animateCamera({
                            center: marker.coordinates,
                            zoom: Math.max(12, camera.zoom),
                        }, {
                            duration: 250
                        });
                    })
                }
            }
        }
    }));
    
    const generateMarkerID = (markerIndex: number) => {
        return `marker-${markerIndex}`;
    }

    return (
        <MapView
            showsScale={true}
            ref={mapRef}
            provider={PROVIDER_GOOGLE} 
            style={mapStyle.container}
            customMapStyle={MapTheme}
            mapPadding={props.mapPadding}
            showsUserLocation={true}
            initialRegion={currentRegion}
            onRegionChangeComplete={(region) => {
                if (props.onRegionChange) {
                    props.onRegionChange(region);
                }
                setCurrentRegion(region);
            }}
            onPanDrag={(event) => {
                if (props.onPanDrag) {
                    props.onPanDrag();
                }
            }}
            onUserLocationChange={(event) => {
                setUserLocation(event.nativeEvent);

                // Follow the user
                if (props.followUser) {
                    mapRef.current?.animateCamera({
                        center: {
                            latitude: event.nativeEvent.coordinate.latitude,
                            longitude: event.nativeEvent.coordinate.longitude
                        },
                        zoom: 12
                    });
                }

                // Notify callback
                if (props.onUserLocationChange) {
                    props.onUserLocationChange(event.nativeEvent.coordinate);
                }
            }}
        >
            {/* The circle */}
            {
                props.circle
                ?
                    <TakeCareCircle
                        radius={props.circle.radius}
                        center={props.circle.coordinates}
                    />
                :
                    null
            }

            {/* The markers */}
            {
                props.markers
                ?
                    props.markers.map((marker, index) => {
                        let markerIsActive = false;
                        if (props.activeMarkerIndex !== null && props.activeMarkerIndex !== undefined) {
                            if (props.activeMarkerIndex === index) {
                                markerIsActive = true;
                            }
                        }
                        return (
                            <Marker
                                zIndex={markerIsActive ? 1 : 0}
                                onPress={() => {
                                    if (props.onMarkerPressed) {
                                        props.onMarkerPressed(index);
                                    }
                                }}
                                key={generateMarkerID(index)}
                                coordinate={marker.coordinates}
                                pinColor={markerIsActive ? paperTheme.colors.accent : paperTheme.colors.primary}
                            />
                        )
                    })
                :
                    null
            }
        </MapView>
    );
}

export default forwardRef(TakeCareMap);

const TakeCareCircle: React.FC<{radius: number, center: LatLng}> = (props) => {

    // We must update the circles state because of this bug:
    // https://github.com/react-native-community/react-native-maps/issues/2867
    const [strokeWidth, setStrokeWidth] = useState<number | undefined>()
    useEffect(() => {
        setStrokeWidth(2);
    }, []);

    return (
        <Circle
            fillColor={paperTheme.colors.primary + '15'}
            strokeColor={paperTheme.colors.primary}
            strokeWidth={strokeWidth}
            radius={props.radius}
            center={props.center}
        />
    )
}