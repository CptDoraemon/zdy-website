import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import state from "./state";
import rootReducers from "./reducers/root-reducers";

import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger();

export default function configureStore() {
    return createStore(
        rootReducers,
        state,
        // applyMiddleware(thunkMiddleware)
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
}
