import { LatLng } from 'react-native-maps';
import { User } from './user-interface';

type tags = 'Groceries' | 'Mail' | 'Medicine'

export interface Task {
    id: string
    owner: User
    helper?: User
    coordinates: LatLng,
    tags: tags[]
    desc: string
    shoppingList?: string[][]
}