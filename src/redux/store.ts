import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import guildReducer from './guildSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'root',
    storage: storageSession,
};

const rootReducer = combineReducers({
    user: userReducer,
    guild: guildReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
