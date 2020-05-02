export interface Task {
    id: string
    ownerID: string
    helperID?: string
    tags: Array<string>
    desc: string
    shoppingList: Array<Array<string>> 
    extraInfo: string 
}