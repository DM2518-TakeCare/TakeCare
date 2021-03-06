import { AppActions, AppState } from './store';
import { Dispatch } from 'react';
import { User } from '../shared/user-interface';
import * as UserModel from '../user-model';
import { batch } from 'react-redux'

/*The interface for the state; how the state is supposed to look at all times.*/
export interface UserState {
    user: User | null
    loading: boolean
}

/*Available actions to for example change the state*/
export enum UserActionTypes {
    ADD_USER_DATA = 'ADD_USER_DATA',
    REMOVE_USER_DATA = 'REMOVE_USER_DATA',
    UPDATE_USER_DATA = 'UPDATE_USER_DATA',
    UPDATE_USER_LOADING = 'UPDATE_USER_LOADING',
}

const initUserState: UserState = {
    user: null, 
    loading: false
}

export interface UserDataAction {
    type: UserActionTypes.ADD_USER_DATA | UserActionTypes.UPDATE_USER_DATA,
    payload: User
}

export interface RemoveUserAction {
    type: UserActionTypes.REMOVE_USER_DATA
}

export interface UpdateUserLoadingAction {
    type: UserActionTypes.UPDATE_USER_LOADING,
    payload: boolean
}

export function addUserData(user: User, onDone?: () => void) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: UserActionTypes.UPDATE_USER_LOADING,
            payload: true
        });
        const newUser = await UserModel.addUser(user)
        batch(() => {
            dispatch({
                type: UserActionTypes.ADD_USER_DATA,
                payload: newUser
            });
            dispatch({
                type: UserActionTypes.UPDATE_USER_LOADING,
                payload: false
            });
        })
        if (onDone) {
            onDone();
        }
    } 
}

export function removeUserData() {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        let user = getState().userState.user;
        if (user) {
            UserModel.removeUser(user);
            dispatch({type: UserActionTypes.REMOVE_USER_DATA});
        }
    }
}

export function updateUserData(user: User) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: UserActionTypes.UPDATE_USER_LOADING,
            payload: true
        });
        const updateUser = await UserModel.updateUser(user);
        batch(() => {
            dispatch({
                type: UserActionTypes.UPDATE_USER_DATA,
                payload: updateUser
            });
            dispatch({
                type: UserActionTypes.UPDATE_USER_LOADING,
                payload: false
            });
        })
    }
}

export function setUserData(user: User) {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch({
            type: UserActionTypes.ADD_USER_DATA,
            payload: user
        });
    }
}


export type UserActions = UserDataAction | UpdateUserLoadingAction | RemoveUserAction

/*In the reducer you decide what each action does with the state. The returned value is the new state.*/
export const userReducer = (
    state: UserState = initUserState, /*The inital state*/
    action: UserActions
): UserState => {
    switch (action.type) {
        case UserActionTypes.ADD_USER_DATA:
            return {
                ...state,
                user: action.payload
            };
        case UserActionTypes.REMOVE_USER_DATA:
            return {
                ...state,
                user: null
            };
        case UserActionTypes.UPDATE_USER_DATA:
            return {
                ...state,
                user: action.payload
            };
        case UserActionTypes.UPDATE_USER_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}

