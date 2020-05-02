import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Text, Headline} from 'react-native-paper';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';
import TakeCareMap, { TakeCareMapHandles } from '../components/map';
import { LinearGradient } from 'expo-linear-gradient';
import { paperTheme } from '../theme/paper-theme';
import Table from '../components/table';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    mapCont: {
        flex: 1,
        zIndex: -1
    },
    mapContent: {
        position: 'absolute',
        bottom: -50,
        padding: 25,
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
    returnButtonCont: {
        flex: 1,
        alignItems: 'flex-end'
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
        task: { desc: 'I need help getting my mail and some groceries', tags: ['Mail', 'Groceries'], shoppingList: [['Milk', '2'], ['Pasta', '500g'], ['Butter', '1'],['Butter', '1'],['Butter', '1'],['Butter', '1'],['Butter', '1'],['Butter', '1'], ]}
    }
    const tableTitles = [{data: 'Item'}, {data: 'Quantity'}]

    const mapRef = useRef<TakeCareMapHandles>(null);

    const [goToTask, setGoToTask] = useState(true)

    const goBacktoTask = () => {
        mapRef.current?.goToChosenTask(taskDetails.user.coordinates)
        setGoToTask(true)
    }

    return (
        <View style={{flex: 1, backgroundColor: paperTheme.colors.background}}>
            <View style={{flex: 1}}>
                <View style={{flexGrow: 1}}>
                    <TakeCareMap
                        ref={mapRef}
                        initialMapRegion={{
                            latitude: taskDetails.user.coordinates.latitude,
                            longitude:taskDetails.user.coordinates.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        markers={[{coordinates: taskDetails.user.coordinates}]}
                        onPanDrag={() => {
                            setGoToTask(false);
                            }}
                        />
                </View>
                <LinearGradient colors={['rgba(255,255,255,0)', paperTheme.colors.background,paperTheme.colors.background, paperTheme.colors.background]} style={styles.mapContent}>
                    <View style={styles.tagCont}>
                        {taskDetails.task.tags.map((tag, i) =>
                        taskDetails.task.tags.length - 1 === i ? <Headline key={tag + i} style={styles.tagStyle}>{tag}</Headline> : 
                        <Headline key={tag + i} style={styles.tagStyle}>{tag + ', '}</Headline> 
                        )}
                        <View style={styles.returnButtonCont}>
                            <View>
                                <Button 
                                    forceForegroundStyle='light'
                                    expandHorizontal={false} 
                                    toggleOff={goToTask} 
                                    onPress={() => goBacktoTask()}>
                                    <MaterialIcons size={25} name='location-on'/>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userCont}>
                        <UserInfo type='name' user={taskDetails.user}/>
                        <UserInfo type='address' user={taskDetails.user}/>
                    </View>
                    
                    <Text style={styles.descStyle}>{taskDetails.task.desc}</Text>
                </LinearGradient>
            </View>
            <View style={{flex: 1}}>
                <ContentPadding>    
                    <ScrollView>
                            <View>
                                <Table tableTitles={tableTitles} tableData={taskDetails.task.shoppingList}/>
                            </View>
                    </ScrollView>
                    <View style={{ justifyContent: 'flex-end'}}>
                        <Button size='big' onPress={() => navigation.navigate('Tasks')}>Accept Task</Button>      
                    </View>
                </ContentPadding>
            </View>
        </View>
 
    );

}