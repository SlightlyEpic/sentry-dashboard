import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAdwarnChannelAT, setAdwarnDmStatusAT, setAdwarnMessageAT, setAdwarnStatusAT } from '@/redux/guildSlice';
import { useCallback, useRef, useState } from 'react';
import { dispatchWhichRejects } from '@/util/reduxUtil';
import SaveStatus, { SaveStatusProps } from '@/components/SaveStatus';

export const routerData: RouteObject = {
    path: 'adwarn/',
    element: <AdWarnSettings />,
}

export default function AdWarnSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);
    const [currTemplate, setCurrTemplate] = useState(guild.data!.adwarning_settings.message_template?.id ?? '');
    const selectRef = useRef<HTMLSelectElement>(null);

    const saveStatus = useCallback((value: boolean) => dispatchWhichRejects(dispatch(setAdwarnStatusAT({ status: value }))), [dispatch]);
    const saveSendDM = useCallback((value: boolean) => dispatchWhichRejects(dispatch(setAdwarnDmStatusAT({ status: value }))), [dispatch]);
    const saveChannel = useCallback((value: string) => dispatchWhichRejects(dispatch(setAdwarnChannelAT({ channel: value }))), [dispatch]);

    const [saveState, setSaveState] = useState<SaveStatusProps['status']>('idle');
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

    const saveTemplate = useCallback(async () => {
        const templateId = selectRef.current?.value;
        if(!templateId || !templateId.length) return;
        if(saveState === 'saving') return;
        clearTimeout(timeoutId);
        try {
            setSaveState('saving');
            await dispatchWhichRejects(dispatch(setAdwarnMessageAT({
                message: guild.data!.templates.messages.find(t => t.id === templateId)!
            })))
            setSaveState('success');
            setTimeoutId(setTimeout(setSaveState, 2000, 'idle'));
        } catch(err) {
            setSaveState('error');
            setTimeoutId(setTimeout(setSaveState, 2000, 'idle'));
        }
        
    }, [saveState, timeoutId, dispatch, guild.data])

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Ad Warning Settings
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Status</div>
                    <SwitchButton state={guild.data!.adwarning_settings.status} save={saveStatus} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Send DMs</div>
                    <SwitchButton state={guild.data!.adwarning_settings.send_dm} save={saveSendDM} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='text-xl font-bold'>Channel Id</div>
                    <StringInput save={saveChannel} text={guild.data!.adwarning_settings.channel} />
                </div>
                <div className='border-t border-bggrey-ll' />

                {/* // TODO Make this actually save, and maybe swap out the select for a custom CSS based select  */}
                <div className='w-full h-fit flex flex-col items-start justify-between gap-2'>
                    <div className='text-xl font-bold'>Message Template</div>
                    <select ref={selectRef} onChange={e => setCurrTemplate(e.target.value)} name='templateSelect' className='custom-select'>
                    <option className='custom-option' selected={!guild.data!.adwarning_settings.message_template?.id} value=''>
                        No selection
                    </option>
                    {
                        guild.data!.templates.messages.map(t => <option 
                            selected={guild.data!.adwarning_settings.message_template?.id === t.id} 
                            key={t.id} className='custom-option' 
                            value={t.id}
                        >
                            {t.name}
                        </option>
                        )
                    }
                    </select>
                </div>
                <div className='flex min-h-12 p-2 justify-end items-center gap-4'>
                    <SaveStatus status={saveState} />
                    <button 
                        className={
                            'self-end h-8 w-16 bg-green-700 rounded-md px-2 py-1 font-bold ' + 
                            (currTemplate.length && currTemplate !== guild.data!.adwarning_settings.message_template?.id ? 'cursor-pointer hover:bg-green-500' : 'brightness-50 cursor-not-allowed')
                        }
                        onClick={saveTemplate}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
