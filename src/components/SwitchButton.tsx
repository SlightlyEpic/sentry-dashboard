import { useState } from 'react'
import SaveStatus from './SaveStatus'
import type { SaveStatusProps } from './SaveStatus'

export type SwitchButtonProps = {
    state: boolean
    saveToServer: (value: boolean) => Promise<string>
    saveToRedux: (value: boolean) => void
    disabled?: boolean
}

export default function SwitchButton({ state, saveToServer, saveToRedux }: SwitchButtonProps) {
    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [currState, setCurrState] = useState(state);

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const toggle = async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        setCurrState(!state);
        try {
            setSaveStatus('saving');

            // Because currState value will update in the next render
            await saveToServer(!currState);
            saveToRedux(!currState);

            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
            // Rollback
            setCurrState(state);
        }
    }

    return <div className='flex grow-0 w-max h-8 gap-2'>
        <SaveStatus status={saveStatus} />
        <div
            onClick={toggle}
            className={
                'h-full aspect-[2] rounded-full overflow-hidden transition-all duration-500 ' +
                (currState ? 'bg-green-500 ring-1 ring-white ' : 'bg-bgdark-l ring-1 ring-blurple ') +
                (saveStatus === 'saving' ? 'brightness-50 ' : 'cursor-pointer ')
            }
        >
            <div
                className={
                    'h-full aspect-square bg-slate-100 rounded-full transition-all duration-500 ' +
                    (currState ? 'translate-x-full' : '')
                }
            />
        </div>
    </div>;
}
