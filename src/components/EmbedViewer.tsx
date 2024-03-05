import { Message } from '@/types/db';
import { DeepPartial } from '@/types/typeMagic';
import { removeFalsyProperties } from '@/util/embedUtil';
import { DiscordEmbed, DiscordEmbedDescription, DiscordEmbedField, DiscordEmbedFields, DiscordEmbedFooter, DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';
import { APIEmbed } from 'discord.js';
import { useMemo } from 'react';
import Markdown from 'react-markdown';

export type EmbedViewerProps = {
    message: Message
}

const sentryAvatarLink = 'https://cdn.discordapp.com/avatars/999132132754600016/a47cee15b14c62347c0801bb66dc6393.png?size=512';

export function EmbedViewer({ message }: EmbedViewerProps) {
    const cleanEmbed = useMemo<DeepPartial<APIEmbed> | null>(() => removeFalsyProperties(message.embed), [message.embed]);
    
    // This is littered with `someProperty || undefined` because the data in the db is littered with empty strings
    return (
        <DiscordMessages>
            {message.content}
            <DiscordMessage bot={true} author='Sentry' avatar={sentryAvatarLink}>
                {cleanEmbed && <DiscordEmbed
                    authorName={cleanEmbed?.author?.name}
                    authorImage={cleanEmbed?.author?.icon_url}
                    authorUrl={cleanEmbed?.author?.url}
                    thumbnail={cleanEmbed?.thumbnail?.url}
                    embedTitle={cleanEmbed?.title}
                    url={cleanEmbed?.url}
                    image={cleanEmbed?.image?.url}
                    color={`#${(cleanEmbed?.color ?? 0).toString(16)}`}
                >
                    {/* Embed description */}
                    <DiscordEmbedDescription slot='description'>
                        <Markdown>{cleanEmbed?.description || ''}</Markdown>
                    </DiscordEmbedDescription>

                    {/* Embed fields */}
                    {cleanEmbed.fields && <DiscordEmbedFields slot='fields'>
                        {cleanEmbed.fields.map((field, i) => 
                            <DiscordEmbedField key={i} fieldTitle={field!.name} inline={field?.inline}>{field!.value}</DiscordEmbedField>
                        )}
                        </DiscordEmbedFields>
                    }

                    {/* Embed footer */}
                    <DiscordEmbedFooter footerImage={cleanEmbed.footer?.icon_url || undefined} slot='footer'>
                        {cleanEmbed.footer?.text ?? ''}
                    </DiscordEmbedFooter>
                </DiscordEmbed>}
            </DiscordMessage>
        </DiscordMessages>
    )
}
