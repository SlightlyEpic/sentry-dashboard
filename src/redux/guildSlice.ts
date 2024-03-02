import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '@/apiInterface/guildSettings';
import type * as GR from '@/types/payloads';
import { GuildSettings } from '@/types/db';

type GuildState = {
    guildId: string | null
    data: GuildSettings | null
}

const initialState = {
    guildId: null,
    data: null
} as GuildState;

//#region test initial state
// const testInitialState = {
//     guildId: null,
//     data: {
//         prefix: 'test',
//         compact_responses: false,
//         mod_stats: {
//             status: true
//         },
//         warn_punishments: [
//             {
//                 action: 'act',
//                 duration: 1000,
//                 duration_raw: '1s',
//                 warnings_count: 3,
//                 warning_severity: 'low'
//             },
//             {
//                 action: 'hello',
//                 duration: 500,
//                 duration_raw: '1s',
//                 warnings_count: 5,
//                 warning_severity: 'high'
//             },
//             {
//                 action: 'LOL',
//                 duration: 500,
//                 duration_raw: '1s',
//                 warnings_count: 5,
//                 warning_severity: 'high'
//             },
//         ],
//         adwarning_settings: {
//             channel: '1234567890',
//             message_template: null,
//             send_dm: false,
//             status: true
//         }
//     }
// } as GuildState;
//#endregion

// * async middleware definitions
//#region 
function apiAsyncThunkFactory<T extends GR.AnyPayload>(name: string, callback: (guildId: string, payload: T) => unknown | PromiseLike<unknown>) {
    return createAsyncThunk(
        name,
        async (payload: T, thunkAPI) => {
            const state = thunkAPI.getState() as GuildState;
            if(!state.guildId) throw 'Guild Id not set.';
            await callback(state.guildId, payload);
            return payload;
        }
    );
}

export const refreshAllSettingsAT = createAsyncThunk(
    'guildSettings/refreshAllSettings',
    async (_: void, thunkAPI) => {
        const state = thunkAPI.getState() as GuildState;
        if(!state.guildId) throw 'Guild Id not set.';
        return await api.getAllSettings(state.guildId);
    }
);
export const setPrefixAT = apiAsyncThunkFactory('guildSettings/setPrefix', api.setPrefix);
export const addPunishmentAT = apiAsyncThunkFactory('guildSettings/addPunishment', api.addPunishment);
export const removePunishmentAT = apiAsyncThunkFactory('guildSettings/removePunishment', api.removePunishment);
export const addPermitAT = apiAsyncThunkFactory('guildSettings/addPermit', api.addPermit);
export const removePermitAT = apiAsyncThunkFactory('guildSettings/removePermit', api.removePermit);
export const setPermitPermissionsAT = apiAsyncThunkFactory('guildSettings/setPermitPermissions', api.setPermitPermissions);
export const setPermitRolesAT = apiAsyncThunkFactory('guildSettings/setPermitRoles', api.setPermitRoles);
export const setAdwarnStatusAT = apiAsyncThunkFactory('guildSettings/ssetAdwarnStatus', api.setAdWarnStatus);
export const setAdwarnChannelAT = apiAsyncThunkFactory('guildSettings/setAdwarnChannel', api.setAdWarnChannel);
export const setAdwarnDmStatusAT = apiAsyncThunkFactory('guildSettings/setAdwarnDmStatus', api.setAdWarnDmStatus);
export const setAdwarnMessageAT = apiAsyncThunkFactory('guildSettings/setAdwarnMessage', api.setAdWarnMessage);
export const setReportsStatusAT = apiAsyncThunkFactory('guildSettings/setReportsStatus', api.setReportsStatus);
export const setReportsChannelAT = apiAsyncThunkFactory('guildSettings/setReportsChannel', api.setReportsChannel);
export const setModStatsStatusAT = apiAsyncThunkFactory('guildSettings/setModStatsStatus', api.setModStatsStatus);
export const setCompactResponseAT = apiAsyncThunkFactory('guildSettings/setCompactResponse', api.setCompactResponse);

//#endregion

// * the slice (truly informational)
export const guildSlice = createSlice({
    name: 'guildSettings',
    // initialState: testInitialState,
    initialState,
    reducers: {
        setGuildId: (state, action: PayloadAction<string>) => {
            if(state.guildId !== action.payload) {
                state.guildId = action.payload;
                state.data = null;
            }
        },
        setAllSettings: (state, action: PayloadAction<GuildSettings>) => {
            state.data = action.payload;
        },
        setPrefix: (state, action: PayloadAction<GR.SetPrefixPayload>) => {
            if(!state.data) return;
            state.data.prefix = action.payload.prefix;
        },
        addPunishment: (state, action: PayloadAction<GR.AddPunishmentPayload>) => {
            if(!state.data) return;
            state.data.warn_punishments.push(action.payload);
        },
        removePunishment: (state, action: PayloadAction<GR.RemovePunishmentPayload>) => {
            if(!state.data) return;
            state.data.warn_punishments = state.data.warn_punishments.filter(p => {
                return p.action !== action.payload.action ||
                    p.duration !== action.payload.duration ||
                    p.duration_raw !== action.payload.duration_raw ||
                    p.warning_severity !== action.payload.warning_severity ||
                    p.warnings_count !== action.payload.warnings_count;
            });
        },
        addPermit: (state, action: PayloadAction<GR.AddPermitPayload>) => {
            if(!state.data) return;
            state.data.custom_permits.push(action.payload);
        },
        removePermit: (state, action: PayloadAction<GR.RemovePermitPayload>) => {
            if(!state.data) return;
            state.data.custom_permits = state.data.custom_permits.filter(p => p.name !== action.payload.permitName);
        },
        setPermitPermissions: (state, action: PayloadAction<GR.SetPermissionsPayload>) => {
            if(!state.data) return;
            for(let i = 0; i < state.data.custom_permits.length; i++) {
                if(state.data.custom_permits[i].name === action.payload.permitName) {
                    state.data.custom_permits[i].permissions = action.payload.permissions;
                }
            }
        },
        setPermitRoles: (state, action: PayloadAction<GR.SetRolesPayload>) => {
            if(!state.data) return;
            for(let i = 0; i < state.data.custom_permits.length; i++) {
                if(state.data.custom_permits[i].name === action.payload.permitName) {
                    state.data.custom_permits[i].roles = action.payload.roles;
                }
            }
        },
        setAdWarnStatus: (state, action: PayloadAction<GR.SetAdwarnStatusPayload>) => {
            if(!state.data) return;
            state.data.adwarning_settings.status = action.payload.status;
        },
        setAdWarnChannel: (state, action: PayloadAction<GR.SetAdwarnChannelPayload>) => {
            if(!state.data) return;
            state.data.adwarning_settings.channel = action.payload.channel;
        },
        setAdWarnDmStatus: (state, action: PayloadAction<GR.SetAdwarnDmStatusPayload>) => {
            if(!state.data) return;
            state.data.adwarning_settings.send_dm = action.payload.status;
        },
        setAdWarnMessage: (state, action: PayloadAction<GR.SetAdwarnMessagePayload>) => {
            if(!state.data) return;
            state.data.adwarning_settings.message_template = action.payload.message
        },
        setReportsStatus: (state, action: PayloadAction<GR.SetReportStatusPayload>) => {
            if(!state.data) return;
            state.data.reports.status = action.payload.status;
        },
        setReportsChannel: (state, action: PayloadAction<GR.SetReportsChannelPayload>) => {
            if(!state.data) return;
            state.data.reports.channel = action.payload.channel;
        },
        setModStatsStatus: (state, action: PayloadAction<{ status: boolean }>) => {
            if(!state.data) return;
            state.data.mod_stats.status = action.payload.status;
        },
        setCompactResponse: (state, action: PayloadAction<{ status: boolean }>) => {
            if(!state.data) return;
            state.data.compact_responses = action.payload.status;
        },
    },
    // * If the middleware succeeds then call the reducer to change the state, otherwise do nothing
    // * Errors will be handled by whoever calls dispatch because the promise is passed through by dispatch
    extraReducers: (builder) => {
        builder
            .addCase(refreshAllSettingsAT.fulfilled, guildSlice.caseReducers.setAllSettings)
            .addCase(setPrefixAT.fulfilled, guildSlice.caseReducers.setPrefix)
            .addCase(addPunishmentAT.fulfilled, guildSlice.caseReducers.addPunishment)
            .addCase(removePunishmentAT.fulfilled, guildSlice.caseReducers.removePunishment)
            .addCase(addPermitAT.fulfilled, guildSlice.caseReducers.addPermit)
            .addCase(removePermitAT.fulfilled, guildSlice.caseReducers.removePermit)
            .addCase(setPermitPermissionsAT.fulfilled, guildSlice.caseReducers.setPermitPermissions)
            .addCase(setPermitRolesAT.fulfilled, guildSlice.caseReducers.setPermitRoles)
            .addCase(setAdwarnStatusAT.fulfilled, guildSlice.caseReducers.setAdWarnStatus)
            .addCase(setAdwarnChannelAT.fulfilled, guildSlice.caseReducers.setAdWarnChannel)
            .addCase(setAdwarnDmStatusAT.fulfilled, guildSlice.caseReducers.setAdWarnDmStatus)
            .addCase(setAdwarnMessageAT.fulfilled, guildSlice.caseReducers.setAdWarnMessage)
            .addCase(setReportsStatusAT.fulfilled, guildSlice.caseReducers.setReportsStatus)
            .addCase(setReportsChannelAT.fulfilled, guildSlice.caseReducers.setReportsChannel)
            .addCase(setModStatsStatusAT.fulfilled, guildSlice.caseReducers.setModStatsStatus)
            .addCase(setCompactResponseAT.fulfilled, guildSlice.caseReducers.setCompactResponse)
            .addDefaultCase(() => {});
    }
});

export const {
    setGuildId,
    setAllSettings,
    setPrefix,
    addPunishment,
    removePunishment,
    addPermit,
    removePermit,
    setPermitPermissions,
    setPermitRoles,
    setAdWarnStatus,
    setAdWarnChannel,
    setAdWarnDmStatus,
    setAdWarnMessage,
    setReportsStatus,
    setReportsChannel,
    setModStatsStatus,
    setCompactResponse,
} = guildSlice.actions;

export default guildSlice.reducer;
