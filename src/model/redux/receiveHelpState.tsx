import { AppActions } from './store';
import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'

/*The interface for the state; how the state is supposed to look at all times.*/
export interface ReceiveHelpState {
    activeTasks: Task[],
    completedTasks: Task[]
}

/*Available actions to for example change the state*/
export const ReceiveHelpActionTypes = {
    ADD_ACTIVE_TASK: 'ADD_ACTIVE_TASK',
}

/*Create functions for the different action types, for example adding, updating or removing things*/
/*Different actions may require different payloads (parameters), the type, however, is always a string*/
export interface AddTaskAction {
    type: string,
    payload: Task
}
export function addActiveTask(task: any) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: ReceiveHelpActionTypes.ADD_ACTIVE_TASK,
            payload: task
        });
    }
}

/*Add all action interfaces to ReceiveHelpActions*/
export type ReceiveHelpActions = AddTaskAction;

/*In the reducer you decide what each action does with the state. The returned value is the new state.*/
export const receiveHelpReducer = (
    state: ReceiveHelpState = { activeTasks: [], completedTasks: [] }, /*The inital state*/
    action: ReceiveHelpActions
): ReceiveHelpState => {
    switch (action.type) {
        case ReceiveHelpActionTypes.ADD_ACTIVE_TASK:
            /*This example adds a new element to the activeTasks array in the state*/
            return {...state, activeTasks: [...state.activeTasks, action.payload]};
        default:
            return state;
    }
}

