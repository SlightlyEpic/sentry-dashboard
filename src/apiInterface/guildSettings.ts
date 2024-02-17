import * as GR from '@/types/payloads';

function sendApiRequest(guildId: string, endpoint: string, payload: GR.AnyPayload) {
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

export function setPrefix(guildId: string, payload: GR.SetPrefixPayload) {
    return sendApiRequest(guildId, 'prefix', payload);
}

export function addPunishment(guildId: string, payload: GR.AddPunishmentPayload) {
    return sendApiRequest(guildId, 'punishments/add', payload);
}

export function RemovePunishmentPayload(guildId: string, payload: GR.RemovePunishmentPayload) {
    return sendApiRequest(guildId, 'punishments/remove', payload);
}
