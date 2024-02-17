import { createSlice } from '@reduxjs/toolkit';
import { GuildSettings } from '@/types/db';

type GuildSettingsState = GuildSettings | null;

const initialState: GuildSettingsState = null

export const guildSettingsSlice = createSlice({
    name: 'guildSettings',
    initialState,
    reducers: {}
});

// export const { login, logout } = guildSettingsSlice.actions;

export default guildSettingsSlice.reducer;
