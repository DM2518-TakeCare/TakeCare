import firestore from './firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from './shared/user-interface'; 

const userCollection = 'Users';

const parseUserDoc = (id: string, doc?: firebase.firestore.DocumentData): User | null => {
    if (!doc) {
        return null;
    }
    return {
        authID: doc.authID,
        id: id,
        name: doc.name,
        address: doc.address,
        phone: doc.phone,
        extraInfo: doc.extraInfo ?? null
    }
}

export async function getUser(id: string): Promise<User | null> {
    const userDoc = await firestore.collection(userCollection).doc(id).get()
    return parseUserDoc(id, userDoc.data());
}

export async function getUserByAuth(authID: string): Promise<User | null> {
    const userDoc = await firestore.collection(userCollection).where('authID', '==', authID).get();
    // We only expect one result
    const doc = userDoc.docs[0];

    if (doc) {
        return parseUserDoc(doc.id, doc.data());
    }
    return null;
}

export async function addUser(user: User): Promise<User> {
    const docRef = await firestore.collection(userCollection).add(user)
    return {...user, id: docRef.id}
}

export async function updateUser(user: User): Promise<User> { 
    await firestore.collection(userCollection).doc(user.id).update(user) 
    return user
}

export async function removeUser(user: User): Promise<void> {
    await firestore.collection(userCollection).doc(user.id).delete()
}