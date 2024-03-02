import { numberToHexStr } from '@/util/embedUtil';
import StringInput from './embedEditor/StringInput';
import { APIEmbed } from 'discord.js';
import React, { useCallback, useReducer, useState } from 'react';
import ContentInput from './embedEditor/ContentInput';
import SaveStatus, { SaveStatusProps } from './SaveStatus';
import { TrashIcon } from '@heroicons/react/24/outline';
import SwitchButton from './embedEditor/SwitchButton';

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
        inline?: boolean
    }
} | {
    type: 'setField'
    payload: {
        index: number
        name?: string
        value?: string
        inline?: boolean
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
            if(!newState?.fields) newState.fields = [];
            newState.fields.push(action.payload);
            break;
        case 'setField':
            if(!newState?.fields) break;
            if(newState.fields.length <= action.payload.index) break;
            if(action.payload.name) newState.fields[action.payload.index].name = action.payload.name;
            if(action.payload.value) newState.fields[action.payload.index].value = action.payload.value;
            if(action.payload.inline) newState.fields[action.payload.index].inline = action.payload.inline;
            break;
        case 'removeField':
            if(!newState?.fields) break;
            if(newState.fields.length <= action.payload.index) break;
            newState.fields = newState.fields.filter((_, i) => i !== action.payload.index);
            break;
    }

    return newState;
}

export function EmbedEditor({ embed, saveToServer, saveToRedux }: EmbedEditorProps) {
    const [currEmbed, dispatch] = useReducer(embedReducer, embed);
    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const trySave = useCallback(async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        try {
            setSaveStatus('saving');
            await saveToServer(currEmbed);
            saveToRedux(currEmbed);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    }, [saveStatus, timeoutId, setSaveStatus, saveToServer, saveToRedux, currEmbed]);

    const addField = useCallback(() => {
        dispatch({
            type: 'addField',
            payload: {
                name: '',
                value: ''
            }
        });
    }, [dispatch]);

    return (
        <div className='flex flex-col text-white flex-grow gap-4'>
            <div className='font-bold text-2xl'>Embed Editor</div>

            {/* <div className='w-full flex flex-col lg:flex-row gap-4'> */}
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Title</div>
                    <StringInput text={currEmbed.title || ''} onChange={v => dispatch({ type: 'setTitle', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold flex gap-2'>
                        Color
                        <span style={{ backgroundColor: numberToHexStr(currEmbed.color) }} className='h-4 w-4 inline-block rounded-full' />
                    </div>
                    <StringInput text={numberToHexStr(currEmbed.color)} onChange={v => dispatch({ type: 'setColor', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Author</div>
                    <StringInput text={currEmbed.author?.name || ''} onChange={v => dispatch({ type: 'setAuthor', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Author URL</div>
                    <StringInput text={currEmbed.author?.url || ''} onChange={v => dispatch({ type: 'setAuthorUrl', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Author Icon URL</div>
                    <StringInput text={currEmbed.author?.icon_url || ''} onChange={v => dispatch({ type: 'setAuthorIconUrl', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Embed Image URL</div>
                    <StringInput text={currEmbed.image?.url || ''} onChange={v => dispatch({ type: 'setImageUrl', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Thumbnail URL</div>
                    <StringInput text={currEmbed.thumbnail?.url || ''} onChange={v => dispatch({ type: 'setThumbnailUrl', payload: v })} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold'>Embed URL</div>
                    <StringInput text={currEmbed.url || ''} onChange={v => dispatch({ type: 'setEmbedUrl', payload: v })} />
                </div>
            </div>

            <div className='font-bold'>Description</div>
            <ContentInput text={currEmbed.description || ''} onChange={v => dispatch({ type: 'setDescription', payload: v })} />

            <div className='font-bold'>Footer</div>
            <StringInput text={currEmbed.footer?.text || ''} onChange={v => dispatch({ type: 'setFooter', payload: v })} />

            <div className='font-bold'>Fields (Current count: {currEmbed?.fields?.length || 0})</div>
            {
                currEmbed?.fields && currEmbed.fields.map((field, i) => {
                    return <React.Fragment key={i} >
                    {/* <div className='border-t border-bggrey-ll' /> */}
                    <div className='flex flex-col gap-4 p-4 border-bggrey-ll border rounded-md'>
                        <div className='w-full flex flex-col gap-4'>
                            <div className='flex justify-between'>
                                <div className='font-bold'>Name</div>
                                <TrashIcon 
                                    className='w-8 h-8 bg-red-600 cursor-pointer hover:ring-1 hover:ring-white transition-colors duration-300  p-1 rounded-md' 
                                    onClick={() => dispatch({ type: 'removeField', payload: { index: i } })}
                                />
                            </div>
                            <StringInput text={field.name || ''} onChange={v => dispatch({ type: 'setField', payload: { index: i, name: v } })} />
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <div className='font-bold'>Value</div>
                            <ContentInput text={field.value || ''} onChange={v => dispatch({ type: 'setField', payload: { index: i, value: v } })} />
                        </div>
                        <div className='w-full flex flex-row gap-4 justify-start items-center'>
                            <div className='font-bold'>Inline</div>
                            <SwitchButton state={field.inline ?? false} onChange={v => dispatch({ type: 'setField', payload: { index: i, inline: v } })} />
                        </div>
                    </div>
                    </React.Fragment>
                })
            }

            <div className='flex justify-end items-center h-12'>
                <button 
                    type="button" 
                    className='self-end w-32 h-10 bg-green-700 rounded-md text-md font-bold px-4 py-1 hover:bg-green-500'
                    onClick={addField}
                >
                    Add field
                </button>
            </div>

            <div className='border-t border-bggrey-ll' />
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
