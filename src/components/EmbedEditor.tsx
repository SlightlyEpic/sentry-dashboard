import StringInput from './StringInput';
import { APIEmbed } from 'discord.js';

export type EmbedEditorProps = {
    embed: APIEmbed
}

export function EmbedEditor({ embed }: EmbedEditorProps) {
    return (
        <div className='flex flex-col text-white flex-grow gap-4'>
            <div className='font-bold text-2xl'>Embed Editor</div>
            <div className='font-bold'>Author</div>
            <StringInput text={embed.author?.name || ''} saveToRedux={() => {}} saveToServer={async () => 'Success'} />
        </div>
    );
}
