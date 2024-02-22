import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type * as GR from '@/types/payloads';
import { GuildSettings } from '@/types/db';

type GuildState = {
    guildId: string | null
    data: GuildSettings | null
}

// const initialState = {
//     guildId: null,
//     data: null
// } as GuildState;

const testInitialState = {
    guildId: null,
    data: {
        prefix: 'test',
        compact_responses: false,
        mod_stats: {
            status: true
        }
    }
} as GuildState;

export const guildSlice = createSlice({
    name: 'guildSettings',
    initialState: testInitialState,
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
                // @ts-expect-error This is totally OK
                return Object.keys(p).some(k => p[k] !== action.payload[k])
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
        setCompactRespone: (state, action: PayloadAction<{ status: boolean }>) => {
            if(!state.data) return;
            state.data.compact_responses = action.payload.status;
        },
    }
});

export const {
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
    setCompactRespone,
} = guildSlice.actions;

export default guildSlice.reducer;
