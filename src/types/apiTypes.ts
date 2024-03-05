export type GuildInfo = {
    allowed?: boolean        // Does user have sufficient permissions to change settings in this guild
    permissions?: string[]
    icon: string
    name: string
    id: string
};
