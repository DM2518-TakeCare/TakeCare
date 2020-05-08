import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'
import { AddNewTaskParam, UpdateTaskParam } from '../task-model';
import { batch } from 'react-redux'
import * as TaskModel from '../task-model'

export interface ReceiveHelpState {
    activeTaskView: Task | null,
    taskLoading: boolean,
    completeTaskLoading: boolean,
}

export enum ReceiveHelpActionTypes {
    CREATE_TASK = 'CREATE_TASK',
    CREATE_TASK_DONE = 'CREATE_TASK_DONE',

    COMPLETE_TASK = 'COMPLETE_TASK',
    COMPLETE_TASK_DONE = 'COMPLETE_TASK_DONE',

    SET_ACTIVE_VIEW_TASK = 'SET_ACTIVE_VIEW_TASK',
}

export interface AddTaskStartAction {
    type: ReceiveHelpActionTypes.CREATE_TASK,
}
export interface AddTaskDoneAction {
    type: ReceiveHelpActionTypes.CREATE_TASK_DONE,
}
export function createNewTask(taskData: AddNewTaskParam) {
    return async (dispatch: Dispatch<ReceiveHelpActions>) => {
        dispatch({type: ReceiveHelpActionTypes.CREATE_TASK});
        const newTask = await TaskModel.addNewTask(taskData);
        batch(() => {
            dispatch({type: ReceiveHelpActionTypes.CREATE_TASK_DONE});
            dispatch({
                type: ReceiveHelpActionTypes.SET_ACTIVE_VIEW_TASK,
                payload: newTask
            });
        })
    }
}


export function updateTask(taskData: UpdateTaskParam) {
    return async (dispatch: Dispatch<ReceiveHelpActions>) => {
        dispatch({type: ReceiveHelpActionTypes.CREATE_TASK});
        const newTask = await TaskModel.updateTaskData(taskData);
        dispatch({type: ReceiveHelpActionTypes.CREATE_TASK_DONE});
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
export function CompleteTaskAction(taskID: string) {
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
    CompleteTaskDoneAction;

export const receiveHelpReducer = (
    state: ReceiveHelpState = { activeTaskView: null, taskLoading: false, completeTaskLoading: false, }, /*The inital state*/
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

