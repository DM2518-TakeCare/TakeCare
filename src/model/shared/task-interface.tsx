export interface Task {
    id: string
    ownerId: string
    helperId?: string
    tags: string[]
    desc: string
    shoppingList?: string[][]
}