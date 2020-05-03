import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Divider, Switch, Paragraph, Chip, DataTable, Caption } from 'react-native-paper';
import { paperTheme } from '../theme/paper-theme';
import Table from '../components/table';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    input: {
        flex: 9,
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

export default function CreateTask({navigation, route}:RoutePropsHelper<'CreateTask'>) {
    
    const tags = ['Groceries', 'Medicine', 'Mail']
    let initialTagState: Record<string, boolean> = {}
    for (const tag of tags) {
        initialTagState = ({...initialTagState, ...{[tag]: false}});
    }
    const [tagSelect, setTagSelect] = useState(initialTagState);
    const [useShoppingList, setUseShoppingList] = useState(false);
    const [input, setInput] = useState('');
    const [shoppingInput, setShoppingInput] = useState('');
    const [shoppingQtyInput, setShoppingQtyInput] = useState('');
    const [tableData, setTableData]: any = useState([]);
    const shoppingListItemInputRef = useRef<TextInput>(null)

    const toggleShoppingList = () => {
        setUseShoppingList(!useShoppingList);
    };

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
                    return
                }
            }
            setTableData([...tableData, [shoppingInput, qty]])
            setShoppingInput('')
            setShoppingQtyInput('')
        }
        shoppingListItemInputRef.current?.focus();
    }

    const removeShoppingItem = (i: number) => {
        setTableData(tableData.filter((item: any, index: number) => index !== i))
    }

    
    return (
        <ScrollView style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.input}>
                    <TextInput 
                        autoFocus={true}
                        multiline={true} 
                        value={input} 
                        onChangeText={text => setInput(text)}
                        placeholder='What do you need help with?'/>
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
                        tableTitles={[{data: 'Item', alignment: 'left'}, {data: 'Qty', alignment: 'left'}, {data: '', alignment: 'right'}]} 
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
            </SafeAreaView>
        </ScrollView>
    );
}