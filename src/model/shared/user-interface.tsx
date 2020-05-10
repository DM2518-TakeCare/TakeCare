export interface User {
    authID: string,
    id?: string 
    name: string | null
    address: string | null
    phone: string | null
    extraInfo?: string 
}