import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducers = combineReducers({});

const middleware = [
  ReduxThunk,
  createLogger({
    collapsed: true,
  }),
];

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, applyMiddleware(...middleware));

export type StoreState = ReturnType<typeof reducers>;
