import { AppActions } from './store';
import { Dispatch } from 'react';

/*The interface for the state; how the state is supposed to look at all times.*/
export interface GiveHelpState {
    activeTasks: any[], //TODO define task interface, THIS SHOULD NOT BE any!
    completedTasks: any[]
}

/*Available actions to for example change the state*/
export const GiveHelpActionTypes = {
    ADD_ACTIVE_TASK: 'ADD_ACTIVE_TASK',
}

/*Create functions for the different action types, for example adding, updating or removing things*/
/*Different actions may require different payloads (parameters), the type, however, is always a string*/
export interface AddTaskAction {
    type: string,
    payload: any //TODO define task interface, THIS SHOULD NOT BE any!
}
export function addActiveTask(task: any) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: GiveHelpActionTypes.ADD_ACTIVE_TASK,
            payload: task
        });
    }
}

/*Add all action interfaces to GiveHelpActions*/
export type GiveHelpActions = AddTaskAction;

/*In the reducer you decide what each action does with the state. The returned value is the new state.*/
export const giveHelpReducer = (
    state: GiveHelpState = { activeTasks: [], completedTasks: [] }, /*The inital state*/
    action: GiveHelpActions
): GiveHelpState => {
    switch (action.type) {
        case GiveHelpActionTypes.ADD_ACTIVE_TASK:
            /*This example adds a new element to the activeTasks array in the state*/
            return {...state, activeTasks: [...state.activeTasks, action.payload]};
        default:
            return state;
    }
}

