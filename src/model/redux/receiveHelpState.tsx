import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'
import { AddNewTaskParam, UpdateTaskParam } from '../task-model';
import { batch } from 'react-redux'
import * as TaskModel from '../task-model'
import { AppState } from './store';

export interface ReceiveHelpState {
    activeTaskView: Task | null,
    taskLoading: boolean,
    completeTaskLoading: boolean,
    unsubscribeFunction: (() => void) | null
}

export enum ReceiveHelpActionTypes {
    CREATE_TASK = 'CREATE_TASK',
    CREATE_TASK_DONE = 'CREATE_TASK_DONE',

    COMPLETE_TASK = 'COMPLETE_TASK',
    COMPLETE_TASK_DONE = 'COMPLETE_TASK_DONE',

    SET_ACTIVE_VIEW_TASK = 'SET_ACTIVE_VIEW_TASK',
    SET_SUBSCRIBE_ACTIVE_VIEW_TASK = 'SET_SUBSCRIBE_ACTIVE_VIEW_TASK',
    UNSUBSCRIBE_ACTIVE_VIEW_TASK = 'UNSUBSCRIBE_ACTIVE_VIEW_TASK',
}

export interface AddTaskStartAction {
    type: ReceiveHelpActionTypes.CREATE_TASK,
}
export interface AddTaskDoneAction {
    type: ReceiveHelpActionTypes.CREATE_TASK_DONE,
}
export function createNewTask(taskData: AddNewTaskParam, onDone: () => void) {
    return async (dispatch: Dispatch<ReceiveHelpActions>) => {
        dispatch({type: ReceiveHelpActionTypes.CREATE_TASK});
        const newTask = await TaskModel.addNewTask(taskData);
        batch(() => {
            dispatch({type: ReceiveHelpActionTypes.SET_ACTIVE_VIEW_TASK, payload: newTask})
            dispatch({type: ReceiveHelpActionTypes.CREATE_TASK_DONE});
        })
        onDone();
    }
}


export function updateTask(taskData: UpdateTaskParam) {
    return async (dispatch: Dispatch<ReceiveHelpActions>) => {
        dispatch({type: ReceiveHelpActionTypes.CREATE_TASK});
        await TaskModel.updateTaskData(taskData);
        dispatch({type: ReceiveHelpActionTypes.CREATE_TASK_DONE});
    }
}


export interface UnsubscribeActiveViewTaskAction {
    type: ReceiveHelpActionTypes.UNSUBSCRIBE_ACTIVE_VIEW_TASK,
}
export function unsubscribeActiveViewTask() {
    return (dispatch: Dispatch<ReceiveHelpActions>, getState: () => AppState) => {
        const state = getState();
        if (state.receiveHelpState.unsubscribeFunction) {
            state.receiveHelpState.unsubscribeFunction();
        }
        dispatch({
            type: ReceiveHelpActionTypes.UNSUBSCRIBE_ACTIVE_VIEW_TASK
        });
    }
}


export interface SubscribeActiveViewTaskAction {
    type: ReceiveHelpActionTypes.SET_SUBSCRIBE_ACTIVE_VIEW_TASK,
    payload: () => void
}
export function subscribeActiveViewTask(taskID: string) {
    return (dispatch: Dispatch<ReceiveHelpActions>) => {
        const unsubscribeFunction = TaskModel.subscribeToTask(taskID, task => {
            dispatch({
                type: ReceiveHelpActionTypes.SET_ACTIVE_VIEW_TASK,
                payload: task
            });
        })
        dispatch({
            type: ReceiveHelpActionTypes.SET_SUBSCRIBE_ACTIVE_VIEW_TASK,
            payload: unsubscribeFunction
        });
    }
}

export interface SetActiveViewTaskAction {
    type: ReceiveHelpActionTypes.SET_ACTIVE_VIEW_TASK,
    payload: Task | null
}
export function setActiveViewTask(task: Task) {
    return (dispatch: Dispatch<ReceiveHelpActions>) => {
        dispatch({
            type: ReceiveHelpActionTypes.SET_ACTIVE_VIEW_TASK,
            payload: task
        });
    }
}

export interface CompleteTaskAction {
    type: ReceiveHelpActionTypes.COMPLETE_TASK,
}
export interface CompleteTaskDoneAction {
    type: ReceiveHelpActionTypes.COMPLETE_TASK_DONE,
}
export function completeTaskAction(taskID: string) {
    return async (dispatch: Dispatch<ReceiveHelpActions>) => {
        dispatch({
            type: ReceiveHelpActionTypes.COMPLETE_TASK,
        });
        await TaskModel.completeTask(taskID);
        dispatch({
            type: ReceiveHelpActionTypes.COMPLETE_TASK_DONE
        });
    }
}


export type ReceiveHelpActions = 
    AddTaskStartAction | 
    AddTaskDoneAction | 
    SetActiveViewTaskAction | 
    CompleteTaskAction | 
    CompleteTaskDoneAction | 
    SubscribeActiveViewTaskAction |
    UnsubscribeActiveViewTaskAction;

export const receiveHelpReducer = (
    state: ReceiveHelpState = { activeTaskView: null, taskLoading: false, completeTaskLoading: false, unsubscribeFunction: null}, /*The inital state*/
    action: ReceiveHelpActions
): ReceiveHelpState => {
    switch (action.type) {
        case ReceiveHelpActionTypes.CREATE_TASK:
            return {
                ...state,
                taskLoading: true
            }
        case ReceiveHelpActionTypes.CREATE_TASK_DONE:
            return {
                ...state,
                taskLoading: false
            }        
        case ReceiveHelpActionTypes.SET_ACTIVE_VIEW_TASK:
            return {
                ...state,
                activeTaskView: action.payload
            }
        case ReceiveHelpActionTypes.COMPLETE_TASK:
            return {
                ...state,
                completeTaskLoading: true
            }        
        case ReceiveHelpActionTypes.SET_SUBSCRIBE_ACTIVE_VIEW_TASK:
            return {
                ...state,
                unsubscribeFunction: action.payload
            }        
        case ReceiveHelpActionTypes.UNSUBSCRIBE_ACTIVE_VIEW_TASK:
            return {
                ...state,
                unsubscribeFunction: null
            }    
        case ReceiveHelpActionTypes.COMPLETE_TASK_DONE:
            const updateTask: Task | null = state.activeTaskView ? {
                ...state.activeTaskView,
                completed: true
            } : null
            return {
                ...state,
                activeTaskView: updateTask,
                completeTaskLoading: false
            }        
        default:
            return state;
    }
}

