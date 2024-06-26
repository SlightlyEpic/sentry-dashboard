import type { APIEmbed } from 'discord.js';

export type Message = {
    name: string
    id: string
    content: string
    attachments: string[]
    type: string
    embed: APIEmbed
    buttons: string[]           // this is just a list of custom button unique ids, the user would select from a menu of existing custom buttons from the database
}

export type AdWarn = {
    status: boolean
    channel: string
    message_template: Message | null
    send_dm: boolean,
}

export type Premium = {
    status: boolean
    activated_by: string
    activated_timestamp: number | null
    end_timestamp: number | null
    from_code: string | null
}

export type ModStat = {
    adwarnings_issued: string
    warnings_issued: string
    mutes_issued: string
    kicks_issued: string
    bans_issued: string
}

export type PermissionFlags = 'MANAGE_CASES'
                            | 'MANAGE_LOCKDOWN'
                            | 'MANAGE_APPEALS'
                            | 'MANAGE_SLOWMODE'
                            | 'MANAGE_MODMAIL_THREADS'
                            | 'MANAGE_APPLICATION_RESPONSES'
                            | 'WARN_MEMBERS'
                            | 'KICK_MEMBERS'
                            | 'BAN_MEMBERS'
                            | 'MUTE_MEMBERS'
                            | 'MANAGE_APPEALS'
                            | 'MANAGE_GUILD'
                            | 'FULL_CONTROL'

export type Permit = {
    name: string
    locked: boolean
    permissions: PermissionFlags[]
    roles: string[]             // Role Ids
    users: string[]             // User Ids
}

export type Punishment = {
    warnings_count: number
    duration_raw: string
    duration: number
    warning_severity: string
    action: string
}

export type Action = {
    name: string
    template_name: string
}

export type Button = {
    label: string
    unique_id: string
    color: string
    actions: Action[]
    url: string
    id: string
}

export type MenuOption = {
    label: string
    description: string
    actions: {
        name: string
        role: number
    }[]
    emoji: string | null
}

export type Menu = {
    placeholder: string
    options: MenuOption[]
    id: string
}

export type Report = unknown;

export type CompactRole = {
    id: string
    name: string
    color: number
}

export type GuildSettings = {
    adwarning_settings: AdWarn
    mod_stats: {
        status: boolean
        data: {
            [key: string]: ModStat[]
        }
    }
    compact_responses: boolean
    prefix: string
    custom_permits: Permit[]
    warn_punishments: Punishment[]
    templates: {
        messages: Message[]
        buttons: Button[]
        menus: Menu[]
    }
    premium: Premium
    reports: {
        status: boolean
        channel: string | null
        data: Report[]
    }
    roles: {
        [key: string]: CompactRole
    }
};
