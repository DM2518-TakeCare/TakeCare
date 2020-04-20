import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Chip, Divider, Subheading, Caption } from 'react-native-paper';
import { DropDownCard } from './drop-down-card';
import { paperTheme } from '../theme/paper-theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './button';
import { ContentPadding } from './content-padding';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    chip: {
        marginRight: 5,
    },
    section: {
        paddingBottom: 5,
    }
});

type TaskDetailsProps = {
    user: any, //TODO create user and task interface
    task: any,
    canComplete?: boolean,
    onComplete?: (() => void),
    hideUserInfo?: boolean,
    detailsHeader?: boolean
}

export const TaskDetails: FC<TaskDetailsProps> = ({
    user, 
    task, 
    canComplete = false, 
    onComplete = () => {}, 
    hideUserInfo = false,
    detailsHeader = false}) => {

    const taskContent = [
        { key: 'desc', title: 'Description', obj: task },
        { key: 'shoppingList', title: 'Shopping list', obj: task },
        { key: 'tags', title: 'Tags', obj: task }
    ]

    const userContent = [
        { key: 'address', title: 'Address', obj: user },
        { key: 'phone', title: 'Phone number', obj: user },
        { key: 'extraInfo', title: 'Extra information', obj: user },
    ]

    const detailsContent = hideUserInfo ? taskContent : taskContent.concat(userContent)

    const tagContent = (
        <View style={styles.row}>
            {task.tags.map((tag: string) =>
                <Chip key={tag} style={styles.chip} mode='outlined'>{tag}</Chip>
            )}
        </View>);
    
    const dropDownContent = (<>
            {detailsContent.map((cont: any) => 
                <View key={cont.key}>
                    {cont.obj[cont.key] ? 
                        <View style={styles.section}>
                            <Caption>{cont.title}</Caption>
                            {cont.key !== 'tags' ? <><Paragraph>{cont.obj[cont.key]}</Paragraph><Divider/></> : tagContent}
                    </View>: <></> }
                </View>
            )}
            { canComplete ? 
                <ContentPadding> 
                    <Button expandHorizontal onPress={onComplete}>Task completed</Button>
                </ContentPadding> : <></>
            }
        </>);

    return (
        <DropDownCard 
            leading={<Ionicons name={detailsHeader ? 'md-document' : 'md-person'} size={25} color={paperTheme.colors.accent}/>} 
            title={detailsHeader ? 'Task details' : user.name} 
            dropDownContent={dropDownContent}/>
    );
}
