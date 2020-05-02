import { LatLng } from 'react-native-maps';

export interface User {
    id: string
    name: string
    coordinates: LatLng
    address: string
    phone: string
}