import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import guildReducer from './guildSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        guild: guildReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
