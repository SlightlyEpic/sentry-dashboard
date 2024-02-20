import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type * as GR from '@/types/payloads';
import { GuildSettings } from '@/types/db';

type GuildState = GuildSettings | null;

const initialState = null as GuildState;

export const guildSlice = createSlice({
    name: 'guildSettings',
    initialState,
    reducers: {
        setAllSettings: (state, action: PayloadAction<GuildSettings>) => {
            state = action.payload;
        },
        setPrefix: (state, action: PayloadAction<GR.SetPrefixPayload>) => {
            if(!state) return;
            state.prefix = action.payload.prefix;
        },
        addPunishment: (state, action: PayloadAction<GR.AddPunishmentPayload>) => {
            if(!state) return;
            state.warn_punishments.push(action.payload);
        },
        removePunishment: (state, action: PayloadAction<GR.RemovePunishmentPayload>) => {
            if(!state) return;
            state.warn_punishments = state.warn_punishments.filter(p => {
                // @ts-expect-error This is totally OK
                return Object.keys(p).some(k => p[k] !== action.payload[k])
            });
        },
        addPermit: (state, action: PayloadAction<GR.AddPermitPayload>) => {
            if(!state) return;
            state.custom_permits.push(action.payload);
        },
        removePermit: (state, action: PayloadAction<GR.RemovePermitPayload>) => {
            if(!state) return;
            state.custom_permits = state.custom_permits.filter(p => p.name !== action.payload.permitName);
        },
        setPermitPermissions: (state, action: PayloadAction<GR.SetPermissionsPayload>) => {
            if(!state) return;
            for(let i = 0; i < state.custom_permits.length; i++) {
                if(state.custom_permits[i].name === action.payload.permitName) {
                    state.custom_permits[i].permissions = action.payload.permissions;
                }
            }
        },
        setPermitRoles: (state, action: PayloadAction<GR.SetRolesPayload>) => {
            if(!state) return;
            for(let i = 0; i < state.custom_permits.length; i++) {
                if(state.custom_permits[i].name === action.payload.permitName) {
                    state.custom_permits[i].roles = action.payload.roles;
                }
            }
        },
        setAdWarnStatus: (state, action: PayloadAction<GR.SetAdwarnStatusPayload>) => {
            if(!state) return;
            state.adwarning_settings.status = action.payload.status;
        },
        setAdWarnChannel: (state, action: PayloadAction<GR.SetAdwarnChannelPayload>) => {
            if(!state) return;
            state.adwarning_settings.channel = action.payload.channel;
        },
        setAdWarnDmStatus: (state, action: PayloadAction<GR.SetAdwarnDmStatusPayload>) => {
            if(!state) return;
            state.adwarning_settings.send_dm = action.payload.status;
        },
        setAdWarnMessage: (state, action: PayloadAction<GR.SetAdwarnMessagePayload>) => {
            if(!state) return;
            state.adwarning_settings.message_template = action.payload.message
        },
        setReportsStatus: (state, action: PayloadAction<GR.SetReportStatusPayload>) => {
            if(!state) return;
            state.reports.status = action.payload.status;
        },
        setReportsChannel: (state, action: PayloadAction<GR.SetReportsChannelPayload>) => {
            if(!state) return;
            state.reports.channel = action.payload.channel;
        }
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
    setReportsChannel
} = guildSlice.actions;

export default guildSlice.reducer;
