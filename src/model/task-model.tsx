import { tags, ShoppingItem, Task } from './shared/task-interface';
import { LatLng } from 'react-native-maps';
import firestore, { geoFirestore } from './firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from './shared/user-interface';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';

export const taskCollections = {
    tasks: 'Tasks',
}

/** Add new task */
export async function addNewTask(
    ownerID: string, 
    tags: tags[], 
    description: string, 
    coordinates: LatLng, 
    shoppingList?: ShoppingItem[]
) {
    const geoCollection: GeoCollectionReference = geoFirestore.collection(taskCollections.tasks);
    return await geoCollection.add({
        ownerID: ownerID,
        helperID: null,
        tags: tags,
        description: description,
        coordinates: new firebase.firestore.GeoPoint(
            coordinates.latitude,
            coordinates.longitude),
        shoppingList: shoppingList,
        completed: false,
    });
}


/** Get all tasks that is owned by a user */
export async function getOwnedTasks(ownerID: string): Promise<Task[]> {
    const taskQuery = await firestore.collection(taskCollections.tasks).where('d.ownerID', '==', ownerID).get();
    const tasks = await completeTaskQuery(
        taskQuery.docs.map(doc => ({
            docID: doc.id, 
            docData: doc.data()['d']
        }))
    );
    return tasks;
}


/** Get all task that were the user is a helper */
export async function getHelperTasks(helperID: string): Promise<Task[]> {
    const taskQuery = await firestore.collection(taskCollections.tasks).where('helperID', '==', helperID).get();
    const tasks = await completeTaskQuery(
        taskQuery.docs.map(doc => ({
            docID: doc.id, 
            docData: doc.data()['d']
        }))
    );
    return tasks;
}

/**
 * Get all nearby tasks that do not have an helper
 * @param coordinates The center of which the search should take place
 * @param radius The radius in kilometers
 */
export async function getNearbyTasks(coordinates: LatLng, radius: number) {
    const geoFirestore: GeoFirestore = new GeoFirestore(firestore);
    const geoCollection = geoFirestore.collection(taskCollections.tasks);
    const query: GeoQuery = geoCollection.near({ 
        center: new firebase.firestore.GeoPoint(coordinates.latitude, coordinates.longitude), 
        radius: radius 
    }).where('helperID', '==', null);

    const queryResult = await query.get();
    const tasks = await completeTaskQuery(
        queryResult.docs.map(doc => ({
            docID: doc.id, 
            docData: doc.data()
        }))
    );
    return tasks;
}


/** Update task data */
export async function updateTaskData(
    taskID: string,
    tags: tags[], 
    description: string, 
    coordinates: LatLng, 
    shoppingList?: ShoppingItem[],
) {
    await geoFirestore.collection(taskCollections.tasks).doc(taskID).update({
        tags: tags,
        description: description,
        coordinates: new firebase.firestore.GeoPoint(
            coordinates.latitude,
            coordinates.longitude),
        shoppingList: shoppingList
    });
}


/** Add an helper to a task */
export async function addHelper(taskID: string, helperID: string) {
    await geoFirestore.collection(taskCollections.tasks).doc(taskID).update({
        helperID: helperID
    });
}


/** Remove an helper from a task */
export async function removeHelper(taskID: string) {
    await geoFirestore.collection(taskCollections.tasks).doc(taskID).update({
        helperID: null
    });
}


/** Complete a task */
export async function completeTask(taskID: string) {
    await geoFirestore.collection(taskCollections.tasks).doc(taskID).update({
        completed: true
    });
}

/** A helper function that completes a task query by getting users data */
async function completeTaskQuery(data: {docID: string, docData: any}[]): Promise<Task[]> {
    const tasks: Task[] = [];
    for (let docIndex = 0; docIndex < data.length; docIndex ++) {
        const taskDoc = data[docIndex];
        const taskData = taskDoc.docData;
        const coordinates = taskData['coordinates'];

        // Getting the shopping list
        let shoppingList: ShoppingItem[] = [];
        taskData['shoppingList'].forEach((shoppingItemData: any) => {
            shoppingList.push({
                productName: shoppingItemData['productName'],
                amount: shoppingItemData['amount'],
            })
        });

        // TODO: Getting the owner of the task
        const ownerID = taskData['ownerID'];
        const owner: User = {
            id: ownerID,
            name: 'TODO',
            address: 'TODO',
            phone: 'TODO'
        }

        // TODO: Getting the helper of the task
        let helper;

        tasks.push({
            id: taskDoc.docID,
            completed: taskData['completed'],
            coordinates: {latitude: coordinates.latitude, longitude: coordinates.longitude},
            desc: taskData['description'],
            tags: taskData['tags'],
            shoppingList: shoppingList,
            owner: owner,
            helper: helper,
        });
    }

    return tasks;
}