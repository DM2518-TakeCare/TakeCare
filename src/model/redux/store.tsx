import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { giveHelpReducer, GiveHelpActions } from './giveHelpState';
import { UserActions, userReducer } from './userState';
import { SearchTaskActions, searchTaskReducer } from './searchTaskState';
import { appBarReducer, AppBarActions } from './appBarState';

/*Add your states with the reducers here*/
const rootReducer = combineReducers({
    giveHelpState: giveHelpReducer,
    userState: userReducer,
    searchTaskState: searchTaskReducer,
    appBarState: appBarReducer,
});

/*Import your actions here, add a new one with |*/
export type AppActions = 
    GiveHelpActions | 
    UserActions |
    SearchTaskActions |
    AppBarActions;

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export type Dispatch = typeof store.dispatch
export default store;