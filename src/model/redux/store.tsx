import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { giveHelpReducer, GiveHelpActions } from './giveHelpState';
import { UserActions, userReducer } from './userState';

/*Add your states with the reducers here*/
const rootReducer = combineReducers({
    giveHelpState: giveHelpReducer,
    userState: userReducer
});

/*Import your actions here, add a new one with |*/
export type AppActions = 
    GiveHelpActions | 
    UserActions

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export default store;