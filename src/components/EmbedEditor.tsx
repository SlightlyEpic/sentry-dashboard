import { Message } from '@/types/db';
import { DeepPartial } from '@/types/typeMagic';
import { useMemo } from 'react';

// Maybe add declarations for this later
import { EmbedVisualizer } from 'embed-visualizer';
import 'embed-visualizer/dist/index.css'

const sentryAvatarLink = 'https://cdn.discordapp.com/avatars/999132132754600016/a47cee15b14c62347c0801bb66dc6393.png?size=512';

function removeFalsyProperties<T>(obj: T): DeepPartial<T> | null {
    /* eslint-disable no-extra-boolean-cast */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if(typeof obj !== 'object') return obj as DeepPartial<T>;
    
    let clean: any = {};
    
    for(let key in obj) {
        if(typeof obj[key] === 'object') {
            const recurse = removeFalsyProperties(obj[key]);
            if(!!recurse) clean[key] = recurse;
        } else if(!!obj[key]) {
            clean[key] = obj[key];
        }
    }

    if(Object.keys(clean).length === 0) return null;
    return clean;

    /* eslint-enable no-extra-boolean-cast */
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export type EmbedEditorProps = {
    template: Message
}

// TODO: Make this
export function EmbedEditor({ template }: EmbedEditorProps) {
    // Remove all falsy properties from the embed recursively
    // because the db data has a lot of them
    const embed = useMemo<DeepPartial<typeof template.embed> | null>(() => removeFalsyProperties(template.embed), [template]);

    // This is littered with `someProperty || undefined` because the data in the db is littered with empty strings
    return (
        <div className='flex flex-col text-white border border-bggrey-ll p-4 rounded-md bg-bgdark flex-grow'>
            {JSON.stringify(embed)}
            <EmbedVisualizer embed={{ embed }} onError={alert} />
        </div>
    )
}
