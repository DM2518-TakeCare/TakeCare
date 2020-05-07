import { AppActions } from './store';
import { Dispatch } from 'react';
import { Task } from '../shared/task-interface'
import { LatLng } from 'react-native-maps';
import * as TaskModel from '../task-model';

export interface SearchTaskQuery {
    coordinate: LatLng,
    radius: number
}

export interface SearchTaskState {
    searchResults: Task[],
    lastSearchQuery: SearchTaskQuery | null
    loading: boolean
}

export enum SearchTaskActionTypes {
    SEARCH_NEARBY_TASKS = 'SEARCH_NEARBY_TASKS',
    SEARCH_NEARBY_TASKS_DONE = 'SEARCH_NEARBY_TASKS_DONE'
}

export interface SearchTaskNearbyAction {
    type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS,
    payload: SearchTaskQuery
}
export function searchTaskAction(query: SearchTaskQuery) {
    return async (dispatch: Dispatch<SearchTaskActions>) => {
        dispatch({
            type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS,
            payload: query
        });
        const nearbyTasks = await TaskModel.getNearbyTasks(
            query.coordinate,
            query.radius
        );
        dispatch({
            type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS_DONE,
            payload: nearbyTasks
        });
    }
}

export interface SearchTaskNearbyDoneAction {
    type: SearchTaskActionTypes.SEARCH_NEARBY_TASKS_DONE,
    payload: Task[]
}

export type SearchTaskActions = SearchTaskNearbyAction | SearchTaskNearbyDoneAction;

export const searchTaskReducer = (
    state: SearchTaskState = { searchResults: [], lastSearchQuery: null, loading: false },
    action: SearchTaskActions
): SearchTaskState => {
    switch (action.type) {
        case SearchTaskActionTypes.SEARCH_NEARBY_TASKS:
            return {
                searchResults: [],
                loading: true,
                lastSearchQuery: action.payload
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

