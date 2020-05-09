import { Dispatch } from 'react';

export interface AppBarState {
    action: Function,
}

export enum AppBarActionTypes {
    SET_ACTION = 'SET_ACTION'
}

export interface SetAppBarAction {
    type: AppBarActionTypes.SET_ACTION,
    payload: Function
}
export function setAppBarAction(action: Function) {
    return async (dispatch: Dispatch<SetAppBarAction>) => {
        dispatch({
            type: AppBarActionTypes.SET_ACTION,
            payload: action
        });
    }
}

export type AppBarActions = SetAppBarAction;

export const appBarReducer = (
    state: AppBarState = { action: () => {} },
    action: AppBarActions
): AppBarState => {
    switch (action.type) {
        case AppBarActionTypes.SET_ACTION:
            return {...state, action: action.payload}
        default:
            return state;
    }
}

