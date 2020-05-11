import React, { useRef, useState, FC } from 'react';
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
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { AppState, Dispatch } from '../model/redux/store';
import { Task, ShoppingItem } from '../model/shared/task-interface';
import { User } from '../model/shared/user-interface';
import { acceptTask } from '../model/redux/giveHelpState';


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
        paddingTop: 10,
        paddingBottom: 10
    }
});

interface HelpDetailsProps {
    route: RoutePropsHelper<'HelpDetails'>,
    viewedTask: Task | undefined,
    user: User
}

interface HelpDetailsActions {
    acceptTask: (task: Task, helper: User, onSuccess: () => void, onFail: () => void) => void,
}

const HelpDetails: FC<HelpDetailsProps & HelpDetailsActions> = (props) => {
    const tableTitles = [{data: 'Item'}, {data: 'Amount'}]

    const mapRef = useRef<TakeCareMapHandles>(null);

    const [goToTask, setGoToTask] = useState(true)

    const shoppingList: ShoppingItem[] = props.viewedTask?.shoppingList ?? []

    const goBacktoTask = () => {
        mapRef.current?.goToMarker(0)
        setGoToTask(true)
    }

    return (
        <View style={{flex: 1, backgroundColor: paperTheme.colors.background}}>
            <View style={{flex: 1}}>
                <View style={{flexGrow: 1}}>
                    <TakeCareMap
                        ref={mapRef}
                        initialMapRegion={{
                            latitude: props.viewedTask?.coordinates.latitude!,
                            longitude: props.viewedTask?.coordinates.longitude!,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        markers={[{coordinates: props.viewedTask?.coordinates!}]}
                        onPanDrag={() => {
                            setGoToTask(false);
                            }}
                        />
                </View>
                <LinearGradient colors={['rgba(255,255,255,0)', paperTheme.colors.background,paperTheme.colors.background, paperTheme.colors.background]} style={styles.mapContent}>
                    <View style={styles.tagCont}>
                        {props.viewedTask?.tags.map((tag, i) =>
                            props.viewedTask?.tags.length! - 1 === i ? <Headline key={tag + i} style={styles.tagStyle}>{tag}</Headline> : 
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
                        <UserInfo type='name' user={props.viewedTask?.owner!}/>
                        <UserInfo type='address' user={props.viewedTask?.owner!}/>
                    </View>
                    <Text style={styles.descStyle}>{props.viewedTask?.desc}</Text>
                </LinearGradient>
            </View>
            <View style={{flex: 1}}>
                <ContentPadding>    
                    <ScrollView>
                            { shoppingList.length > 0 ? 
                                <View>
                                    <Table tableTitles={tableTitles} tableData={shoppingList.map(item =>[item.productName, item.amount])}/>
                                </View>
                            : <></> }
                    </ScrollView>
                    <View style={{ justifyContent: 'flex-end'}}>
                        <Button 
                            size='big' 
                            onPress={() => {
                                props.viewedTask ? props.acceptTask(props.viewedTask, props.user, () => {
                                    props.route.navigation.replace('Tasks')
                                }, () => {
                                    alert('Someone else has already accepted this task!');
                                    props.route.navigation.pop();
                                }) : null
                            }}>Accept Task</Button>      
                    </View>
                </ContentPadding>
            </View>
        </View>
 
    );

}

export default connect(
    (state: AppState, router: RoutePropsHelper<'HelpDetails'> ): HelpDetailsProps => ({
        route: router,
        viewedTask: state.giveHelpState.viewedTask,
        user: state.userState.user!
    }),
    (dispatch: Dispatch): HelpDetailsActions => ({
        acceptTask: (task, helper, onSuccess, onFail) => dispatch(acceptTask(task, helper, onSuccess, onFail))
    })
)(HelpDetails);