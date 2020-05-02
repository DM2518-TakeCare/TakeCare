import { LatLng } from 'react-native-maps';

export interface Task {
    id: string
    ownerId: string
    helperId?: string
    coordinates: LatLng,
    tags: string[]
    desc: string
    shoppingList?: string[][]
}