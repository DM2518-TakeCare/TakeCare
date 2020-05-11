import { AppActions, AppState } from './store';
import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'
import * as TaskModel from '../task-model'
import { User } from '../shared/user-interface';
import { batch } from 'react-redux';

export interface GiveHelpState {
    activeTasks: Task[],
    completedTasks: Task[],
    viewedTask: Task | undefined,
    taskLoading: Task | null,
    initialSubscribeLoading: boolean,
    unsubscribeOwnedTasks: (() => void) | null
}

export enum GiveHelpActionTypes {
    SET_TASK_LOADING = 'SET_TASK_LOADING',
    ACCEPT_TASK = 'ACCEPT_TASK',
    COMPLETE_TASK = 'COMPLETE_TASK',
    UPDATE_VIEWED_TASK = 'UPDATE_VIEWED_TASK',
    SET_ACTIVE_TASKS = 'SET_ACTIVE_TASKS',
    SET_COMPLETED_TASKS = 'SET_COMPLETED_TASKS',
    SET_HELPER_TASK_UNSUBSCRIBE_FUNCTION = 'SET_HELPER_TASK_UNSUBSCRIBE_FUNCTION',
    UNSUBSCRIBE_FROM_HELPER_TASKS = 'UNSUBSCRIBE_FROM_HELPER_TASKS',
    INITIAL_SUBSCRIBE_LOADING = 'INITIAL_SUBSCRIBE_LOADING',
}

interface SetLoading {
    type: GiveHelpActionTypes.SET_TASK_LOADING,
    payload: Task
}

interface AcceptTask {
    type: GiveHelpActionTypes.ACCEPT_TASK,
}
export function acceptTask(task: Task, helper: User, onSuccess: () => void, onFail: () => void) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({type: GiveHelpActionTypes.SET_TASK_LOADING, payload: task});
        await TaskModel.addHelper(task.id!, helper.id!, onSuccess, onFail);
        dispatch({type: GiveHelpActionTypes.SET_TASK_LOADING, payload: task});
    }
}

interface CompleteTask {
    type: GiveHelpActionTypes.COMPLETE_TASK,
}
export function completeTask(task: Task) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({type: GiveHelpActionTypes.SET_TASK_LOADING, payload: task});
        await TaskModel.completeTask(task.id!);
        dispatch({type: GiveHelpActionTypes.SET_TASK_LOADING, payload: task});
    }
}

interface UpdateViewedTask {
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

interface SetActiveTasks {
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

interface SetCompletedTasks {
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

interface SetUnsubscribeFunctionAction {
    type: GiveHelpActionTypes.SET_HELPER_TASK_UNSUBSCRIBE_FUNCTION,
    payload: () => void,
}
export function setHelperTasksUnsubscribeFunction(unsubscribeFunction: () => void) {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: GiveHelpActionTypes.SET_HELPER_TASK_UNSUBSCRIBE_FUNCTION,
            payload: unsubscribeFunction
        });
    }
}
interface UnsubscribeFromHelperTasksAction {
    type: GiveHelpActionTypes.UNSUBSCRIBE_FROM_HELPER_TASKS,
}
export function unsubscribeFromHelperTasks() {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const state = getState();
        if (state.giveHelpState.unsubscribeOwnedTasks) {
            state.giveHelpState.unsubscribeOwnedTasks();
        }
        dispatch({
            type: GiveHelpActionTypes.UNSUBSCRIBE_FROM_HELPER_TASKS,
        });
    }
}

/** */
export function listenToHelperTasks() {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const state = getState();
        const unsubscribeFunction = TaskModel.subscribeToHelperTasks(state.userState.user!.id!, tasks => {
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
            type: GiveHelpActionTypes.SET_HELPER_TASK_UNSUBSCRIBE_FUNCTION,
            payload: unsubscribeFunction
        });
    }
}

export type GiveHelpActions = 
    SetLoading | 
    AcceptTask | 
    CompleteTask | 
    UpdateViewedTask | 
    SetActiveTasks | 
    SetCompletedTasks | 
    SetUnsubscribeFunctionAction | 
    UnsubscribeFromHelperTasksAction;

export const giveHelpReducer = (
    state: GiveHelpState = { activeTasks: [], completedTasks: [], viewedTask: undefined, taskLoading: null, initialSubscribeLoading: false, unsubscribeOwnedTasks: null},
    action: GiveHelpActions
): GiveHelpState => {
    switch (action.type) {
        case GiveHelpActionTypes.SET_TASK_LOADING:
            return {...state, taskLoading: action.payload};
        case GiveHelpActionTypes.UPDATE_VIEWED_TASK:
            return {...state, viewedTask: action.payload};
        case GiveHelpActionTypes.SET_ACTIVE_TASKS:
            return {...state, activeTasks: action.payload, initialSubscribeLoading: false};
        case GiveHelpActionTypes.SET_COMPLETED_TASKS:
            return {...state, completedTasks: action.payload, initialSubscribeLoading: false};
        case GiveHelpActionTypes.SET_HELPER_TASK_UNSUBSCRIBE_FUNCTION:
            return {...state, unsubscribeOwnedTasks: action.payload, initialSubscribeLoading: true};
        case GiveHelpActionTypes.UNSUBSCRIBE_FROM_HELPER_TASKS:
            return {...state, unsubscribeOwnedTasks: null};
        default:
            return state;
    }
}

