import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Text, Headline, DataTable} from 'react-native-paper';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import TakeCareMap, { TakeCareMapMarker, TakeCareMapHandles } from '../components/map';
import { LinearGradient } from 'expo-linear-gradient';
import { paperTheme } from '../theme/paper-theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: paperTheme.colors.background,
       
    },
    hej: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: paperTheme.colors.background,
        opacity: 0.8,
        height: '20%',
        width: '100%'
    },
    mapCont: {
        flex: 1,
        zIndex: -1
    },
    mapContent: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        paddingLeft: 25,
        paddingBottom: 25,
        width: '100%'
        

    },
    tagCont: {
        flexDirection: 'row', 
        zIndex: 1
    },
    tagStyle: {
        fontWeight: 'bold'
    },
    userCont: {
        flexDirection: 'column', 
        zIndex: 1
    },
    descStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 10
    }
});

export default function HelpDetails({navigation, route}:RoutePropsHelper<'HelpDetails'>) {

    const taskDetails = {
        user: { name: 'Stefan Karlsson', address: 'Testgatan 3', coordinates: {latitude: 59.347647, longitude: 18.072340}},
        task: { desc: 'I need help getting my mail and some groceries', tags: ['Mail', 'Groceries'] }
    }

    const mapRef = useRef<TakeCareMapHandles>(null);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.mapCont}>
                        <TakeCareMap
                            ref={mapRef}
                            initialMapRegion={{
                                latitude: taskDetails.user.coordinates.latitude,
                                longitude: taskDetails.user.coordinates.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            markers={[{coordinates: taskDetails.user.coordinates}]}
                            />
                            <LinearGradient colors={[ 'rgba(255,255,255,0)', paperTheme.colors.background,paperTheme.colors.background, paperTheme.colors.background  ]} style={styles.mapContent}>
                                <View style={styles.tagCont}>
                                    {taskDetails.task.tags.map((tag, i) =>
                                    taskDetails.task.tags.length - 1 === i ? <Headline key={tag + i} style={styles.tagStyle}>{tag}</Headline> : 
                                    <Headline key={tag + i} style={styles.tagStyle}>{tag + ', '}</Headline> 
                                    )}
                                </View>
                                <View style={styles.userCont}>
                                    <UserInfo type='name' user={taskDetails.user}/>
                                    <UserInfo type='address' user={taskDetails.user}/>
                                </View>
                            </LinearGradient>
                        </View>
                        <ContentPadding>    
                            <Text style={styles.descStyle}>{taskDetails.task.desc}</Text>
                                <Text>Placeholder for table</Text>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Item</DataTable.Title>
                                        <DataTable.Title numeric>Quantity</DataTable.Title>
                                    </DataTable.Header>

                                    <DataTable.Row>
                                        <DataTable.Cell>Milk</DataTable.Cell>
                                        <DataTable.Cell numeric>1</DataTable.Cell>
                                    </DataTable.Row>

                                    <DataTable.Row>
                                        <DataTable.Cell>Pasta</DataTable.Cell>
                                        <DataTable.Cell numeric>500g</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            <Button size='big' onPress={() => {}}>Accept Task</Button>
                        </ContentPadding>
                </View>
        </ScrollView>
    );

}