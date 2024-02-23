import { Punishment } from '@/types/db';
import { useEffect, useState } from 'react';
import SaveStatus from './SaveStatus';
import type { SaveStatusProps } from './SaveStatus';

export interface PunishmentProps {
    punishment: Punishment
    saveToServer: (oldP: Punishment, newP: Punishment) => Promise<string>
    saveToRedux: (oldP: Punishment, newP: Punishment) => void
    deleteFromServer: (punishment: Punishment) => Promise<string>
    deleteFromRedux: (punishment: Punishment) => void
}

type PunishNumInputProps = {
    defaultValue: number
    onChange: (value: number) => void
}

function PunishNumInput({ defaultValue, onChange }: PunishNumInputProps) {
    return (
        <div className='h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
            <input 
                type='number'
                min={0}
                defaultValue={defaultValue}
                onChange={e => onChange(parseInt(e.target.value))}
                maxLength={10}
                className='bg-transparent focus:outline-none w-full font-mono pl-2'
            />
        </div>
    )
}

type PunishNumStringProps = {
    defaultValue: string
    onChange: (value: string) => void
}

function PunishStrInput({ defaultValue, onChange }: PunishNumStringProps) {
    return (
        <div className='h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
            <input 
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
                maxLength={10}
                className='bg-transparent focus:outline-none w-full font-mono pl-2'
            />
        </div>
    )
}

export default function PunishmentInput({ punishment, saveToServer, saveToRedux, deleteFromServer, deleteFromRedux }: PunishmentProps) {
    const [currDuration, setCurrDuration] = useState(punishment.duration);
    const [currWarnCount, setCurrWarnCount] = useState(punishment.warningsCount);
    const [currAction, setCurrAction] = useState(punishment.action);
    const [currSeverity, setCurrSeverity] = useState(punishment.warningSeverity);

    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [hasChanged, setHasChanged] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
    useEffect(() => {
        if(
            currDuration !== punishment.duration ||
            currWarnCount !== punishment.warningsCount ||
            currAction !== punishment.action ||
            currSeverity !== punishment.warningSeverity
        ) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
    }, [currDuration, currWarnCount, currAction, currSeverity, punishment.duration, punishment.warningsCount, punishment.action, punishment.warningSeverity]);

    const trySave = async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        
        const currPunishment: Punishment = {
            duration: currDuration,
            warningsCount: currWarnCount,
            action: currAction,
            warningSeverity: currSeverity,
            duration_raw: punishment.duration_raw
        };

        try {
            setSaveStatus('saving');
            await saveToServer(punishment, currPunishment);
            saveToRedux(punishment, currPunishment);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    };

    const tryDelete = async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        
        const p: Punishment = {
            duration: currDuration,
            warningsCount: currWarnCount,
            action: currAction,
            warningSeverity: currSeverity,
            duration_raw: punishment.duration_raw
        };

        try {
            setSaveStatus('saving');
            await deleteFromServer(p);
            deleteFromRedux(p);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    }

    return (
        <div className='w-full h-fit flex flex-col gap-4 bg-bgdark border border-bggrey-l p-4 rounded-md'>
            <div className='w-full flex gap-4 justify-stretch'>
                <div className='font-bold w-1/2'>Duration</div>
                <div className='font-bold w-1/2'>Warnings count</div>
            </div>
            <div className='w-full flex gap-4 justify-stretch'>
                <PunishNumInput onChange={setCurrDuration} defaultValue={punishment.duration}></PunishNumInput>
                <PunishNumInput onChange={setCurrWarnCount} defaultValue={punishment.warningsCount}></PunishNumInput>
            </div>
            <div className='w-full flex gap-4 justify-stretch'>
                <div className='font-bold w-1/2'>Action</div>
                <div className='font-bold w-1/2'>Warning severity</div>
            </div>
            <div className='w-full flex gap-4 justify-stretch'>
                <PunishStrInput onChange={setCurrAction} defaultValue={punishment.action}></PunishStrInput>
                <PunishStrInput onChange={setCurrSeverity} defaultValue={punishment.warningSeverity}></PunishStrInput>
            </div>

            <div className='w-full h-8 flex gap-4 justify-end'>
                <SaveStatus status={saveStatus} />

            <button
                type="button"
                onClick={tryDelete}
                className={
                    'bg-rose-700 rounded-md text-md font-bold px-4 py-1 hover:bg-rose-500 ' +
                    (saveStatus === 'saving' ? 'brightness-50 hover:bg-rose-700 ' : '')
                }
            >
                Delete
            </button>
            <button
                type="button"
                onClick={trySave}
                className={
                    'bg-green-700 rounded-md text-md font-bold px-4 py-1 ' +
                    (!hasChanged ? 'cursor-not-allowed brightness-50 ' : 'hover:bg-green-500 ') +
                    (saveStatus === 'saving' ? 'brightness-50 hover:bg-green-700 ' : '')
                }
            >
                Save
            </button>
            </div>
        </div>
    )
}
