import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rootReducer from './routeReducer';
import rootSaga from './routeSaga';

// import rootReducer from './rootReducer';
// import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

export const store = configureStore({
    reducer: combineReducers(rootReducer),
    middleware: (getDefaultMiddleware : any)  => getDefaultMiddleware().concat(sagaMiddleware)
});
// function* RootSaga() {
//     yield all([...rootSaga]);
// }
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;