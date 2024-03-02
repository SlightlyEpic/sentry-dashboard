import { Punishment } from '@/types/db';
import { useEffect, useState } from 'react';
import SaveStatus from './SaveStatus';
import type { SaveStatusProps } from './SaveStatus';

export interface PunishmentProps {
    punishment: Punishment
    save: (oldP: Punishment, newP: Punishment) => Promise<unknown>
    deleteP: (punishment: Punishment) => Promise<unknown>
}

type PunishNumInputProps = {
    defaultValue: number
    onChange: (value: number) => void
}

function PunishNumInput({ defaultValue, onChange }: PunishNumInputProps) {
    return (
        <div className='w-full h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
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
        <div className='w-full h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-grow'>
            <input 
                defaultValue={defaultValue}
                onChange={e => onChange(e.target.value)}
                maxLength={10}
                className='bg-transparent focus:outline-none w-full font-mono pl-2'
            />
        </div>
    )
}

type PunishTimeInputProps = {
    defaultDurationRaw: string
    onChange: (duration: number, durationRaw: string) => void
}

function PunishTimeInput({ defaultDurationRaw, onChange }: PunishTimeInputProps) {
    type SMHD = 's' | 'h' | 'm' | 'd';

    // seconds, minutes, hours, days
    const [smhd, setSmhd] = useState<SMHD>(defaultDurationRaw.at(-1) as SMHD);
    const [time, setTime] = useState(parseInt(defaultDurationRaw));

    useEffect(() => {
        let multiplier = 1;
        if(smhd === 'm') multiplier *= 60;
        else if(smhd === 'h') multiplier *= 60 * 60;
        else if(smhd === 'd') multiplier *= 24 * 60 * 60;

        onChange(time * multiplier, `${time}${smhd}`);
    }, [time, smhd, onChange]);

    return (
        <div className='flex flex-col sm:flex-row h-max w-full gap-4'>
            <div className='w-full h-12 flex gap-2 items-center text-white border border-bggrey-ll p-2 rounded-md bg-bgdark flex-shrink flex-grow'>
                <input 
                    type='number'
                    min={0}
                    step={1}
                    defaultValue={time}
                    onChange={e => setTime(parseInt(e.target.value))}
                    maxLength={10}
                    className='bg-transparent focus:outline-none w-3/4 font-mono pl-2'
                />
            </div>
            <div className='h-12 flex justify-center items-center text-white border border-bggrey-ll rounded-md bg-bgdark overflow-clip flex-shrink-0'>
                <button onClick={() => setSmhd('s')} className={'text-center transition-colors duration-300 aspect-square h-12 text-white font-bold hover:bg-blurple ' + (smhd === 's' ? 'bg-blurple' : '')}>s</button>
                <button onClick={() => setSmhd('m')} className={'text-center transition-colors duration-300 aspect-square h-12 text-white font-bold hover:bg-blurple ' + (smhd === 'm' ? 'bg-blurple' : '')}>m</button>
                <button onClick={() => setSmhd('h')} className={'text-center transition-colors duration-300 aspect-square h-12 text-white font-bold hover:bg-blurple ' + (smhd === 'h' ? 'bg-blurple' : '')}>h</button>
                <button onClick={() => setSmhd('d')} className={'text-center transition-colors duration-300 aspect-square h-12 text-white font-bold hover:bg-blurple ' + (smhd === 'd' ? 'bg-blurple' : '')}>d</button>
            </div>
        </div>
    )
}

export default function PunishmentInput({ punishment, save, deleteP }: PunishmentProps) {
    const [currDuration, setCurrDuration] = useState(punishment.duration);
    const [currDurationRaw, setCurrDurationRaw] = useState(punishment.duration_raw);
    const [currWarnCount, setCurrWarnCount] = useState(punishment.warnings_count);
    const [currAction, setCurrAction] = useState(punishment.action);
    const [currSeverity, setCurrSeverity] = useState(punishment.warning_severity);

    const [saveStatus, setSaveStatus] = useState<SaveStatusProps['status']>('idle');
    const [hasChanged, setHasChanged] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
    useEffect(() => {
        if(
            currDuration !== punishment.duration ||
            currWarnCount !== punishment.warnings_count ||
            currAction !== punishment.action ||
            currSeverity !== punishment.warning_severity
        ) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
    }, [
        currDuration, 
        currWarnCount, 
        currAction, 
        currSeverity, 
        punishment, 
    ]);

    const trySave = async () => {
        if(saveStatus === 'saving') return;
        clearTimeout(timeoutId);
        
        const currPunishment: Punishment = {
            duration: currDuration,
            warnings_count: currWarnCount,
            action: currAction,
            warning_severity: currSeverity,
            duration_raw: currDurationRaw
        };

        try {
            setSaveStatus('saving');
            await save(punishment, currPunishment);
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
            warnings_count: currWarnCount,
            action: currAction,
            warning_severity: currSeverity,
            duration_raw: currDurationRaw
        };

        try {
            setSaveStatus('saving');
            await deleteP(p);
            setSaveStatus('success');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        } catch(err) {
            setSaveStatus('error');
            setTimeoutId(setTimeout(setSaveStatus, 2000, 'idle'));
        }
    }

    const durationChanged = (duration: number, durationRaw: string) => {
        setCurrDuration(duration);
        setCurrDurationRaw(durationRaw);
    }

    return (
        <div className='flex flex-col gap-4 bg-bgdark border border-bggrey-l p-4 rounded-md'>
            <div className='w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold w-1/2'>Duration</div>
                    <PunishTimeInput onChange={durationChanged} defaultDurationRaw={punishment.duration_raw} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold w-1/2'>Warnings count</div>
                    <PunishNumInput onChange={setCurrWarnCount} defaultValue={punishment.warnings_count} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold w-1/2'>Action</div>
                    <PunishStrInput onChange={setCurrAction} defaultValue={punishment.action} />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='font-bold w-1/2'>Warning severity</div>
                    <PunishStrInput onChange={setCurrSeverity} defaultValue={punishment.warning_severity} />
                </div>
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
