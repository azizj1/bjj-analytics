import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function configureStore(initialState?: any) {
    const middlewares = [thunk];

    let composeFn = compose;

    if (__DEV__) {
        // Integration with Redux DevTools Extension: http://extension.remotedev.io/
        composeFn = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }
    const composedMiddleware = composeFn(applyMiddleware(...middlewares));

    return createStore(rootReducer, initialState, composedMiddleware);
}
