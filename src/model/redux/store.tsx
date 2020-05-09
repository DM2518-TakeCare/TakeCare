import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { giveHelpReducer, GiveHelpActions } from './giveHelpState';
import { UserActions, userReducer } from './userState';
import { SearchTaskActions, searchTaskReducer } from './searchTaskState';
import { ReceiveHelpActions, receiveHelpReducer } from './receiveHelpState';

/*Add your states with the reducers here*/
const rootReducer = combineReducers({
    giveHelpState: giveHelpReducer,
    userState: userReducer,
    searchTaskState: searchTaskReducer,
    receiveHelpState: receiveHelpReducer,
});

/*Import your actions here, add a new one with |*/
export type AppActions = 
    GiveHelpActions | 
    UserActions |
    SearchTaskActions |
    ReceiveHelpActions;

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export type Dispatch = typeof store.dispatch
export default store;