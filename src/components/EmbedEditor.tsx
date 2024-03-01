import { numberToHexStr } from '@/util/embedUtil';
import StringInput from './embedEditor/StringInput';
import { APIEmbed } from 'discord.js';
import { useReducer, useRef, useState } from 'react';
import ContentInput from './embedEditor/ContentInput';
import SaveStatus, { SaveStatusProps } from './SaveStatus';

export type EmbedEditorProps = {
    embed: APIEmbed
    saveToServer: (embed: APIEmbed) => Promise<unknown>
    saveToRedux: (embed: APIEmbed) => unknown
};

type EmbedReducerAction = {
    type: 'setTitle' | 'setColor' | 'setAuthor' | 'setAuthorUrl' | 'setAuthorIconUrl' | 'setImageUrl' | 'setThumbnailUrl' | 'setEmbedUrl' | 'setDescription' | 'setFooter'
    payload: string
} | {
    type: 'addField'
    payload: {
        name: string
        value: string
    }
} | {
    type: 'removeField'
    payload: {
        index: number
    }
};

function embedReducer(state: EmbedEditorProps['embed'], action: EmbedReducerAction) {
    const newState = structuredClone(state);
    switch(action.type) {
        case 'setTitle':
            newState.title = action.payload;
            break;
        case 'setColor':
            newState.color = parseInt(action.payload.substring(1), 16) || 0;
            break;
        case 'setAuthor':
            if(!newState.author) newState.author = { name: '' };
            newState.author!.name = action.payload;
            break;
        case 'setAuthorUrl':
            if(!newState.author) newState.author = { name: '' };
            newState.author!.url = action.payload;
            break;
        case 'setAuthorIconUrl':
            if(!newState.author) newState.author = { name: '' };
            newState.author!.icon_url = action.payload;
            break;
        case 'setImageUrl':
            if(!newState.image) newState.image = { url: '' };
            newState.image.url = action.payload;
            break;
        case 'setThumbnailUrl':
            if(!newState.thumbnail) newState.thumbnail = { url: '' };
            newState.thumbnail!.url = action.payload;
            break;
        case 'setEmbedUrl':
            newState.url = action.payload;
            break;
        case 'setDescription':
            newState.description = action.payload;
            break;
        case 'setFooter':
            if(!newState.footer) newState.footer = { text: '' };
            newState.footer.text = action.payload;
            break;
        case 'addField':
            break;
        case 'removeField':
            break;
    }

    return newState;
}

export function EmbedEditor({ embed, saveToServer, saveToRedux }: EmbedEditorProps) {
    const [currEmbed, dispatch] = useReducer(embedReducer, embed);

    const titleInput = useRef(null);
    const colorInput = useRef(null);
    const authorInput = useRef(null);
    const authorUrlInput = useRef(null);
    const authorIconUrlInput = useRef(null);
    const imageUrlInput = useRef(null);
    const thumbnailUrlInput = useRef(null);
    const embedUrlInput = useRef(null);
    const descriptionInput = useRef(null);
    const footerInput = useRef(null);

    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const [hasChanged, setHasChanged] = useState(false);

    const trySave = async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        try {
            setSaveStatus('saving');
            // await saveToServer(currText);
            // saveToRedux(currText);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    };

    return (
        <div className='flex flex-col text-white flex-grow gap-4'>
            <div className='font-bold text-2xl'>Embed Editor</div>

            {/* <div className='w-full flex flex-col lg:flex-row gap-4'> */}
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Title</div>
                    <StringInput text={embed.title || ''} ref={titleInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold flex gap-2'>
                        Color
                        <span style={{ backgroundColor: numberToHexStr(embed.color) }} className='h-4 w-4 inline-block rounded-full' />
                    </div>
                    <StringInput text={numberToHexStr(embed.color)} ref={colorInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Author</div>
                    <StringInput text={embed.author?.name || ''} ref={authorInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Author URL</div>
                    <StringInput text={embed.author?.url || ''} ref={authorUrlInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Author Icon URL</div>
                    <StringInput text={embed.author?.icon_url || ''} ref={authorIconUrlInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Embed Image URL</div>
                    <StringInput text={embed.image?.url || ''} ref={imageUrlInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Thumbnail URL</div>
                    <StringInput text={embed.thumbnail?.url || ''} ref={thumbnailUrlInput} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Embed URL</div>
                    <StringInput text={embed.url || ''} ref={embedUrlInput} />
                </div>
            </div>

            <div className='font-bold'>Description</div>
            <ContentInput text={embed.description || ''} ref={descriptionInput} />

            <div className='font-bold'>Footer</div>
            <StringInput text={embed.footer?.text || ''} ref={footerInput} />

            <div className='flex justify-end items-center h-12'>
                <SaveStatus status={saveStatus} />
                <button 
                    type="button" 
                    className='self-end w-32 h-10 bg-green-700 rounded-md text-md font-bold px-4 py-1 hover:bg-green-500'
                    onClick={trySave}
                >
                    Save embed
                </button>
            </div>
        </div>
    );
}
