import { LatLng } from 'react-native-maps';
import { User } from './user-interface';

export type Tag = 'Groceries' | 'Mail' | 'Medicine'

export interface Task {
    id: string
    owner: User
    helper?: User
    coordinates: LatLng,
    tags: Tag[]
    desc: string
    shoppingList?: string[][]
}