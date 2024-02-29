import { DeepPartial } from '@/types/typeMagic';
import { useMemo } from 'react';
import { removeFalsyProperties } from '@/util/objectUtil';

// Maybe add declarations for this later
import { EmbedVisualizer } from 'embed-visualizer';
import 'embed-visualizer/dist/index.css'
import { APIEmbed } from 'discord.js';

export type EmbedViewerProps = {
    embed: APIEmbed
}

// TODO: Make this
export function EmbedViewer({ embed }: EmbedViewerProps) {
    // Remove all falsy properties from the embed recursively
    // because the db data has a lot of them
    const cleanEmbed = useMemo<DeepPartial<APIEmbed> | null>(() => removeFalsyProperties(embed), [embed]);

    // This is littered with `someProperty || undefined` because the data in the db is littered with empty strings
    return (
        <div className='flex flex-col text-white border border-bggrey-ll p-4 rounded-md bg-bgdark flex-grow'>
            {/* {JSON.stringify(embed)} */}
            <div className='font-bold font-2xl'>Embed Preview</div>
            <EmbedVisualizer embed={{ embed: cleanEmbed }} onError={console.warn} />
        </div>
    )
}
