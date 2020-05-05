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

export async function addNewTask(
    ownerID: string, 
    tags: tags[], 
    description: string, 
    coordinates: LatLng, 
    shoppingList?: ShoppingItem[]
) {
    const geoCollection: GeoCollectionReference = geoFirestore.collection(taskCollections.tasks);
    await geoCollection.add({
        ownerID: ownerID,
        tags: tags,
        description: description,
        coordinates: new firebase.firestore.GeoPoint(
            coordinates.latitude,
            coordinates.longitude),
        shoppingList: shoppingList
    });
}

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
 * 
 * @param coordinates The center of which the search should take place
 * @param radius The radius in kilometers
 */
export async function getNearbyTasks(coordinates: LatLng, radius: number) {
    const geoFirestore: GeoFirestore = new GeoFirestore(firestore);
    const geoCollection = geoFirestore.collection(taskCollections.tasks);
    const query: GeoQuery = geoCollection.near({ 
        center: new firebase.firestore.GeoPoint(coordinates.latitude, coordinates.longitude), 
        radius: radius 
    });

    const queryResult = await query.get();
    const tasks = await completeTaskQuery(
        queryResult.docs.map(doc => ({
            docID: doc.id, 
            docData: doc.data()
        }))
    );
    return tasks;
}

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
            coordinates: {latitude: coordinates.latitude, longitude: coordinates.longitude},
            desc: taskData['description'],
            tags: taskData['tags'],
            shoppingList: shoppingList,
            owner: owner,
            helper: helper
        });
    }

    return tasks;
}