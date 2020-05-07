import { LatLng } from 'react-native-maps';
import { User } from './user-interface';

export type Tag = 'Groceries' | 'Mail' | 'Medicine'

export interface ShoppingItem {
    productName: string,
    amount: string,
    id?: string
}

export interface Task {
    // Is optional because when creating a new task 
    // is should not have an ID
    id?: string
    completed: boolean,
    owner: User
    helper?: User
    coordinates: LatLng,
    tags: Tag[]
    desc: string
    shoppingList?: ShoppingItem[],
    dateAdded?: Date
}