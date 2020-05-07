import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { giveHelpReducer, GiveHelpActions } from './giveHelpState';
import { SearchTaskActions, searchTaskReducer } from './searchTaskState';

/*Add your states with the reducers here*/
const rootReducer = combineReducers({
    giveHelpState: giveHelpReducer,
    searchTaskState: searchTaskReducer
});

/*Import your actions here, add a new one with |*/
export type AppActions = 
    GiveHelpActions |
    SearchTaskActions;

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export default store;