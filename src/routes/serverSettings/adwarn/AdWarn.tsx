import { RouteObject } from 'react-router-dom';
import StringInput from '@/components/StringInput';
import SwitchButton from '@/components/SwitchButton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setAdWarnChannel, setAdWarnDmStatus, setAdWarnStatus } from '@/redux/guildSlice';

export const routerData: RouteObject = {
    path: 'adwarn/',
    element: <AdWarnSettings />,
}

export default function AdWarnSettings() {
    const dispatch = useAppDispatch();
    const guild = useAppSelector(state => state.guild);

    // const savePrefixToServer = () => new Promise<string>((rs, rj) => setTimeout(v => Math.random() > 0.5 ? rs(v) : rj(v), 2000, 'Success'));
    const saveStatusToServer = () => new Promise<string>((_, r) => setTimeout(r, 2000, 'Success'));
    const saveStatusToRedux = (value: boolean) => dispatch(setAdWarnStatus({ status: value }));
    
    const saveSendDMToServer = () => new Promise<string>((_, r) => setTimeout(r, 2000, 'Success'));
    const saveSendDMToRedux = (value: boolean) => dispatch(setAdWarnDmStatus({ status: value }));
    
    const saveChannelToServer = () => new Promise<string>(r => setTimeout(r, 2000, 'Success'));
    const saveChannelToRedux = (value: string) => dispatch(setAdWarnChannel({ channel: value }));

    return (
        <div className="flex flex-col h-fit w-full text-white p-4 gap-8">
            <div className='self-center text-4xl font-bold bg-blurple p-2 border border-white select-none rounded-md mb-4'>
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

                {/* // -----> TODO Message template picker  */}
                <div className='w-full h-8 flex items-center justify-between gap-2'>
                    <div className='text-xl font-bold'>Message Template</div>
                </div>
            </div>
        </div>
    )
}
