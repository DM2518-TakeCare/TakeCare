import { Tag, ShoppingItem, Task } from './shared/task-interface';
import { LatLng } from 'react-native-maps';
import firestore, { geoFirestore } from './firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from './shared/user-interface';
import { GeoCollectionReference, GeoFirestore, GeoQuery } from 'geofirestore';
import * as userModel from './user-model';

export const taskCollections = {
    tasks: 'Tasks',
}

export interface AddNewTaskParam {
    owner: User, 
    tags: Tag[], 
    description: string, 
    coordinates: LatLng, 
    shoppingList?: ShoppingItem[]
}

/** Add new task */
export async function addNewTask(data: AddNewTaskParam): Promise<Task | null> {
    const geoCollection: GeoCollectionReference = geoFirestore.collection(taskCollections.tasks);
    const dateAdded = new Date();
    const doc = await geoCollection.add({
        ownerID: data.owner.id,
        helperID: null,
        tags: data.tags,
        description: data.description,
        coordinates: new firebase.firestore.GeoPoint(
            data.coordinates.latitude,
            data.coordinates.longitude),
        shoppingList: data.shoppingList ?? null,
        completed: false,
        dateAdded: dateAdded,
        dateCompleted: null
    });

    return await getTaskByID(doc.id);
}

/** Get all tasks that is owned by a user */ 
export async function getTaskByID(taskID: string): Promise<Task | null> {
    const taskQuery = await firestore.collection(taskCollections.tasks).doc(taskID).get();
    const taskData = taskQuery.data();
    if (taskData) {
        return await completeTaskQuery(taskQuery.id, taskData['d']);
    }
    return null;
}

export async function getOwnedTask(ownerID: string): Promise<Task | null> {
    try { 
        const taskQuery = await firestore.collection(taskCollections.tasks).where('d.ownerID', '==', ownerID).where('d.completed', '==', false).limit(1).get();
        const taskData = taskQuery.docs.map(doc => ({
            docID: doc.id, 
            docData: doc.data()['d']}))
        const task = await completeTaskQuery(taskData[0].docID, taskData[0].docData)
        return task;
    }
    catch {
        return null   
    }   
}

/** 
 * Subscribe to all the owned tasks 
 * @return A unsubscribe function
 */
export function subscribeToOwnedTasks(ownerID: string, onSnapshot: (tasks: Task[]) => void) {
    return firestore.collection(taskCollections.tasks).where('d.ownerID', '==', ownerID).onSnapshot(async (snapshot) => {
        // TODO, this code fetch the owner every time, improvement needed
        const tasks = await completeTaskQueries(
            snapshot.docs.map((doc: any) => ({
                docID: doc.id, 
                docData: doc.data()['d']
            }))
        );
        onSnapshot(tasks);
    });
}


/** 
 * Subscribe to all the tasks were the user is a helper
 * @return A unsubscribe function
 */
export function subscribeToHelperTasks(helperID: string, onSnapshot: (tasks: Task[]) => void) {
    return firestore.collection(taskCollections.tasks).where('d.helperID', '==', helperID).onSnapshot(async (snapshot) => {
        // TODO, this code fetch the owner every time, improvement needed
        const tasks = await completeTaskQueries(
            snapshot.docs.map((doc: any) => ({
                docID: doc.id, 
                docData: doc.data()['d']
            }))
        );
        onSnapshot(tasks);
    });
}


/** 
 * Subscribe to a specific task
 * @return A unsubscribe function
 */
export function subscribeToTask(taskID: string, onSnapshot: (tasks: Task) => void) {
    return firestore.collection(taskCollections.tasks).doc(taskID).onSnapshot(async (snapshot) => {
        const taskData = snapshot.data();
        if (taskData) {
            const task = await completeTaskQuery(snapshot.id, taskData['d']);
            onSnapshot(task);
        }
    });
}


/**
 * Get all nearby tasks that do not have an helper
 * @param coordinates The center of which the search should take place
 * @param radius The radius in kilometers
 */
export async function subscribeToNearbyTasks(coordinates: LatLng, radius: number, onSnapshot: (tasks: Task[]) => void, userId: string) {
    const geoFirestore: GeoFirestore = new GeoFirestore(firestore);
    const geoCollection = geoFirestore.collection(taskCollections.tasks);
    return geoCollection.near({ 
        center: new firebase.firestore.GeoPoint(coordinates.latitude, coordinates.longitude), 
        radius: radius 
    }).onSnapshot(async (queryResult) => {
        // Need to manually filter out task that already have an helper
        const filteredDocs = queryResult.docs.filter(doc => doc.data()['helperID'] === null && doc.data()['ownerID'] !== userId);

        // Parse the result
        const tasks = await completeTaskQueries(
            filteredDocs.map(doc => ({
                docID: doc.id, 
                docData: doc.data()
            }))
        );
        onSnapshot(tasks);
    });
}


export interface UpdateTaskParam {
    taskID: string,
    tags: Tag[], 
    description: string, 
    coordinates: LatLng, 
    shoppingList?: ShoppingItem[],
}

/** Update task data */
export async function updateTaskData(data: UpdateTaskParam) {
    await geoFirestore.collection(taskCollections.tasks).doc(data.taskID).update({
        tags: data.tags,
        description: data.description,
        coordinates: new firebase.firestore.GeoPoint(
            data.coordinates.latitude,
            data.coordinates.longitude),
        shoppingList: data.shoppingList
    });
}


/** Add an helper to a task */
export async function addHelper(taskID: string, helperID: string, onSuccess: () => void, onFail: () => void) {
    const taskDoc = firestore.collection(taskCollections.tasks).doc(taskID);
    await firestore.runTransaction((t) => {
        return t.get(taskDoc).then(taskDData => {
            const tmpTaskData = taskDData.data();
            if (tmpTaskData) {
                const taskData = tmpTaskData['d'];
                if (taskData['helperID'] !== null) {
                    onFail();
                    return Promise.resolve();
                }
                else {
                    t.update(taskDoc, {'d': {...taskData, helperID: helperID}});
                    onSuccess();
                    return Promise.resolve();
                }
            }
        })
    });
}

/** Delete a task */
export async function deleteTask(taskID: string) {
    await firestore.collection(taskCollections.tasks).doc(taskID).delete();
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
        completed: true,
        dateCompleted: new Date()
    });
}

async function completeTaskQueries(data: {docID: string, docData: any}[]): Promise<Task[]>{
    const tasks: Task[] = [];
    for (let i = 0; i < data.length; i++) {
        const taskParam = data[i];
        const task = await completeTaskQuery(taskParam.docID, taskParam.docData);
        tasks.push(task);
    }
    return tasks;
}

/** A helper function that completes a task query by getting users data */
async function completeTaskQuery(docID: string, docData: any): Promise<Task> {
    const taskData = docData;
    const coordinates = taskData['coordinates'];

    // Getting the shopping list
    let shoppingList: ShoppingItem[] = [];
    const shoppingListDocData = taskData['shoppingList'];
    if (shoppingListDocData) {
        shoppingListDocData.forEach((shoppingItemData: any) => {
            shoppingList.push({
                productName: shoppingItemData['productName'],
                amount: shoppingItemData['amount'],
            })
        });
    }

    // Getting the owner of the task
    const ownerID = taskData['ownerID'];
    const owner = await userModel.getUser(ownerID);

    // Getting the helper of the task
    const helperID = taskData['helperID'];
    let helper;
    if (helperID) {
        helper = await userModel.getUser(helperID); 
    }


    return {
        id: docID,
        completed: taskData['completed'],
        coordinates: {
            latitude: coordinates.latitude, 
            longitude: coordinates.longitude
        },
        desc: taskData['description'],
        tags: taskData['tags'],
        shoppingList: shoppingList,
        owner: owner!,
        helper: helper,
        dateAdded: taskData['dateAdded']
    };
}