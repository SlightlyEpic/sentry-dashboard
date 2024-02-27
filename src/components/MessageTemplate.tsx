import { Message } from '@/types/db';
import { DiscordEmbed, DiscordEmbedDescription, DiscordEmbedField, DiscordEmbedFooter, DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';

export type MessageTemplateProps = {
    template: Message
}

const sentryAvatarLink = 'https://cdn.discordapp.com/avatars/999132132754600016/a47cee15b14c62347c0801bb66dc6393.png?size=512';

export function MessageTemplate({ template }: MessageTemplateProps) {
    const embed = template.embed;

    // This is littered with `someProperty || undefined` because the data in the db is littered with empty strings
    return (
        <div className='flex flex-col text-white border border-bggrey-ll p-4 rounded-md bg-bgdark flex-grow'>
            {JSON.stringify(template)}
            <DiscordMessages>
                <DiscordMessage bot={true} author='Sentry' avatar={sentryAvatarLink}>
                    {/* Hey */}
                    {embed && <DiscordEmbed
                        authorName={embed?.author?.name || undefined}
                        authorImage={embed?.author?.icon_url || undefined}
                        authorUrl={embed?.author?.url || undefined}
                        thumbnail={embed?.thumbnail?.url || undefined}
                        image={embed?.image?.url || undefined}
                        color={`#${(embed.color ?? 0).toString(16)}`}
                    >
                        <DiscordEmbedDescription>
                            {embed?.description || ''}
                        </DiscordEmbedDescription>

                        {/* Embed fields */}
                        {embed.fields && embed.fields.map(field => 
                            <DiscordEmbedField fieldTitle={field.name} inline={field.inline}>{field.value}</DiscordEmbedField>
                        )}

                        {/* Embed footer */}
                        <DiscordEmbedFooter footerImage={embed.footer?.icon_url || undefined}>
                            {embed.footer?.text ?? ''}
                        </DiscordEmbedFooter>
                    </DiscordEmbed>}
                </DiscordMessage>
            </DiscordMessages>
        </div>
    )
}
