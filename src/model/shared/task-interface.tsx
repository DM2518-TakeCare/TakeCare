import { LatLng } from 'react-native-maps';
import { User } from './user-interface';

export type tags = 'Groceries' | 'Mail' | 'Medicine'

export interface ShoppingItem {
    productName: string,
    amount: string,
    id?: string
}

export interface Task {
    id?: string // Is optional as when creating a new task do not have an id
    owner: User
    helper?: User
    coordinates: LatLng,
    tags: tags[]
    desc: string
    shoppingList?: ShoppingItem[]
}