import { DeepPartial } from '@/types/typeMagic';
import { removeFalsyProperties } from '@/util/embedUtil';
import { DiscordEmbed, DiscordEmbedDescription, DiscordEmbedField, DiscordEmbedFooter, DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';
import { APIEmbed } from 'discord.js';
import { useMemo } from 'react';
import Markdown from 'react-markdown';

export type EmbedViewerProps = {
    embed: APIEmbed
}

const sentryAvatarLink = 'https://cdn.discordapp.com/avatars/999132132754600016/a47cee15b14c62347c0801bb66dc6393.png?size=512';

export function EmbedViewer({ embed }: EmbedViewerProps) {
    const cleanEmbed = useMemo<DeepPartial<APIEmbed> | null>(() => removeFalsyProperties(embed), [embed]);

    // This is littered with `someProperty || undefined` because the data in the db is littered with empty strings
    return (
        <div className='flex flex-col text-white border border-bggrey-ll p-4 rounded-md bg-bgdark flex-grow'>
            <DiscordMessages>
                <DiscordMessage bot={true} author='Sentry' avatar={sentryAvatarLink}>
                    {cleanEmbed && <DiscordEmbed
                        authorName={cleanEmbed?.author?.name || undefined}
                        authorImage={cleanEmbed?.author?.icon_url || undefined}
                        authorUrl={cleanEmbed?.author?.url || undefined}
                        thumbnail={cleanEmbed?.thumbnail?.url || undefined}
                        embedTitle={cleanEmbed?.title || undefined}
                        url={cleanEmbed?.url || undefined}
                        image={cleanEmbed?.image?.url || undefined}
                        color={`#${(cleanEmbed.color ?? 0).toString(16)}`}
                    >
                        <DiscordEmbedDescription content={cleanEmbed?.description || ''} slot='description'>
                            <Markdown>{cleanEmbed?.description || ''}</Markdown>
                        </DiscordEmbedDescription>

                        {/* Embed fields */}
                        {cleanEmbed.fields && cleanEmbed.fields.map(field => 
                            <DiscordEmbedField fieldTitle={field!.name} inline={field?.inline}>{field!.value}</DiscordEmbedField>
                        )}

                        {/* Embed footer */}
                        <DiscordEmbedFooter footerImage={cleanEmbed.footer?.icon_url || undefined} slot='footer'>
                            {cleanEmbed.footer?.text ?? ''}
                        </DiscordEmbedFooter>
                    </DiscordEmbed>}
                </DiscordMessage>
            </DiscordMessages>
        </div>
    )
}
