import { useState } from 'react';
import SaveStatus from './SaveStatus';
import type { SaveStatusProps } from './SaveStatus';

export interface StringInputProps {
    text: string
    saveToServer: (value: string) => Promise<string>
    saveToRedux: (value: string) => void
}

export default function StringInput({ text, saveToServer, saveToRedux }: StringInputProps) {
    const [currText, setCurrText] = useState(text);
    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const trySave = async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        try {
            setSaveStatus('saving');
            await saveToServer(currText);
            saveToRedux(currText);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    };

    return (
        <div className='h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark'>
            <input 
                defaultValue={currText}
                onChange={e => setCurrText(e.target.value)}
                maxLength={10}
                className='bg-transparent focus:outline-none w-full font-mono pl-2'
            />
            <SaveStatus status={saveStatus} />
            <button
                type="button"
                onClick={trySave}
                className={
                    'bg-green-700 rounded-md text-md font-bold px-4 py-1 ' +
                    (currText === text ? 'cursor-not-allowed brightness-50 ' : 'hover:bg-green-500 ') +
                    (saveStatus === 'saving' ? 'brightness-50 hover:bg-green-700 ' : '')
                }
            >
                Save
            </button>
        </div>
    )
}
