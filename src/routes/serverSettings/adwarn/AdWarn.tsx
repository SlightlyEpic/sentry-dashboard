import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAdWarnChannel, setAdWarnDmStatus, setAdWarnStatus } from '@/redux/guildSlice';
import * as api from '@/apiInterface/guildSettings';
import { useCallback } from 'react';

export const routerData: RouteObject = {
    path: 'adwarn/',
    element: <AdWarnSettings />,
}

export default function AdWarnSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    const saveStatusToServer = useCallback((value: boolean) => api.setAdWarnStatus(guild.guildId!, { status: value }), [guild]);
    const saveStatusToRedux = useCallback((value: boolean) => dispatch(setAdWarnStatus({ status: value })), [dispatch]);
    
    const saveSendDMToServer = useCallback((value: boolean) => api.setAdWarnDmStatus(guild.guildId!, { status: value }), [guild]);
    const saveSendDMToRedux = useCallback((value: boolean) => dispatch(setAdWarnDmStatus({ status: value })), [dispatch]);
    
    const saveChannelToServer = useCallback((value: string) => api.setAdWarnChannel(guild.guildId!, { channel: value }), [guild]);
    const saveChannelToRedux = useCallback((value: string) => dispatch(setAdWarnChannel({ channel: value })), [dispatch]);

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-2xl lg:text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4 text-center'>
                Ad Warning Settings
            </div>
            <div className='flex flex-col gap-4'>
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Status</div>
                    <SwitchButton state={guild.data!.adwarning_settings.status} saveToServer={saveStatusToServer} saveToRedux={saveStatusToRedux} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Send DMs</div>
                    <SwitchButton state={guild.data!.adwarning_settings.send_dm} saveToServer={saveSendDMToServer} saveToRedux={saveSendDMToRedux} />
                </div>
                <div className='border-t border-bggrey-ll' />
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='text-xl font-bold'>Channel Id</div>
                    <StringInput saveToRedux={saveChannelToRedux} saveToServer={saveChannelToServer} text={guild.data!.adwarning_settings.channel} />
                </div>
                <div className='border-t border-bggrey-ll' />

                {/* // TODO Make this actually save, and maybe swap out the select for a custom CSS based select  */}
                <div className='w-full h-8 flex flex-col items-start justify-between gap-2'>
                    <div className='text-xl font-bold'>Message Template</div>
                    <select name='templateSelect' className='custom-select'>
                    {
                        !guild.data!.adwarning_settings.message_template && <option disabled selected>No template selected</option>
                    }
                    {
                        guild.data!.templates.messages.map(t => <option key={t.id} className='custom-option'>
                            {t.name}
                        </option>)
                    }
                    </select>
                </div>
            </div>
        </div>
    )
}
