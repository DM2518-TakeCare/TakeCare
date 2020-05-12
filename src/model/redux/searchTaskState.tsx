import { AppActions } from './store';
import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'
import { LatLng } from 'react-native-maps';
import * as TaskModel from '../task-model';
import { User } from '../shared/user-interface';

export interface SearchTaskQuery {
    coordinate: LatLng,
    radius: number,
    user: User
}

export interface SearchTaskState {
    searchResults: Task[],
    lastSearchQuery: SearchTaskQuery | null,
    loading: boolean
    unsubscribeFunction: (() => void) | null,
}

export enum SearchTaskActionTypes {
    SEARCH_NEARBY_TASKS = 'SEARCH_NEARBY_TASKS',
    UNSUBSCRIBE_SEARCH_NEARBY_TASKS = 'UNSUBSCRIBE_SEARCH_NEARBY_TASKS',
    SEARCH_NEARBY_TASKS_DONE = 'SEARCH_NEARBY_TASKS_DONE'
}

export interface SearchTaskNearbyAction {
    type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS,
    payload: {
        query: SearchTaskQuery,
        unsubscribe: () => void
    }
}
export function searchTaskAction(query: SearchTaskQuery) {
    return async (dispatch: Dispatch<SearchTaskActions>) => {
        const unsubscribe = await TaskModel.subscribeToNearbyTasks(
            query.coordinate,
            query.radius,
            (tasks) => {
                dispatch({
                    type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS_DONE,
                    payload: tasks
                });
            },
            query.user.id!
        );
        dispatch({
            type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS,
            payload: {
                query: query,
                unsubscribe: unsubscribe
            }
        });
    }
}

export interface UnsubscribeSearchTaskNearbyAction {
    type: SearchTaskActionTypes.UNSUBSCRIBE_SEARCH_NEARBY_TASKS,
}
export function unsubscribeSearchTaskAction() {
    return  (dispatch: Dispatch<SearchTaskActions>) => {
        dispatch({
            type: SearchTaskActionTypes.UNSUBSCRIBE_SEARCH_NEARBY_TASKS
        });
    }
}

export interface SearchTaskNearbyDoneAction {
    type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS_DONE,
    payload: Task[]
}

export type SearchTaskActions = SearchTaskNearbyAction | SearchTaskNearbyDoneAction | UnsubscribeSearchTaskNearbyAction;

export const searchTaskReducer = (
    state: SearchTaskState = { searchResults: [], lastSearchQuery: null, loading: false, unsubscribeFunction: null},
    action: SearchTaskActions
): SearchTaskState => {
    switch (action.type) {
        case SearchTaskActionTypes.SEARCH_NEARBY_TASKS:
            return {
                searchResults: [],
                loading: true,
                lastSearchQuery: action.payload.query,
                unsubscribeFunction: action.payload.unsubscribe
            };
        case SearchTaskActionTypes.SEARCH_NEARBY_TASKS_DONE:
            return {
                ...state,
                searchResults: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

