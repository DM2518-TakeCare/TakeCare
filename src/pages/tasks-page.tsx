import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Subheading, Text } from 'react-native-paper';
import { ContentPadding } from '../components/content-padding';
import { ScrollView } from 'react-native-gesture-handler';
import { TaskDetails } from '../components/task-details';
import { Center } from '../components/center';
import StatusHeader from '../components/status-header';
import { User } from '../model/shared/user-interface';
import { Task } from '../model/shared/task-interface';

const styles = StyleSheet.create({
    tasksContainer: {
        paddingBottom: 15
    },
});

interface TaskInfo {
    user: User
    task: Task
}

export default function TasksPage({navigation, route}:RoutePropsHelper<'Tasks'>) {

    /*Placeholder tasks*/
    const acceptedTasks: TaskInfo[] = [
        {
            user: { id: '', name: 'Stefan Karlsson', phone: '0731234567', address: 'Testgatan 3', extraInfo: 'Portkod' },
            task: { id: '', ownerId: '', desc: 'I need help getting my mail and some groceries', tags: ['Mail', 'Groceries'], coordinates: {latitude: 59.347647, longitude: 18.072340} }
        },
        {
            user: { id: '', name: 'Mia Berglund', phone: '0731234567', address: 'Testgatan 3', extraInfo: 'Portkod' },
            task: { id: '', ownerId: '', desc: 'I need milk!', tags: ['Groceries'],  coordinates: {latitude: 59.347647, longitude: 18.072340} }
        }
    ]

    const completedTasks: TaskInfo[] = [
        {
            user: { id: '', name: 'Maja Andersson', phone: '0731234567', address: 'Testgatan 3', extraInfo: 'Portkod' },
            task: { id: '', ownerId: '', desc: 'I need some alvedon.', tags: ['Medicine'], coordinates: {latitude: 59.347647, longitude: 18.072340}}
        }
    ]

    return (<>
        <ScrollView>
            <ContentPadding>
                <Center>
                    <ContentPadding>
                        <StatusHeader type='give-help'/>
                    </ContentPadding>
                </Center>
                <Subheading>Accepted Tasks</Subheading>
                    {acceptedTasks.length > 0 ? acceptedTasks.map((task, i) =>                             
                        <View key={`accepted_${i}`} style={styles.tasksContainer}>
                            <TaskDetails 
                                canComplete
                                onComplete={() => {}}
                                user={task.user}
                                task={task.task}
                            />     
                        </View>
                    ): <Text>You have not accepted any tasks.</Text>}

                <Subheading>Completed Tasks</Subheading>
                    {completedTasks.length > 0 ? completedTasks.map((task, i) => 
                        <View key={`completed_${i}`} style={styles.tasksContainer}>
                            <TaskDetails 
                                hideUserInfo
                                user={task.user}
                                task={task.task}
                            />
                        </View>
                    ): <Text>You have not completed any tasks yet.</Text>}
            </ContentPadding>
        </ScrollView>
    </>);
}