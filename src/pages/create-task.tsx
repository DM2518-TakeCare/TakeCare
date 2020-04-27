import React, { useState } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, Animated, LayoutChangeEvent } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Divider, Switch, Paragraph, Chip, Text } from 'react-native-paper';
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

    const toggleShoppingList = () => {
        startAnimations(!useShoppingList);
        setUseShoppingList(!useShoppingList);
    };

    const [shoppingListHeightAnimation] = useState(new Animated.Value(0));
    const [contentOpacityAnimation] = useState(new Animated.Value(0));
    const [shoppingListHeight, setShoppingListHeight] = useState<number | null>(null);

    const startAnimations = (open: boolean) => {
        Animated.timing(
            contentOpacityAnimation,
            {
                toValue: open ? 1 : 0,
                duration: 200,
                isInteraction: true,
            }
        ).start()

        Animated.timing(
            shoppingListHeightAnimation,
            {
                toValue: open ? (shoppingListHeight ?? 0) : 0,
                duration: 400,
                isInteraction: true,
            }
        ).start()
    };

    return (
        <SafeAreaView style={{flex: 1}}>
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
                    onValueChange={toggleShoppingList}/>
            </View>
            <Animated.View 
                style={{
                    overflow: 'hidden',
                    height: shoppingListHeight === null ? null : shoppingListHeightAnimation,
                    opacity: contentOpacityAnimation,
                }} 
                onLayout={(event: LayoutChangeEvent) => {
                    if(shoppingListHeight === null) {
                        setShoppingListHeight(event.nativeEvent.layout.height);
                    }
                }}>
                <View style={styles.row}>
                    <Text>placeholder for item list</Text>
                </View>
            </Animated.View>
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
    );
}