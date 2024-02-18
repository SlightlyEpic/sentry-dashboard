import type * as GR from '@/types/payloads';
import type { GuildSettings } from '@/types/db';

type GuildInfo = {
    allowed?: boolean        // Does user have sufficient permissions to change settings in this guild
    permissions?: string[]
    icon: string
    name: string
    id: string
};

function getApiRequest<T>(guildId: string, endpoint: string) {
    return new Promise<T>((resolve, reject) => {
        fetch(`/api/guilds/${guildId}/${endpoint}`)
        .then(res => {
            if(!res.ok) reject('Request failed.');
            else return res.json();
        })
        .then(res => {
            if('error' in res) {
                reject(res.error);
            } else {
                resolve(res.data);
            }
        })
        .catch(() => reject('Unkown error'));
    });
}

function postApiRequest(guildId: string, endpoint: string, payload: GR.AnyPayload) {
    return new Promise<string>((resolve, reject) => {
        fetch(`/api/guilds/${guildId}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(res => {
            if(!res.ok) reject('Request failed.');
            else return res.json();
        })
        .then(res => {
            if('error' in res) {
                reject(res.error);
            } else {
                resolve('Success');
            }
        })
        .catch(() => reject('Unknown error'));
    });
}

export function getMutualGuilds() {
    return new Promise<GuildInfo[]>((resolve, reject) => {
        fetch('/api/guilds/mutual')
        .then(res => {
            if(!res.ok) reject('Request failed.');
            else return res.json();
        })
        .then(res => {
            if('error' in res) {
                reject(res.error);
            } else {
                resolve(res.data);
            }
        })
        .catch(() => reject('Unkown error'));
    });
}

export function getAllSettings(guildId: string) {
    return getApiRequest<GuildSettings>(guildId, '');
}

export function getTemplates(guildId: string) {
    return getApiRequest<GuildSettings['templates']>(guildId, 'templates');
}

export function setPrefix(guildId: string, payload: GR.SetPrefixPayload) {
    return postApiRequest(guildId, 'prefix', payload);
}

export function addPunishment(guildId: string, payload: GR.AddPunishmentPayload) {
    return postApiRequest(guildId, 'punishments/add', payload);
}

export function removePunishment(guildId: string, payload: GR.RemovePunishmentPayload) {
    return postApiRequest(guildId, 'punishments/remove', payload);
}

export function addPermit(guildId: string, payload: GR.AddPermitPayload) {
    return postApiRequest(guildId, 'permits/add', payload);
}

export function removePermit(guildId: string, payload: GR.RemovePermitPayload) {
    return postApiRequest(guildId, 'permits/remove', payload);
}

export function setPermitPermissions(guildId: string, payload: GR.SetPermissionsPayload) {
    return postApiRequest(guildId, 'permits/permissions', payload);
}

export function setPermitRoles(guildId: string, payload: GR.SetRolesPayload) {
    return postApiRequest(guildId, 'permits/roles', payload);
}

export function setAdWarnStatus(guildId: string, payload: GR.SetAdwarnStatusPayload) {
    return postApiRequest(guildId, 'adWarn/status', payload);
}

export function setAdWarnChannel(guildId: string, payload: GR.SetAdwarnChannelPayload) {
    return postApiRequest(guildId, 'adWarn/channel', payload);
}

export function setAdWarnDmStatus(guildId: string, payload: GR.SetAdwarnDmStatusPayload) {
    return postApiRequest(guildId, 'adWarn/dmStatus', payload);
}

export function setAdWarnMessage(guildId: string, payload: GR.SetAdwarnMessagePayload) {
    return postApiRequest(guildId, 'adWarn/message', payload);
}

export function setReportsStatus(guildId: string, payload: GR.SetReportStatusPayload) {
    return postApiRequest(guildId, 'reports/status', payload);
}

export function setReportsChannel(guildId: string, payload: GR.SetReportsChannelPayload) {
    return postApiRequest(guildId, 'reports/channel', payload);
}


