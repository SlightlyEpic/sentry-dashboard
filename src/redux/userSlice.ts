import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    isAuthenticated: boolean
    username: string | null
    image: string | null
}

const initialState: UserState = {
    isAuthenticated: false,
    username: null,
    image: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.username = action.payload.username;
            state.image = action.payload.image;
        },
        logout: (state) => {
            state.username = null;
            state.image = null;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
