import React, { useState, useRef, FC, useEffect } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, ScrollView, Text } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Divider, Switch, Chip, DataTable, Caption } from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme';
import Table from '../components/table';
import { MaterialIcons } from '@expo/vector-icons';
import { Task, Tag, ShoppingItem } from '../model/shared/task-interface';
import { User } from '../model/shared/user-interface';
import { createNewTask } from '../model/redux/receiveHelpState';
import { connect } from 'react-redux';
import { AppState, Dispatch } from '../model/redux/store';
import { AddNewTaskParam } from '../model/task-model';
import { setAppBarAction } from '../model/redux/appBarState';
import { StackActions } from '@react-navigation/native';
import _ from 'lodash';
import * as Location from 'expo-location';
import { LatLng } from 'react-native-maps';
import { Center } from '../components/center';
import { Spinner } from '../components/loading-spinner';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1, 
        justifyContent: 'space-between'
    },
    input: {
        flex: 1,
        padding: 10,
    },
    row: {
        padding: 10,
        flexDirection: 'row',
    },
    shoppingInput: {
        flex: 1
    },
    addShopping: {
        flexGrow: 1, 
        justifyContent: 'center'
    }
});

interface CreateTaskProps {
    route: RoutePropsHelper<'CreateTask'>,
    viewedTask: Task | undefined,
    taskLoading: boolean,
    user: User
}

interface CreateTaskActions {
    createNewTask: (task: AddNewTaskParam, onDone: () => void) => void,
    setAppBarAction: (action: Function) => void
}

const CreateTask: FC<CreateTaskProps & CreateTaskActions> = (props) => {
    
    const tags = ['Groceries', 'Medicine', 'Mail']
    let initialTagState: Record<string, boolean> = {}
    for (const tag of tags) {
        initialTagState = ({...initialTagState, ...{[tag]: false}});
    }
    const [tagSelect, setTagSelect] = useState(initialTagState);
    const [useShoppingList, setUseShoppingList] = useState(false);
    const [description, setDescription] = useState('');
    const [shoppingInput, setShoppingInput] = useState('');
    const [shoppingQtyInput, setShoppingQtyInput] = useState('');
    const [tableData, setTableData]: any = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const shoppingListItemInputRef = useRef<TextInput>(null);

    const toggleShoppingList = () => {
        setUseShoppingList(!useShoppingList);
    };

    const createNewTask = async (desc: string, tags: Tag[], shoppingList: Array<any>, useList: boolean) => {

        if (props.taskLoading) {
            return;
        }

        // TODO, handel when location can not be accessed
        let shopping: ShoppingItem[] = [];
        for (const item of shoppingList){
            shopping = [...shopping, {productName: item[0], amount: item[1]}]
        }
        let { status } = await Location.requestPermissionsAsync();
        let currentPos = await Location.getCurrentPositionAsync({});
        props.createNewTask({
            owner: props.user,
            tags,
            description: desc,
            coordinates: {latitude: currentPos?.coords.latitude ?? 0, longitude: currentPos?.coords.longitude ?? 0},
            shoppingList: useList ? (shopping as ShoppingItem[]) : undefined
        }, () => {
            props.route.navigation.replace('TaskCreated')
        })
    }
    
    useEffect(() => {
        let tags: Tag[] = [];
        for (const tag in _.pickBy(tagSelect)){
            tags = [...tags, (tag as Tag)]
        }
        props.setAppBarAction(() => {
            if(description === '') {
                setErrorMsg('You have to write a description.')
                return
            }
            if(tags.length === 0) {
                setErrorMsg('You have to select at least one tag.')
                return
            }
            createNewTask(description, tags, tableData, useShoppingList)
        })
    }, [props.route, description, tags, tableData, useShoppingList])

    const addShoppingItem = () => {
        if(shoppingInput !== '') {
            let qty = 1;
            if(shoppingQtyInput !== '' && shoppingQtyInput.match(/^[0-9]*$/)) {
                qty = parseInt(shoppingQtyInput)
            }
            for (let i in tableData) {
                if((tableData[i].includes(shoppingInput))) {
                    tableData[i][1] += qty;
                    setTableData([...tableData])
                    setShoppingInput('')
                    setShoppingQtyInput('')
                    return
                }
            }
            setTableData([...tableData, [shoppingInput, qty.toString()]])
            setShoppingInput('')
            setShoppingQtyInput('')
        }
        shoppingListItemInputRef.current?.focus();
    }

    const removeShoppingItem = (i: number) => {
        setTableData(tableData.filter((item: any, index: number) => index !== i))
    }

    if (props.taskLoading) {
        return <Center>
            <Spinner isLoading={true}/>
        </Center>
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <SafeAreaView style={{flex: 1}} >
                <View style={styles.input}>
                    <TextInput 
                        autoFocus={true}
                        multiline={true} 
                        value={description} 
                        onChangeText={text => setDescription(text)}
                        placeholder='What do you need help with?'/>
                </View>
                <Divider/>
                <View style={styles.row}>
                    {tags.map((tag: string) =>
                        <Chip 
                            style={{marginRight: 5}}
                            mode='outlined' 
                            selected={tagSelect[tag]} 
                            onPress={() => setTagSelect({...tagSelect, ...{[tag]: !tagSelect[tag]}})} 
                            selectedColor={paperTheme.colors.primary}
                            key={tag}>
                            {tag}
                        </Chip>
                    )}
                </View>
                <Divider/>
                <View style={styles.row}>
                    <Caption>Add shopping list</Caption>
                    <Switch 
                        style={{paddingLeft: 5}}
                        value={useShoppingList} 
                        onValueChange={toggleShoppingList}/>
                </View>
                <View>
                    {useShoppingList ? <Table 
                        tableTitles={[{data: 'Item', alignment: 'left'}, {data: 'Amount', alignment: 'left'}, {data: '', alignment: 'right'}]} 
                        tableData={tableData} 
                        rowEnd={<MaterialIcons name='close'/>}
                        rowEndAction={removeShoppingItem}
                        trailing={<>
                                <TextInput 
                                    autoFocus={true}
                                    ref={shoppingListItemInputRef}
                                    style={styles.shoppingInput} 
                                    placeholder={'Item'} 
                                    onChangeText={(text) => setShoppingInput(text)}>
                                    {shoppingInput}
                                </TextInput>
                                <TextInput 
                                    style={styles.shoppingInput} 
                                    placeholder={'1'} 
                                    onChangeText={(text) => setShoppingQtyInput(text)}>
                                    {shoppingQtyInput}
                                </TextInput>
                                <DataTable.Cell style={styles.addShopping} onPress={addShoppingItem}>
                                    <MaterialIcons name='add'/>
                                </DataTable.Cell>
                            </>}
                        /> : <></> }  
                </View>
                <Divider/>
                { errorMsg ? 
                    <View style={styles.row}>
                        <Text style={{color: paperTheme.colors.error}}>{errorMsg}</Text>
                    </View> 
                : <></> }
            </SafeAreaView>
        </ScrollView>
    );
}

export default connect(
    (state: AppState, router: RoutePropsHelper<'CreateTask'> ): CreateTaskProps => ({
        route: router,
        viewedTask: state.giveHelpState.viewedTask,
        user: state.userState.user,
        taskLoading: state.receiveHelpState.taskLoading
    }),
    (dispatch: Dispatch): CreateTaskActions => ({
        createNewTask: (task, onDone) => dispatch(createNewTask(task, onDone)),
        setAppBarAction: (action: Function) => dispatch(setAppBarAction(action))
    })
)(CreateTask);