import { Message, PermissionFlags, Permit, Punishment } from './db';

export type SetPrefixPayload = { prefix: string };
export type SetModStatsStatusPayload = { status: boolean };
export type SetCompactResponsePayload = { status: boolean };

export type AddPunishmentPayload = Punishment;
export type RemovePunishmentPayload = Punishment;

export type AddPermitPayload = Permit;
export type RemovePermitPayload = { permitName: string };

export type SetPermissionsPayload = {
    permitName: string
    permissions: PermissionFlags[]
};

export type SetRolesPayload = {
    permitName: string
    roles: string[]
};

export type SetAdwarnStatusPayload = { status: boolean };
export type SetAdwarnChannelPayload = { channel: string };
export type SetAdwarnDmStatusPayload = { status: boolean };
export type SetAdwarnMessagePayload = { message: Message };

export type SetReportStatusPayload = { status: boolean };
export type SetReportsChannelPayload = { channel: string };

export type AnyPayload = SetPrefixPayload | AddPunishmentPayload | RemovePunishmentPayload | AddPermitPayload | RemovePermitPayload
    | SetPermissionsPayload | SetRolesPayload | SetAdwarnStatusPayload | SetAdwarnChannelPayload | SetAdwarnDmStatusPayload
    | SetAdwarnMessagePayload | SetReportStatusPayload | SetReportsChannelPayload | SetModStatsStatusPayload | SetCompactResponsePayload;
