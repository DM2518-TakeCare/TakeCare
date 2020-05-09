import { AppActions } from './store';
import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'
import * as TaskModel from '../task-model'
import { User } from '../shared/user-interface';
import { batch } from 'react-redux';

export interface GiveHelpState {
    activeTasks: Task[],
    completedTasks: Task[],
    viewedTask: Task | undefined,
    loading: boolean,
    unsubscribeOwnedTasks: (() => void) | null
}

export enum GiveHelpActionTypes {
    SET_LOADING = 'SET_LOADING',
    ACCEPT_TASK = 'ACCEPT_TASK',
    COMPLETE_TASK = 'COMPLETE_TASK',
    UPDATE_VIEWED_TASK = 'UPDATE_VIEWED_TASK',
    SET_ACTIVE_TASKS = 'SET_ACTIVE_TASKS',
    SET_COMPLETED_TASKS = 'SET_COMPLETED_TASKS',
    SET_UNSUBSCRIBE_FUNCTION = 'SET_UNSUBSCRIBE_FUNCTION'
}

export interface SetLoading {
    type: GiveHelpActionTypes.SET_LOADING,
    payload: boolean
}

export interface AcceptTask {
    type: GiveHelpActionTypes.ACCEPT_TASK,
}
export function acceptTask(task: Task, helper: User) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({type: GiveHelpActionTypes.SET_LOADING, payload: true});
        await TaskModel.addHelper(task.id!, helper.id!);
        dispatch({type: GiveHelpActionTypes.SET_LOADING, payload: false});
    }
}

export interface CompleteTask {
    type: GiveHelpActionTypes.COMPLETE_TASK,
}
export function completeTask(task: Task) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({type: GiveHelpActionTypes.SET_LOADING, payload: true});
        await TaskModel.completeTask(task.id!);
        dispatch({type: GiveHelpActionTypes.SET_LOADING, payload: false});
    }
}

export interface UpdateViewedTask {
    type: GiveHelpActionTypes.UPDATE_VIEWED_TASK,
    payload: Task
}
export function updateViewedTask(task: Task) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: GiveHelpActionTypes.UPDATE_VIEWED_TASK,
            payload: task
        });
    }
}

export interface SetActiveTasks {
    type: GiveHelpActionTypes.SET_ACTIVE_TASKS,
    payload: Task[]
}
export function setActiveTasks(tasks: Task[]) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: GiveHelpActionTypes.SET_ACTIVE_TASKS,
            payload: tasks
        });
    }
}

export interface SetCompletedTasks {
    type: GiveHelpActionTypes.SET_COMPLETED_TASKS,
    payload: Task[]
}
export function setCompletedTasks(tasks: Task[]) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: GiveHelpActionTypes.SET_ACTIVE_TASKS,
            payload: tasks
        });
    }
}

export interface SetUnsubscribeFunction {
    type: GiveHelpActionTypes.SET_UNSUBSCRIBE_FUNCTION,
    payload: () => void,
}
export function setUnsubscribeFunction(unsubscribeFunction: () => void) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: GiveHelpActionTypes.SET_UNSUBSCRIBE_FUNCTION,
            payload: unsubscribeFunction
        });
    }
}

/** */
export function listenToHelperTasks(helperID: string) {
    return async (dispatch: Dispatch<AppActions>) => {
        const unsubscribeFunction = TaskModel.subscribeToOwnedTasks(helperID, tasks => {
            const activeTasks = tasks.filter(task => {return !task.completed});
            const completedTasks = tasks.filter(task => {return task.completed});
            batch(() => {
                dispatch({
                    type: GiveHelpActionTypes.SET_ACTIVE_TASKS,
                    payload: activeTasks
                });
                dispatch({
                    type: GiveHelpActionTypes.SET_COMPLETED_TASKS,
                    payload: completedTasks
                });
            });
        });
        dispatch({
            type: GiveHelpActionTypes.SET_UNSUBSCRIBE_FUNCTION,
            payload: unsubscribeFunction
        });
    }
}

export type GiveHelpActions = SetLoading | AcceptTask | CompleteTask | UpdateViewedTask | SetActiveTasks | SetCompletedTasks | SetUnsubscribeFunction;

export const giveHelpReducer = (
    state: GiveHelpState = { activeTasks: [], completedTasks: [], viewedTask: undefined, loading: false, unsubscribeOwnedTasks: null},
    action: GiveHelpActions
): GiveHelpState => {
    switch (action.type) {
        case GiveHelpActionTypes.SET_LOADING:
            return {...state, loading: action.payload};
        case GiveHelpActionTypes.UPDATE_VIEWED_TASK:
            return {...state, viewedTask: action.payload};
        case GiveHelpActionTypes.SET_ACTIVE_TASKS:
            return {...state, activeTasks: action.payload};
        case GiveHelpActionTypes.SET_COMPLETED_TASKS:
            return {...state, completedTasks: action.payload};
        case GiveHelpActionTypes.SET_UNSUBSCRIBE_FUNCTION:
            return {...state, unsubscribeOwnedTasks: action.payload};
        default:
            return state;
    }
}

