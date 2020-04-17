import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Center } from '../components/center';
import { Divider, Switch, Paragraph, Chip, Text } from 'react-native-paper';
import { ThemeProvider } from '@react-navigation/native';
import { paperTheme } from '../theme/paper-theme';

const styles = StyleSheet.create({
    input: {
        flex: 9,
        padding: 10,
    },
    row: {
        padding: 10,
        flexDirection: 'row',
    },
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

    return (<>
        <View style={styles.input}>
            <TextInput 
                multiline={true} 
                value={input} 
                onChangeText={text => setInput(text)}
                placeholder='What do you need help with?'/>
        </View>
        <Divider/>
        <View style={styles.row}>
            <Paragraph>Add shopping list</Paragraph>
            <Switch 
                style={{paddingLeft: 5}}
                value={useShoppingList} 
                onValueChange={() => setUseShoppingList(!useShoppingList)}/>
        </View>
        { useShoppingList ? 
            <View style={{...styles.row, }}>
                <Text>placeholder for item list</Text>
            </View> : <></> 
        }
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
    </>);
}