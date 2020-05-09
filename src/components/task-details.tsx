import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Chip, Divider, Caption } from 'react-native-paper';
import { DropDownCard } from './drop-down-card';
import { paperTheme } from '../theme/paper-theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './button';
import { User } from '../model/shared/user-interface';
import { Task } from '../model/shared/task-interface';
import { Spinner } from './loading-spinner';

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
    user: User,
    task: Task,
    onComplete?: (() => void),
    hideUserAndActionInfo?: boolean,
    detailsHeader?: boolean,
    completeLoading: boolean,
    initOpen?: boolean
}

export const TaskDetails: FC<TaskDetailsProps> = ({
    user, 
    task, 
    completeLoading,
    onComplete = () => {}, 
    hideUserAndActionInfo = false,
    detailsHeader = false,
    initOpen}) => {

    const tagContent = (
        <View style={styles.row}>
            {task.tags.map((tag: string) =>
                <Chip key={tag} style={styles.chip} mode='outlined'>{tag}</Chip>
            )}
        </View>
    );

    const renderInfoLine = (title: string, description: string | null) => {
        return <View style={styles.section}>
            <Caption>{title}</Caption>
            <Paragraph>{description ?? 'Unknown'}</Paragraph>
        </View>
    }
    
    const dropDownContent = () => {
        return <View style={{flex: 1}}>
            {renderInfoLine('Description', task.desc)}
            
            {
                task.shoppingList && task.shoppingList.length !== 0
                ?
                    renderInfoLine(
                        'Shopping List',
                        task.shoppingList?.map(item => {
                        return `${item.productName} - ${item.amount}`
                        }).join('\n'),
                    )
                :
                    <></>
            }
  
            <View style={styles.section}>
                <Caption>Tags</Caption>
                {tagContent}
            </View>

            {
                hideUserAndActionInfo
                ?
                    null
                :
                    <View>
                        {renderInfoLine('Address', task.owner.address)}
                        {renderInfoLine('Phone number', task.owner.phone)}
                        {
                            task.owner.extraInfo
                            ?
                                renderInfoLine('Extra information', task.owner.extraInfo ?? '')
                            :
                                <></>
                        }

                        {
                            task.completed
                            ?
                                <></>
                            :
                                completeLoading
                                ?
                                    <Spinner isLoading={true}/>
                                :
                                    <View style={{marginTop: 10}}>
                                        <Button expandHorizontal onPress={onComplete}>
                                            Task completed
                                        </Button>
                                    </View>
                        }
                    </View>
            }
        </View>
    }

    const renderTitle = () => {
        if (detailsHeader || user.name === null) {
            return 'Task details';
        }
        return user.name
    }

    return (
        <DropDownCard
            initOpen={initOpen}
            leading={
                <Ionicons 
                name={detailsHeader ? 'md-document' : 'md-person'} 
                size={25} 
                color={paperTheme.colors.accent}/>} 
            title={renderTitle()}
            subtitle={task.desc.length > 25 ? (task.desc.substring(0, 25) + '...') : task.desc} 
            dropDownContent={dropDownContent()}/>
    );
}
