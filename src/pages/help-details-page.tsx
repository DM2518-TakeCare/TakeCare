import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RoutePropsHelper } from '../router';
import { Text, Headline, Subheading } from 'react-native-paper';
import UserInfo from '../components/user-info/user-info';
import { ContentPadding } from '../components/content-padding';
import { Button } from '../components/button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
    },
    tagCont: {
        flexDirection: 'row', 
        paddingBottom: 10
    },
    tagStyle: {
        fontWeight: 'bold'
    },
    userCont: {
        flexDirection: 'column', 
        paddingBottom: 10
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

    return (
        <ContentPadding>
            <View style={styles.container}>
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
                <Text style={styles.descStyle}>{taskDetails.task.desc}</Text>
                <View>
                    <Text>Placeholder for table</Text>
                </View>
                <Button size='big' onPress={() => {}}>Accept Task</Button>
            </View>
        </ContentPadding>
    );

}