import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { giveHelpReducer, GiveHelpActions } from './giveHelpState';

/*Add your states with the reducers here*/
const rootReducer = combineReducers({
    giveHelpState: giveHelpReducer,
});

/*Import your actions here, add a new one with |*/
export type AppActions = 
    GiveHelpActions;

export type AppState = ReturnType<typeof rootReducer>
const store = createStore(
    rootReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export default store;
export type Dispatch = typeof store.dispatch