import { useState } from 'react';
import SaveStatus from './SaveStatus';
import type { SaveStatusProps } from './SaveStatus';

export interface StringInputNewProps {
    text: string
    save: (value: string) => Promise<unknown>
    multiline?: boolean
}

export default function StringInputNew({ text, save, multiline }: StringInputNewProps) {
    const [currText, setCurrText] = useState(text);
    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const trySave = async () => {
        if(currText === text) return;
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        try {
            setSaveStatus('saving');
            await save(currText);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    };

    return (
        <div className='min-h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
            {
                !multiline
                ? <input 
                    defaultValue={currText}
                    onChange={e => setCurrText(e.target.value)}
                    className='bg-transparent focus:outline-none w-full font-mono pl-2'
                />
                : <textarea 
                    className='w-full min-h-36 bg-transparent text-wrap outline-none px-2 font-mono'
                    role='textbox'
                    contentEditable
                    onChange={e => setCurrText(e.currentTarget.innerText)}
                    suppressContentEditableWarning={true}
                    defaultValue={currText}
                />
            }
            <SaveStatus status={saveStatus} />
            <button
                type="button"
                onClick={trySave}
                className={
                    'bg-green-700 rounded-md text-md font-bold px-4 py-1 ' +
                    (currText === text ? 'cursor-not-allowed brightness-50 ' : 'hover:bg-green-500 ') +
                    (saveStatus === 'saving' ? 'brightness-50 hover:bg-green-700 ' : '') +
                    (multiline ? 'self-end ' : '')
                }
            >
                Save
            </button>
        </div>
    )
}
